import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="nav-bar">
      <div className="navbar-logo">
        <Link to="/">KickVault</Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        {/* <li><Link to="/products">Products</Link></li> */}
        {/* <li><Link to="/about">About</Link></li> */}
        {/* <li><Link to="/contact">Contact</Link></li> */}
        <li><Link to="/bag">Cart</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/register">Register</Link></li>
      </ul>
    </nav>
  );
};
export default NavBar;