import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("/api/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error(error));
  }, []);

  const productsArray = Array.isArray(products) ? products : [];

  return (
    <div className="home-page">
      <h1>All Products</h1>
      <div className="product-list">
        {productsArray.map((product) => (
          <Link
            to={`/products/${product.id}`}
            key={product.id}
            className="product-link"
          >
            <div className="product-card">
              <div className="product-info">
                <img src={product.shoe_picture} alt={product.brand} />
                <h2>{product.brand}</h2>
                <p>Size: {product.size}</p>
                <p>Color: {product.color}</p>
                <p>Price: ${product.price}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
