import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth0 } from '@auth0/auth0-react';
import styles from "../assets/styles/Register.module.css";

const URL = import.meta.env.VITE_BACKEND_URL;

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { loginWithRedirect } = useAuth0();


  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const resp = await fetch(`${URL}api/register`, {
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
    <div className={styles.registerPage}>
      <div className={styles.registerPageOverlay}></div> {/* Filtro oscuro */}
      <motion.div
        className={styles.registerContainer}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.5 }}
      >
        <div className={`${styles.registerBox} ${styles.registerLeft}`}>
          <div className={styles.registerInfoList}>
            <div className={styles.registerInfoItem}>
              <i className="fas fa-check-circle"></i> <span>Accept missions</span>
            </div>
            <div className={styles.registerInfoItem}>
              <i className="fas fa-chart-line"></i> <span>Level up your life</span>
            </div>
            <div className={styles.registerInfoItem}>
              <i className="fas fa-tasks"></i> <span>Track your progress</span>
            </div>
            <div className={styles.registerInfoItem}>
              <i className="fas fa-trophy"></i> <span>Unlock achievements</span>
            </div>
          </div>
        </div>

        <div className={`${styles.registerBox} ${styles.registerRight}`}>
          <h1>
            <span className={styles.registerLevelText}>LEVEL</span>
            <span className={styles.registerUpText}>UP</span>
          </h1>
          <h2 className={styles.registerHeading}>Register</h2>
          <p className={styles.registerParagraph}>Create your account to begin your journey</p>

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={styles.registerInput}
          />
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.registerInput}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.registerInput}
          />
          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={styles.registerInput}
          />

          <button className={styles.registerBtn} onClick={handleRegister}>Register</button>

          <button className="github-btn" onClick={() => loginWithRedirect()}>
            <i className="fab fa-github"></i> Sign up with Github
          </button>

          <p className={styles.registerLoginLink}>
            Already have an account?{" "}
            <span onClick={() => navigate("/login")}>Log in</span>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;