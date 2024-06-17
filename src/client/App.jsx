import { Routes, Route } from "react-router-dom";
import React from "react";
import Login from "./components/Login";
import "./style.css";
import AdminProductList from "./components/AdminProductList";
import AdminUserList from "./components/AdminUserList";
import HomePage from "./components/Homepage";
import NavBar from "./components/NavBar";
import ProductDetails from "./components/ProductDetails";
import ProductList from "./components/ProductList";
import Register from "./components/Register";

function App() {
  return (
    <>
      <NavBar />
      <div id="mainContainer">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/shoes/:id" element={<ProductDetails />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
