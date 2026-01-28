import React from "react";
import "./Navbar.scss";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <span className="navbar-logo">Home</span>
        <div className="navbar-links">
          <span className="navbar-link">Search</span>
          <span className="navbar-link">Random</span>
          <span className="navbar-link">Favorites</span>
          <span className="navbar-link">Contact</span>
          <span className="navbar-link">Login</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
