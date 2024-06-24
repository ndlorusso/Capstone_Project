import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const CheckoutPage = ({ userId }) => {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [shippingAddress, setShippingAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const { data } = await axios.get(`/api/cart/users/${userId}`);
        if (Array.isArray(data)) {
          setCart(data);
          const total = data.reduce(
            (sum, item) => sum + item.quantity * item.price,
            0
          );
          setTotalPrice(total);
        } else {
          console.error("Expected an array but received:", data);
          setMessage("Failed to fetch cart data");
        }
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
        <option value="paypal">PayPal</option>
        <option value="bank-transfer">Bank Transfer</option>
      </select>
      <button onClick={handlePlaceOrder}>Place Order</button>
      {message && <p>{message}</p>}
    </div>
  );
};
export default CheckoutPage;