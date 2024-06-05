import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import ProductDetails from "./ProductDetails";

const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("/api/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="home-page">
      <h1>All Products</h1>
      <div className="product-list">
        {products.map((product) => (
          <ProductDetails key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
