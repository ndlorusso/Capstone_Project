import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

import ProductCard from './ProductCard';

const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('/api/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="home-page">
      <h1>All Products</h1>
      <div className="product-list">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;



// const HomePage = () => {
//   const [products, setProducts] = useState([]);

// const Homepage = () => {
//   return (
//     <>
//       <h1>Welcome to Shoe Emporium</h1>
//       <div>
//         {/* <Link to="/adminProductList">Manage Products</Link>
//         <Link to="/adminUserList">Manage Users</Link> */}
//         <Link to="/ProductDetails">Product Details</Link>
//         <Link to="/ProductList">Product List</Link>
        
//        <Link to="/login">Login</Link>
//        </div>
//     </>
//   );
// };

// export default Homepage;