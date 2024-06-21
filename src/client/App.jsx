import { Routes, Route, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import "./style.css";
import AdminProductList from "./components/AdminProductList";
import AdminUserList from "./components/AdminUserList";
import CartPage from "./components/CartPage";
import HomePage from "./components/Homepage";
import NavBar from "./components/NavBar";
import ProductDetails from "./components/ProductDetails";
import ProductList from "./components/ProductList";
import Register from "./components/Register";

function App() {
  const [productID, setProductID] = useState(null);
  const [shoes, setShoes] = useState([]);

  return (
    <>
      <NavBar />
      <Link to="/" style={{ color: "#858f06" }}>
        All Shoes
      </Link>
      <Link to="/new-shoe"> | New Shoe | </Link>
      {/* <Link
        to={productID ? `/products/${productID}` : "#"}
        style={{ color: "#e79a2ec4" }}
      >
        Single Product Details
      </Link> */}

      <div id="mainContainer">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path= "/cart" element = { <CartPage/> } />
          <Route path="/shoes/:id" element={<ProductDetails />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
