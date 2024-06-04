import React from 'react';
import { Link } from 'react-router-dom';

const ProductDetails = ({ product }) => {
  return (
    <div className="product-details">
      <Link to={`/products/${product.id}`}>
        <img src={product.image} alt={product.name} />
        <h2>{product.name}</h2>
        <p>Price: ${product.price}</p>
      </Link>
    </div>
  );
};

export default ProductDetails;
