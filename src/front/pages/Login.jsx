import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "../assets/styles/Login.module.css";

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
        localStorage.setItem("token", data.token);
        localStorage.setItem("user_id", data.user_id);
        alert("Login exitoso");
        navigate("/profilemainpage");
      } else {
        alert(data.msg || "Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Error al iniciar sesión");
    }
  };

  return (
    <div className={styles.loginViewPage}>
      <motion.div
        className={styles.loginViewContainer}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.5 }}
      >
        {/* Lado izquierdo (formulario) */}
        <div className={`${styles.loginViewBox} ${styles.loginViewLeft}`}>
          <h1>
            <span className={styles.loginViewTitle}>LEVEL</span>
            <span className={styles.loginViewTitleAccent}>UP</span>
          </h1>
          <h2 className={styles.loginViewHeading2}>Log in</h2>
          <p className={styles.loginViewParagraph}>
            Please enter your details or click here to register
          </p>

          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.loginViewInput}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.loginViewInput}
          />

          <div className={styles.loginViewRemember}>
            <input type="checkbox" id="remember" />
            <label htmlFor="remember">Remember me</label>
          </div>

          <button className={styles.loginViewBtn} onClick={handleLogin}>
            Log in
          </button>

          <button className={styles.loginViewGithubBtn}>
            <i className="fab fa-github"></i> Log in with Github
          </button>

          <p className={styles.loginViewSignup}>
            Don't have an account?{" "}
            <span onClick={() => navigate("/register")}>Sign up</span>
          </p>
        </div>

        {/* Lado derecho (info) */}
        <div className={`${styles.loginViewBox} ${styles.loginViewRight}`}>
          <div className={styles.loginViewInfoList}>
            <div className={styles.loginViewInfoItem}>
              <i className="fas fa-check-circle"></i> <span>Accept missions</span>
            </div>
            <div className={styles.loginViewInfoItem}>
              <i className="fas fa-chart-line"></i> <span>Level up your life</span>
            </div>
            <div className={styles.loginViewInfoItem}>
              <i className="fas fa-tasks"></i> <span>Track your progress</span>
            </div>
            <div className={styles.loginViewInfoItem}>
              <i className="fas fa-trophy"></i> <span>Unlock achievements</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;