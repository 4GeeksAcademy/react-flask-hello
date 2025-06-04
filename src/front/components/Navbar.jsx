import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsPersonFill, BsHouseFill } from "react-icons/bs";
import { useAuth } from "../context/AuthContext";
import "../styles/Navbar.css";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    alert("Sesión cerrada correctamente.");
    navigate("/login");
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        paddingTop: "0.2rem",
        paddingBottom: "0.2rem",
        position: "absolute",
      }}
    >
      <div className="container-fluid d-flex align-items-center">
        {/* Icono home */}
        <Link to="/" className="nav-link-persona me-3">
          <BsHouseFill size={28} />
        </Link>

        {/* Icono persona */}
        <Link to="/profile" className="nav-link-persona me-3">
          <BsPersonFill size={28} />
        </Link>

        {/* Menú */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="navbar-nav d-flex flex-row gap-4">
            <Link className="nav-link" to="/feed">Escalada</Link>
            <Link className="nav-link" to="/feed">Running</Link>
            <Link className="nav-link" to="/feed">Ciclismo</Link>
            <Link className="nav-link" to="/feed">Fitness</Link>
          </div>
        </div>

        {/* Botón cerrar sesión (si está logueado) */}
        <div className="ms-auto d-flex align-items-center gap-3">
          {user && (
            <button className="btn btn-outline-danger" onClick={handleLogout}>
              Cerrar sesión
            </button>
          )}

          {/* Logo */}
          <div className="navbar-brand">
            <img
              src="/logo_sin_fondo.png"
              alt="SportConnect"
              height="50"
              className="d-inline-block align-top"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
