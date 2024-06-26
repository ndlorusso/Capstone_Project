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
import CheckoutPage from "./components/CheckoutPage";
import OrderItems from "./components/OrderItems"

function App() {
  const [userId, setUserId] = useState('');
  const [productID, setProductID] = useState(null);
  const [shoes, setShoes] = useState([]);

  return (
    <>
      <NavBar />

      <div id="mainContainer">
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login setUserId={setUserId} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/bag" element={<OrderItems />} />
          <Route path= "/cart" element = { <CartPage/> } />
          <Route path="/shoes/:id" element={<ProductDetails userId={userId} />} />
          <Route path="/checkout" element= {<CheckoutPage/>} />
        </Routes>
        </div>
    </>
  );
}

export default App;
