import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logoNavbar from "../assets/img/logo-navbar.png";

export const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav
      className="py-3"
      style={{
        background: "rgba(240,245,251,0.8)", /* soft pastel behind */
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      <div className="container-fluid d-flex align-items-center justify-content-between">
        {/* Logo */}
        <Link to="/" className="d-flex align-items-center text-decoration-none">
          <img
            src={logoNavbar}
            alt="Logo"
            width="70"
            height="70"
            className="rounded-circle shadow-sm"
            style={{ border: "2px solid #FF1493" }}
          />
        </Link>

        {/* Controls */}
        <div className="d-flex align-items-center">
          {/* Back */}
          <button
            onClick={() => navigate(-1)}
            className="btn btn-outline-secondary me-3"
            style={{ fontSize: "1.3rem", padding: "0.5rem" }}
          >
            <i className="bi bi-arrow-left-circle-fill"></i>
          </button>

          {/* Sign In */}
          <Link to="/signin" className="btn"
            style={{
              background: "#FF1493",
              borderColor: "#FF1493",
              color: "#fff",
              marginRight: "0.5rem",
            }}
          >
            Sign In
          </Link>

          {/* Sign Up */}
          <Link to="/signup" className="btn"
            style={{
              background: "#00BFFF",
              borderColor: "#00BFFF",
              color: "#fff"
            }}
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};
