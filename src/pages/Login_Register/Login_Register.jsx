import React, { useState } from "react";
import Button from "../../components/Button/Button";
import "./Login_Register.css";

const Login_Register = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(isLogin ? "Login submitted" : "Register submitted");
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="auth-modal-backdrop" onClick={handleBackdropClick}>
      <div className="auth-modal">
        <button className="auth-modal-close" onClick={onClose}>
          ×
        </button>

        <h2>{isLogin ? "Welcome Back" : "Create Account"}</h2>
        <p className="auth-subtitle">
          {isLogin
            ? "Sign in to access your saved cocktails"
            : "Join us and start saving your favorites"}
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                placeholder="Your name"
                className="form-input"
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="your@email.com"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              className="form-input"
            />
          </div>

          <Button variant="primary" type="submit">
            {isLogin ? "Sign In" : "Create Account"}
          </Button>
        </form>

        <div className="auth-switch">
          <p>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              type="button"
              className="auth-switch-btn"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login_Register;
