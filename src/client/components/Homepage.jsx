import React from "react";
import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <>
      <h1>Welcome to Shoe Emporium</h1>
      <div>
        {/* <Link to="/adminProductList">Manage Products</Link>
        <Link to="/adminUserList">Manage Users</Link> */}
        <Link to="/ProductDetails">Product Details</Link>
        <Link to="/ProductList">Product List</Link>
        
       <Link to="/login">Login</Link>
       </div>
    </>
  );
};

export default Homepage;