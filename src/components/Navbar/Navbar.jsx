import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.scss";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">Home</Link>
        <div className="navbar-links">
          <Link to="/search" className="navbar-link">Search</Link>
          <Link to="/random" className="navbar-link">Random</Link>
          <Link to="/favorites" className="navbar-link">Favorites</Link>
          <Link to="/contact" className="navbar-link">Contact</Link>
          <Link to="/login" className="navbar-link">Login</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
