import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const OrderItems = ({}) => {
  const [shoe, setShoes] = useState(null);
  // fetch all order items and edit which u=you want then checkout button
  // DISPLAY NEWLY POSTED orderItem
  useEffect(() => {
    const fetchOrderItems = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/cart/orderItem`
        );
        const data = await response.json();
        setShoes(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchOrderItems();
  }, []);

  const orderItemsArray = Array.isArray(shoe) ? shoe : [];
  console.log("orderItemsArray:", orderItemsArray);

  return (
    <div className="home-page">
      <h1>Your bag so far, are you sure you want to add to cart?</h1>
      <div className="product-list">
        {orderItemsArray.map((shoe) => (
          <Link to={`/shoes/${shoe.id}`} key={shoe.id} className="product-link">
            <div className="product-card">
              <div className="product-info">
                <img src={shoe.shoe_picture} alt={shoe.brand} />
                <h2>{shoe.brand}</h2>
                <p>Size: {shoe.size}</p>
                <p>Price: ${shoe.price}</p>
                <p>Quantity: {shoe.quantity}</p>
                <button>add to cart</button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default OrderItems;
