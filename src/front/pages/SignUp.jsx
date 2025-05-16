import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const fetchSignUp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await fetchSignUp.json();
      if (fetchSignUp.ok) {
        alert("Sign Up Successful!");
        setFormData({
          name: "",
          email: "",
          password: "",
          phone: ""
        });
        navigate("/signin");
      } else {
        alert("Sign Up failed: " + data.msg);
        setFormData({
          name: "",
          email: "",
          password: "",
          phone: ""
        });
      }
    } catch (err) {
      console.log("Error:", err);
    }
  };

  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #ffe0f1, #e0f7ff)",
        fontFamily: "'Orbitron', sans-serif"
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="p-4"
        style={{
          backgroundColor: "#1a1a1a",
          borderRadius: "16px",
          boxShadow: "0 0 25px rgba(255, 20, 147, 0.2)",
          width: "100%",
          maxWidth: "400px"
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
          Sign Up
        </h4>

        <div className="mb-3">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="form-control"
            style={{
              background: "#000",
              border: "2px solid #CCCCCC",
              color: "#FF1493",
              boxShadow: "0 0 6px #CCCCCC",
              borderRadius: "8px"
            }}
          />
        </div>

        <div className="mb-3">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="form-control"
            style={{
              background: "#000",
              border: "2px solid #CCCCCC",
              color: "#FF1493",
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
              border: "2px solid #CCCCCC",
              color: "#FF1493",
              boxShadow: "0 0 6px #CCCCCC",
              borderRadius: "8px"
            }}
          />
        </div>

        <div className="mb-3">
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="form-control"
            style={{
              background: "#000",
              border: "2px solid #CCCCCC",
              color: "#FF1493",
              boxShadow: "0 0 6px #CCCCCC",
              borderRadius: "8px"
            }}
          />
        </div>

        <button
          type="submit"
          className="btn w-100 mt-3"
          style={{
            background: "#00AFFF",
            borderColor: "#00AFFF",
            color: "#fff",
            fontWeight: "bold",
            boxShadow: "0 0 12px #00AFFF, 0 0 24px #00AFFF",
            borderRadius: "8px"
          }}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};
