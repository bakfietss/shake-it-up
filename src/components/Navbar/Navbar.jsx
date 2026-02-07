import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import "./Navbar.scss";

const Navbar = ({ onLoginClick }) => {
  const { isAuth, user, logout } = useContext(AuthContext);
  const { showToast } = useToast();

  const handleLogout = () => {
    logout();
    showToast("Je bent uitgelogd", "info");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">Home</Link>
        <div className="navbar-links">
          <Link to="/search" className="navbar-link">Search</Link>
          <Link to="/random" className="navbar-link">Random</Link>
          <Link to="/favorites" className="navbar-link">Favorites</Link>
          <Link to="/contact" className="navbar-link">Contact</Link>
          {isAuth ? (
            <button type="button" className="navbar-link navbar-login-btn" onClick={handleLogout}>
              Logout ({user?.username})
            </button>
          ) : (
            <button type="button" className="navbar-link navbar-login-btn" onClick={onLoginClick}>
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
