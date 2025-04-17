/* 👇 ❇️ Riki for the group success 10 Abril 👊 PUBLIC NAVBAR PRO MODE */

import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/img/Logo_DronFarm2.png";
import "./Navbar.css";

const PublicNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(
      !!token &&
      token !== "undefined" &&
      token !== "null" &&
      token.trim() !== ""
    );
  }, [location]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleCuentaClick = () => {
    closeMenu();
    navigate("/app/dashboard");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo dinámico */}
        <Link
          to={isAuthenticated ? "/app/dashboard" : "/"}
          className="navbar-logo"
          onClick={closeMenu}
        >
          <img src={logo} alt="DronFarm Logo" className="logo-img" />
        </Link>

        {/* Menú Hamburguesa (Mobile) */}
        <input
          type="checkbox"
          id="navbar-toggle"
          className="navbar-toggle"
          checked={isMenuOpen}
          onChange={toggleMenu}
        />
        <label htmlFor="navbar-toggle" className="navbar-toggle-label">
          <span></span>
          <span></span>
          <span></span>
        </label>

        {/* Menú de navegación público */}
        <ul className={`navbar-menu ${isMenuOpen ? "open" : ""}`}>
          <li className="navbar-item">
            <Link to="/" className="navbar-link" onClick={closeMenu}>
              Inicio
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/nosotros" className="navbar-link" onClick={closeMenu}>
              Nosotros
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/servicios" className="navbar-link" onClick={closeMenu}>
              Servicios
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/contacto" className="navbar-link" onClick={closeMenu}>
              Contacto
            </Link>
          </li>
          <li className="navbar-item">
            {isAuthenticated ? (
              <button
                onClick={handleCuentaClick}
                className="navbar-button navbar-button-login"
              >
                Mi cuenta
              </button>
            ) : (
              <Link
                to="/login"
                className="navbar-button"
                onClick={closeMenu}
              >
                Iniciar Sesión
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default PublicNavbar;
