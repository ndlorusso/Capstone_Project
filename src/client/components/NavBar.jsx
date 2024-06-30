import React from "react";
import { Link } from "react-router-dom";

const NavBar = ({ isLoggedIn, handleLogout }) => {
  return (
    <nav className="nav-bar">
      <div className="navbar-logo">
        <Link to="/">
          KickVault <span role="img" aria-label="sports shoe">👟</span>
        </Link>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/bag">Cart</Link>
        </li>
        {isLoggedIn ? (
          <>
            <li>
              <button className="logout-button" onClick={handleLogout}>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;