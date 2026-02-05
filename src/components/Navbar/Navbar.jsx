import { Link } from "react-router-dom";
import "./Navbar.scss";

const Navbar = ({ onLoginClick }) => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">Home</Link>
        <div className="navbar-links">
          <Link to="/search" className="navbar-link">Search</Link>
          <Link to="/random" className="navbar-link">Random</Link>
          <Link to="/favorites" className="navbar-link">Favorites</Link>
          <Link to="/contact" className="navbar-link">Contact</Link>
          <button type="button" className="navbar-link navbar-login-btn" onClick={onLoginClick}>
            Login
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
