import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../assets/styles/login.css";
import { motion } from "framer-motion";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const resp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await resp.json();

      if (resp.ok) {
        localStorage.setItem("token", data.access_token);
        navigate("/profile");
      } else {
        alert(data.msg || "Error al iniciar sesión");
      }
    } catch (error) {
      console.error("Error en el login:", error);
    }
  };

  return (
    <div className="login-page">
      <motion.div
        className="login-container"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -40 }}
        transition={{ duration: 0.4 }}
      >
        <div className="login-box login-left">
          <h1 className="login-title" style={{cursor:'pointer'}} onClick={() => navigate("/onboarding")}>LEVEL UP</h1>
          <h2>Log in</h2>
          <p>Please enter your details or click here to register</p>

          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="remember-me">
            <input type="checkbox" id="remember" />
            <label htmlFor="remember">Remember me</label>
          </div>

          <button className="login-btn" onClick={handleLogin}>
            Log in
          </button>

          <button className="github-btn">
            <i className="fab fa-github"></i> Log in with Github
          </button>

          <p className="signup-link">
            Don't have an account? <span onClick={() => navigate("/register")}>Sign up</span>
          </p>
        </div>

        <div className="login-box login-right">
          <div className="info-list">
            <div className="info-item">
              <i className="fas fa-check-circle"></i>
              <span>Accept missions</span>
            </div>
            <div className="info-item">
              <i className="fas fa-chart-line"></i>
              <span>Level up your life</span>
            </div>
            <div className="info-item">
              <i className="fas fa-tasks"></i>
              <span>Track your progress</span>
            </div>
            <div className="info-item">
              <i className="fas fa-trophy"></i>
              <span>Unlock achievements</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
