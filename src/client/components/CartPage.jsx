import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CartPage = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios.get('/api/cart')
      .then(response => setCart(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleRemove = (productId) => {
    axios.delete(`/api/cart/${productId}`)
      .then(response => setCart(response.data))
      .catch(error => console.error(error));
  };

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      <ul>
        {cart.map(item => (
          <li key={item.product.id}>
            {item.product.name} - {item.quantity}
            <button onClick={() => handleRemove(item.product.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <button>Checkout</button>
    </div>
  );
};

export default CartPage;
