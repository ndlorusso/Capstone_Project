import { Routes, Route} from "react-router-dom";
import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import "./style.css";
import CartPage from "./components/CartPage";
import HomePage from "./components/Homepage";
import NavBar from "./components/NavBar";
import ProductDetails from "./components/ProductDetails";
import Register from "./components/Register";
import CheckoutPage from "./components/CheckoutPage";
import OrderItems from "./components/OrderItems";
import SuccessPage from "./components/SuccessPage";

function App() {
  const [userId, setUserId] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    window.localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUserId(null);
  };

  return (
    <>
      <NavBar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <div id="mainContainer">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/login"
            element={
              <Login setUserId={setUserId} setIsLoggedIn={setIsLoggedIn} /> //setIsLoggedIn to update the login state if login is successful
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/bag" element={<OrderItems />} />
          <Route path="/cart" element={<CartPage />} />
          <Route
            path="/shoes/:id"
            element={<ProductDetails userId={userId} />}
          />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/successPage" element= {<SuccessPage/>} />
        </Routes>
      </div>
    </>
  );
}

export default App;