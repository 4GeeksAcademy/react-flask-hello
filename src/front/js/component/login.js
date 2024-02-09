
import React, { useState, useContext } from "react";
import Modal from "react-modal";
import { useNavigate } from 'react-router-dom';
import "../../styles/login.css";
import { Context } from "../store/appContext";

function Login({ show, handleClose, }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { store, actions } = useContext(Context);

  const handleLogin = async () => {
    try {
      const response = await fetch(process.env.BACKEND_URL + "/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      

      const data = await response.json();

      actions.setAccessToken(data.access_token);
      actions.setIsLoggedIn (true);

      localStorage.setItem("accessToken", data.access_token)
      
      navigate(`/privatePage`);
      
      handleClose();

    } catch (error) {
      setError("An unexpected error occurred");
      console.error(error);
    }
  };

  return (
    <Modal
      isOpen={show}
      onRequestClose={handleClose}
      className="modal-content"
      overlayClassName="modal-overlay"
      contentLabel="Login Modal"
    >
      <h2 className="text">Login</h2>

      <form>
        <div className="inputs">
          <label htmlFor="email">
            <b>Email</b>
          </label>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field mb-2"
          />
        </div>
        <div className="inputs">
          <label htmlFor="password">
            <b>Password</b>
          </label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field mb-3"
          />
        </div>
        <div className="eye-icon-container" >
          <div className="text pe-2"> Show Passwords  </div>
          <div className="eye" id="eye1">
            <button onClick={(e) => { e.preventDefault(); setShowPassword(!showPassword); }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
              </svg>
            </button>
          </div>
        </div>
        <div className="login-button">
          <button
            type="button"
            onClick={handleLogin}
            className="modal-button m-2"
          >
            Login
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default Login;