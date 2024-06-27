import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const CheckoutPage = ({ userId }) => {
  const [cart, setCart] = useState([]);
  const [shippingAddress, setShippingAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const totalPrice = location.state?.totalPrice || 0;

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const { data } = await axios.get(`/api/cart/users/${userId}`);
        setCart(data);
      } catch (error) {
        console.error(error);
        setMessage("Failed to fetch cart data");
      }
    };
    fetchCart();
  }, [userId]);

  const handlePlaceOrder = async () => {
    try {
      const response = await axios.post("/api/orders", {
        userId,
        cart,
        shippingAddress,
        paymentMethod,
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
      <h2>Order Summary</h2>
      <ul>
        {cart.map((item) => (
          <li key={item.shoe_id}>
            <img src={item.shoe_picture} alt={item.brand} width="50" />
            {item.brand} - {item.quantity} x ${item.price.toFixed(2)} = $
            {(item.quantity * item.price).toFixed(2)}
          </li>
        ))}
      </ul>
      <h3>Total: ${totalPrice.toFixed(2)}</h3>
      <h2>Shipping Address</h2>
      <input
        type="text"
        value={shippingAddress}
        onChange={(e) => setShippingAddress(e.target.value)}
        placeholder="Enter your shipping address"
      />
      <h2>Payment Method</h2>
      <select
        value={paymentMethod}
        onChange={(e) => setPaymentMethod(e.target.value)}
      >
        <option value="credit-card">Credit Card</option>
      </select>
      <button onClick={handlePlaceOrder}>Place Order</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CheckoutPage;
