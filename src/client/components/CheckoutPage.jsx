import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const CheckoutPage = ({ userId }) => {
  const [cart, setCart] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const totalPrice = location.state?.totalPrice || 0;


  useEffect(() => {
    const fetchOrderItems = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/cart/orderItem`
        );
        console.log("response:", response);
        const data = await response.json();
        console.log("data:", data);
        setCart(data); // useState - sets cart variable
      } catch (error) {
        console.error(error);
      }
    };
    fetchOrderItems();
  }, []);

  const cartArray = Array.isArray(cart) ? cart : [];
  console.log("cartArray:", cartArray);

const handlePlaceOrder = async () => {  //DELETE ORDER ITEMS , to "remove" from front end "cart"
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
      <h1>Checkout - style at top of page</h1> 

      <div>
      <h2 className="cart-card" >Order Summary</h2>
        <section className="cart-info">
        {cartArray.map((item) => 
        <img src={item.shoe_picture} />
        )};
        </section>




      </div>



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
