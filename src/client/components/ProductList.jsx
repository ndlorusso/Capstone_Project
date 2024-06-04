import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProductList = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get(`/api/products/${id}`)
      .then(response => setProduct(response.data))
      .catch(error => console.error(error));
  }, [id]);

  const handleAddToCart = () => {
    axios.post('/api/cart', { productId: product.id, quantity })
      .then(response => {
        setMessage('Product added successfully!');
      })
      .catch(error => console.error(error));
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-page">
      <h1>{product.name}</h1>
      <img src={product.image} alt={product.name} />
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <div>
        <label>Quantity:</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          min="1"
        />
      </div>
      <button onClick={handleAddToCart}>Add to Cart</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ProductPage;

//   if (!product) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="product-list">
//       <h1>{product.name}</h1>
//       <img src={product.image} alt={product.name} />
//       <p>{product.description}</p>
//       <p>Price: ${product.price}</p>
//       {/* Add to Cart functionality */}
//     </div>
//   );
// };

// export default ProductList;