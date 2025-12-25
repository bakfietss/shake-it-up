import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

import CocktailIcon from "../../assets/navbar-svgs/cocktail-svgrepo-com (1).svg";
import SearchIcon from "../../assets/navbar-svgs/search.svg";
import DiceIcon from "../../assets/navbar-svgs/dice-4-svgrepo-com.svg";
import HeartIcon from "../../assets/navbar-svgs/heart-svgrepo-com.svg";
import EmailIcon from "../../assets/navbar-svgs/email-svgrepo-com.svg";
import PersonIcon from "../../assets/navbar-svgs/person-circle-svgrepo-com.svg";

const Navbar = ({ onAuthClick }) => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src={CocktailIcon} alt="Home" className="navbar-icon" />
        </Link>

        <div className="navbar-icons">
          <Link to="/search" className="navbar-icon-link" title="Search">
            <img src={SearchIcon} alt="Search" className="navbar-icon" />
          </Link>
          <Link to="/random" className="navbar-icon-link" title="Random">
            <img src={DiceIcon} alt="Random" className="navbar-icon" />
          </Link>
          <Link to="/favorites" className="navbar-icon-link" title="Favorites">
            <img src={HeartIcon} alt="Favorites" className="navbar-icon" />
          </Link>
          <Link to="/contact" className="navbar-icon-link" title="Contact">
            <img src={EmailIcon} alt="Contact" className="navbar-icon" />
          </Link>
          <button
            className="navbar-icon-link navbar-auth-btn"
            onClick={onAuthClick}
            title="Login / Register"
          >
            <img src={PersonIcon} alt="Login" className="navbar-icon" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
