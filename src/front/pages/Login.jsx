import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../assets/styles/login.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter both email and password");
      return;
    }

    try {
      const resp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await resp.json();

      if (resp.ok) {
        localStorage.setItem("token", data.token);       // ✅ Guardar JWT
        localStorage.setItem("user_id", data.user_id);   // ✅ Guardar ID
        alert("Login exitoso");
        navigate("/landing"); // o /profile si preferís
      } else {
        alert(data.msg || "Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Error al iniciar sesión");
    }
  };

  return (
    <div className="login-page">
      <motion.div
        className="login-container"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.5 }}
      >
        <div className="login-box login-left">
          <h1><span className="level-text-login">LEVEL</span><span className="up-text-login">UP</span></h1>
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

          <button className="login-btn" onClick={handleLogin}>Log in</button>

          <button className="github-btn">
            <i className="fab fa-github"></i> Log in with Github
          </button>

          <p className="signup-link">
            Don't have an account?{" "}
            <span onClick={() => navigate("/register")}>Sign up</span>
          </p>
        </div>

        <div className="login-box login-right">
          <div className="info-list">
            <div className="info-item">
              <i className="fas fa-check-circle"></i> <span>Accept missions</span>
            </div>
            <div className="info-item">
              <i className="fas fa-chart-line"></i> <span>Level up your life</span>
            </div>
            <div className="info-item">
              <i className="fas fa-tasks"></i> <span>Track your progress</span>
            </div>
            <div className="info-item">
              <i className="fas fa-trophy"></i> <span>Unlock achievements</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;