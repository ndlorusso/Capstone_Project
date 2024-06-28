import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const CheckoutPage = ({ userId }) => {
  const [cart, setCart] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [state, setState] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [securityCode, setSecurityCode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const totalPrice = location.state?.totalPrice || 0;

  useEffect(() => {
    const fetchOrderItems = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/cart/orderItem`);
        const data = await response.json();
        setCart(data); // useState - sets cart variable
      } catch (error) {
        console.error(error);
      }
    };
    fetchOrderItems();
  }, []);

  const cartArray = Array.isArray(cart) ? cart : [];

  const handlePlaceOrder = async () => {
    try {
      const response = await axios.post("/api/orders", {
        userId,
        cart,
        shippingAddress: {
          streetAddress,
          city,
          zipCode,
          state,
        },
        paymentMethod: {
          cardNumber,
          expirationDate,
          securityCode,
          type: paymentMethod,
        },
        totalPrice,
      });
      if (response.status === 200) {
        setMessage("Order placed successfully!");
        navigate("/");
      } else {
        setMessage("Failed to place order");
      }
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>

      <div className="cart-card">
        <h2>Order Summary</h2>
        <section className="cart-info">
          {cartArray.map((item) => (
            <div key={item.shoe_id} className="cart-item">
              <img src={item.shoe_picture} alt={item.brand} />
              <p><strong>Brand:</strong> {item.brand}</p>
              <p><strong>Quantity:</strong> {item.quantity}</p>
              <p><strong>Price:</strong> ${item.price}</p>
            </div>
          ))}
        </section>
      </div>

      <h3>Total: ${totalPrice.toFixed(2)}</h3>

      <h2>Shipping Address</h2>
      <input
        type="text"
        value={streetAddress}
        onChange={(e) => setStreetAddress(e.target.value)}
        placeholder="Street Address"
      />
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="City"
      />
      <input
        type="text"
        value={zipCode}
        onChange={(e) => setZipCode(e.target.value)}
        placeholder="Zip Code"
      />
      <input
        type="text"
        value={state}
        onChange={(e) => setState(e.target.value)}
        placeholder="State"
      />

      <h2>Payment Method</h2>
      <select
        value={paymentMethod}
        onChange={(e) => setPaymentMethod(e.target.value)}
      >
        <option value="visa">Visa</option>
        <option value="mastercard">MasterCard</option>
        <option value="amex">American Express</option>
        <option value="discover">Discover</option>
      </select>
      <input
        type="text"
        value={cardNumber}
        onChange={(e) => setCardNumber(e.target.value)}
        placeholder="Card Number"
      />
      <input
        type="text"
        value={expirationDate}
        onChange={(e) => setExpirationDate(e.target.value)}
        placeholder="Expiration Date"
      />
      <input
        type="text"
        value={securityCode}
        onChange={(e) => setSecurityCode(e.target.value)}
        placeholder="Security Code"
      />

      <button onClick={handlePlaceOrder}>Place Order</button>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default CheckoutPage;
