import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <div className="container">
        <Link to="/" className="logo">
          Shoe Emporium
        </Link>
        <ul className="nav-links">
          <li>
            <Link to="/admin/products">Manage Products</Link>
          </li>
          <li>
            <Link to="/admin/users">Manage Users</Link>
          </li>
          <li>
            <Link to="/cart">Cart</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
