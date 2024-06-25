import React, { useEffect, useState } from 'react';

const OrderItems = ({ userId }) => {
    const [Items, setItems] = useState(null);


// DISPLAY NEWLY POSTED orderItem
  useEffect(() => {
    const fetchOrderItems = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/cart/users/${userId}`);
        const data = await response.json();
        setItems(data);
    } catch (error) {
        console.error(error);
      }
    };
    fetchOrderItems();
  }, [userId]);

  return (
    <>
    <h1>
      Display newly created OrderItem
      <button>"Add to Cart" - POST orderItem to cart</button>
      <button>"No, i dont want to order this" - Delete orderItem, go back to allShoes</button>
    </h1>
      </>
  );
};
  
export default OrderItems;