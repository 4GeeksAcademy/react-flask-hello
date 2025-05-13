import React from "react";
import { Navigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Profile = () => {
  const { store } = useGlobalReducer();

  if (!store.token) return <Navigate to="/signin" />;

  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center text-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #ffe0f1, #e0f7ff)",
        fontFamily: "'Orbitron', sans-serif",
        padding: "2rem"
      }}
    >
      <h1
        className="mb-3"
        style={{
          color: "#FF1493",
          textShadow: "0 0 6px #FF1493, 0 0 12px #FF1493",
          fontWeight: "bold"
        }}
      >
        👋 Welcome, {store.user?.name || "User"}!
      </h1>

      <p className="mb-5" style={{ color: "#333", fontSize: "1.1rem" }}>
        You are logged in successfully. Let's explore!
      </p>

      <button
        className="btn"
        onClick={() => (window.location.href = "/")}
        style={{
          background: "#00AFFF",
          borderColor: "#00AFFF",
          color: "#fff",
          fontWeight: "bold",
          boxShadow: "0 0 8px #00AFFF",
          borderRadius: "8px",
          padding: "0.6rem 1.2rem"
        }}
      >
        Go to Home
      </button>
    </div>
  );
};

export default Profile;
