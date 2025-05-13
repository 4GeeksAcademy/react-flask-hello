import React, { useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useNavigate } from "react-router-dom";

export const SignIn = () => {
  const { dispatch } = useGlobalReducer();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
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
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok && data.token) {
        localStorage.setItem("token", data.token);
        dispatch({ type: "SET_TOKEN", payload: data.token });
        dispatch({ type: "SET_USER", payload: data.user }); // 👈 Aquí se guarda el nombre y email
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
      className="d-flex flex-column align-items-center justify-content-center w-100"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #fce4ec, #e3f2fd)",
        fontFamily: "'Orbitron', sans-serif"
      }}
    >
      <div
        className="p-4 mb-3"
        style={{
          backgroundColor: "#1a1a1a",
          width: "100%",
          maxWidth: "400px",
          borderRadius: "12px",
          boxShadow: "0 0 25px rgba(255, 20, 147, 0.2)"
        }}
      >
        <h4
          className="text-center mb-4"
          style={{
            color: "#fff",
            textShadow: "0 0 6px #FF1493, 0 0 12px #FF1493",
            fontWeight: "bold"
          }}
        >
          Sign In
        </h4>

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
            style={{
              background: "#000",
              color: "#FF1493",
              border: "2px solid #CCCCCC",
              boxShadow: "0 0 6px #CCCCCC",
              borderRadius: "8px"
            }}
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
            style={{
              background: "#000",
              color: "#FF1493",
              border: "2px solid #CCCCCC",
              boxShadow: "0 0 6px #CCCCCC",
              borderRadius: "8px"
            }}
          />
        </div>

        <button
          type="submit"
          className="btn w-100"
          style={{
            background: "#FF1493",
            color: "#fff",
            border: "none",
            fontWeight: "bold",
            boxShadow: "0 0 12px #FF1493, 0 0 24px #FF1493",
            transition: "all 0.3s ease-in-out",
            borderRadius: "8px"
          }}
          onMouseEnter={(e) =>
            (e.target.style.boxShadow =
              "0 0 16px #ff1493, 0 0 32px #ff1493, 0 0 48px #ff1493")
          }
          onMouseLeave={(e) =>
            (e.target.style.boxShadow = "0 0 12px #ff1493, 0 0 24px #ff1493")
          }
        >
          Sign In
        </button>

        <div className="text-center mt-3">
          <a
            href="/password"
            className="btn btn-link"
            style={{
              color: "#00eaff",
              textShadow: "0 0 10px #00eaff"
            }}
          >
            Forgot Password?
          </a>
        </div>
      </div>
    </form>
  );
};
