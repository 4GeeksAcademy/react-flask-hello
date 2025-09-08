import React, { useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer"; 
import { useNavigate} from "react-router-dom";

export const SignIn = () => {
  const { dispatch } = useGlobalReducer(); 
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("Please complete all fields");
      return;
    }

    try {
      console.log(`${import.meta.env.VITE_BACKEND_URL}/api/signin`);

      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/signin`, {

        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        localStorage.setItem("token", data.token);
        dispatch({ type: "SET_TOKEN", payload: data.token }); 
        navigate("/profile");
      } else {
        setError("Invalid email or password.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Invalid email or password.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="container d-flex flex-column align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="mb-4">
        <div
          className="logo rounded-circle bg-secondary d-flex align-items-center justify-content-center"
          style={{
            width: 80,
            height: 80,
            color: "white",
            fontWeight: "bold",
            position: "absolute",
            top: "20px",
            left: "20px",
          }}
        >
          Logo
        </div>
      </div>

      <div
        className="p-4 mb-3"
        style={{
          backgroundColor: "#e0e0e0",
          width: "100%",
          maxWidth: "400px",
          borderRadius: "8px",
        }}
      >
        <h4 className="text-center mb-4">Sign In</h4>

        {error && (
          <div className="alert alert-danger text-center p-2">{error}</div>
        )}

        <div className="mb-3">
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="form-control"
          />
        </div>
      </div>

      <button type="submit" className="btn btn-secondary">
        Sign In
      </button>
      <a href="/password" className="btn btn-link">
        Forgot Password?
      </a>
    </form>
  );
};
