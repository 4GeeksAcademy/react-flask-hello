import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../assets/styles/register.css";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const resp = await fetch(`https://opulent-lamp-g759pj7vvq43gvw-3001.app.github.dev/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await resp.json();

      if (resp.ok) {
        alert("Registered successfully!");
        navigate("/login");
      } else {
        alert(data.msg || "Error during registration");
      }
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="register-page">
      <motion.div
        className="register-container"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.5 }}
      >
        <div className="register-box register-left">
          <div className="info-list">
            <div className="info-item"><i className="fas fa-check-circle"></i> <span>Accept missions</span></div>
            <div className="info-item"><i className="fas fa-chart-line"></i> <span>Level up your life</span></div>
            <div className="info-item"><i className="fas fa-tasks"></i> <span>Track your progress</span></div>
            <div className="info-item"><i className="fas fa-trophy"></i> <span>Unlock achievements</span></div>
          </div>
        </div>

        <div className="register-box register-right">
          <h1 className="register-title">LEVEL UP</h1>
          <h2>Register</h2>
          <p>Create your account to begin your journey</p>

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
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
          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button className="register-btn" onClick={handleRegister}>Register</button>

          <button className="github-btn">
            <i className="fab fa-github"></i> Sign up with Github
          </button>

          <p className="login-link">
            Already have an account?{" "}
            <span onClick={() => navigate("/login")}>Log in</span>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;