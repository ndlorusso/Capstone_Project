import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const OrderItems = () => {
  const [shoes, setShoes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrderItems = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/cart/orderItem`);
        const data = await response.json();
        setShoes(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchOrderItems();
  }, []);

  const handleRemove = async (shoeId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/cart/orderItem/${shoeId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setShoes(shoes.filter((shoe) => shoe.id !== shoeId));
      } else {
        console.error("Failed to remove item");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCheckout = () => {
    const total = shoes.reduce(
      (sum, shoe) => sum + shoe.price * shoe.quantity,
      0
    );
    navigate("/checkout", { state: { totalPrice: total } });
  };

  const orderItemsArray = Array.isArray(shoes) ? shoes : [];

  return (
    <div className="home-page">
      <h1>Your bag so far, are you sure you want to add to cart?</h1>
      <div className="product-list">
        {orderItemsArray.map((shoe) => (
          <div key={shoe.id} className="product-card">
            <div className="product-info">
              <img src={shoe.shoe_picture} alt={shoe.brand} />
              <h2 className="product-brand">{shoe.brand}</h2>
              <p>Size: {shoe.size}</p>
              <p>Price: ${shoe.price}</p>
              <p>Quantity: {shoe.quantity}</p>
              <button onClick={() => handleRemove(shoe.id)}>
                Remove from Cart
              </button>
            </div>
          </div>
        ))}
      </div>
      <button onClick={handleCheckout} className="checkout-button">
        Proceed to Checkout
      </button>
    </div>
  );
};

export default OrderItems;
