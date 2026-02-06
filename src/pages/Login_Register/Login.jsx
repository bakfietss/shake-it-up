import { useState } from "react";
import { useToast } from "../../context/ToastContext";
import Button from "../../components/Button/Button";
import "./Login.scss";

const Login = ({ isOpen, onClose }) => {
  const { showToast } = useToast();
  const [isRegisterActive, setIsRegisterActive] = useState(false);
  const [loading, setLoading] = useState(false);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    if (!loginEmail || !loginPassword) {
      showToast("Vul alle velden in", "warning");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showToast("Login functionaliteit komt later (API integratie)", "info");
    }, 500);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();

    if (!registerUsername || !registerEmail || !registerPassword) {
      showToast("Vul alle velden in", "warning");
      return;
    }

    if (registerPassword.length < 6) {
      showToast("Wachtwoord moet minimaal 6 karakters zijn", "error");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showToast("Registratie functionaliteit komt later (API integratie)", "info");
    }, 500);
  };

  if (!isOpen) return null;

  return (
    <div className="login-overlay" onClick={handleBackdropClick}>
      <div className={`auth-container ${isRegisterActive ? "active" : ""}`}>
        <button className="auth-close-btn" onClick={onClose}>
          &times;
        </button>

        <div className="curved-shape"></div>
        <div className="curved-shape2"></div>

        <div className="form-box Login">
          <h2>Login</h2>
          <form onSubmit={handleLoginSubmit}>
            <div className="input-box">
              <input
                type="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                disabled={loading}
                className={loginEmail ? "has-value" : ""}
              />
              <label>Email</label>
            </div>

            <div className="input-box">
              <input
                type="password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                disabled={loading}
                className={loginPassword ? "has-value" : ""}
              />
              <label>Password</label>
            </div>

            <div className="input-box">
              <Button btnType="solid" animation="slide" type="submit" disabled={loading}>
                {loading ? "Laden..." : "Login"}
              </Button>
            </div>

            <div className="regi-link">
              <p>
                Don't have an account? <br />
                <button
                  type="button"
                  className="switch-link"
                  onClick={() => setIsRegisterActive(true)}
                >
                  Sign Up
                </button>
              </p>
            </div>
          </form>
        </div>

        <div className="info-content Login">
          <h2>WELCOME BACK!</h2>
          <p>
            We are happy to have you with us again. If you need anything, we are
            here to help.
          </p>
        </div>

        <div className="form-box Register">
          <h2>Register</h2>
          <form onSubmit={handleRegisterSubmit}>
            <div className="input-box">
              <input
                type="text"
                required
                value={registerUsername}
                onChange={(e) => setRegisterUsername(e.target.value)}
                disabled={loading}
                className={registerUsername ? "has-value" : ""}
              />
              <label>Username</label>
            </div>

            <div className="input-box">
              <input
                type="email"
                required
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
                disabled={loading}
                className={registerEmail ? "has-value" : ""}
              />
              <label>Email</label>
            </div>

            <div className="input-box">
              <input
                type="password"
                required
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
                disabled={loading}
                className={registerPassword ? "has-value" : ""}
              />
              <label>Password</label>
            </div>

            <div className="input-box">
              <Button btnType="solid" animation="slide" type="submit" disabled={loading}>
                {loading ? "Laden..." : "Register"}
              </Button>
            </div>

            <div className="regi-link">
              <p>
                Already have an account? <br />
                <button
                  type="button"
                  className="switch-link"
                  onClick={() => setIsRegisterActive(false)}
                >
                  Sign In
                </button>
              </p>
            </div>
          </form>
        </div>

        <div className="info-content Register">
          <h2>WELCOME!</h2>
          <p>
            We're delighted to have you here. If you need any assistance, feel
            free to reach out.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
