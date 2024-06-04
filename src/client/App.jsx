import { useState } from 'react';
import reactLogo from './assets/react.svg';
import Login from './components/Login';
import "./style.css";
import AdminProductList from "./components/AdminProductList";
import AdminUserList from "./components/AdminUserList";
import Homepage from "./components/Homepage";
import NavBar from "./components/NavBar";
import ProductDetails from "./components/ProductDetails";
import ProductList from "./components/ProductList";
import Register from "./components/Register";

function App() {
  const [productID, setProductID] = useState(null);
  
  return (
    <>
      <NavBar />
      <Link to="/" style={{ color: "#858f06" }}>
        All Shoes
      </Link>
      <Link to="/new-shoe"> | New Shoe | </Link>
      <Link to="/shoes/:id" style={{ color: "#e79a2ec4" }}>
        Single Product Details
      </Link>

      <div id="mainContainer">
        <Routes>
          <Route
            path="/"
            element={<AllShoes shoeId={shoeID} setShoeId={setShoeID} />}
          />
          <Route path="/new-shoe" element={<NewShoeForm />} />
          <Route
            path="/shoes/:id"
            element={<SingleShoeDetails shoeId={shoeID} setShoeId={setShoeID} />}
          />
        </Routes>
      </div>
    </>
  );
}

export default App;