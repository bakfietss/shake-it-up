import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import Logout from "../Logout/Logout";
import "./Navbar.scss";

import CocktailIcon from "../../assets/navbar-svgs/cocktail-svgrepo-com (1).svg";
import SearchIcon from "../../assets/navbar-svgs/search.svg";
import DiceIcon from "../../assets/navbar-svgs/dice-4-svgrepo-com.svg";
import HeartIcon from "../../assets/navbar-svgs/heart-svgrepo-com.svg";
import EmailIcon from "../../assets/navbar-svgs/email-svgrepo-com.svg";
import PersonIcon from "../../assets/navbar-svgs/person-circle-svgrepo-com.svg";

const Navbar = ({ onLoginClick }) => {
  const { isAuth, user, logout } = useContext(AuthContext);
  const { showToast } = useToast();
  const [logoutOpen, setLogoutOpen] = useState(false)

  const handleFavoritesClick = (e) => {
    if (!isAuth) {
      e.preventDefault()
      showToast("Je moet eerst inloggen om je favorieten te bekijken", "info")
    }
  }

  const confirmLogout = () => {
    setLogoutOpen(false)
    logout()
    showToast("Je bent uitgelogd", "info")
  }

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo navbar-icon-link">
            <img src={CocktailIcon} alt="Home" className="navbar-icon" />
            <span className="navbar-label navbar-label-right">Home</span>
          </Link>

          <div className="navbar-icons">
            {isAuth ? (
              <button
                type="button"
                className="navbar-icon-link navbar-auth-btn navbar-logged-in"
                onClick={() => setLogoutOpen(true)}
              >
                <span className="navbar-label navbar-label-left">Uitloggen</span>
                <span className="navbar-username">{user?.username || user?.email?.split('@')[0]}</span>
                <img src={PersonIcon} alt="Account" className="navbar-icon" />
              </button>
            ) : (
              <button
                type="button"
                className="navbar-icon-link navbar-auth-btn"
                onClick={onLoginClick}
              >
                <span className="navbar-label navbar-label-left">Login</span>
                <img src={PersonIcon} alt="Login" className="navbar-icon" />
              </button>
            )}
            <Link to="/contact" className="navbar-icon-link">
              <span className="navbar-label navbar-label-left">Contact</span>
              <img src={EmailIcon} alt="Contact" className="navbar-icon" />
            </Link>
            <Link to="/favorites" className="navbar-icon-link" onClick={handleFavoritesClick}>
              <span className="navbar-label navbar-label-left">Favorites</span>
              <img src={HeartIcon} alt="Favorites" className="navbar-icon" />
            </Link>
            <Link to="/random" className="navbar-icon-link">
              <span className="navbar-label navbar-label-left">Random</span>
              <img src={DiceIcon} alt="Random" className="navbar-icon" />
            </Link>
            <Link to="/search" className="navbar-icon-link">
              <span className="navbar-label navbar-label-left">Search</span>
              <img src={SearchIcon} alt="Search" className="navbar-icon" />
            </Link>
          </div>
        </div>
      </nav>

      {logoutOpen && <Logout onConfirm={confirmLogout} onCancel={() => setLogoutOpen(false)} />}
    </>
  );
};

export default Navbar;
