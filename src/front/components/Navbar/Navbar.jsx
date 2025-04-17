/* 👇 ❇️ Riki for the group success 10 Abril👊 */

import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/img/Logo_DronFarm2.png";
import "./Navbar.css";
import { useGlobalReducer } from "../../hooks/useGlobalReducer";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { store, dispatch } = useGlobalReducer();
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isDashboard = location.pathname.includes("/app");

  useEffect(() => {
    setIsAuthenticated(
      !!localStorage.getItem("token") &&
      localStorage.getItem("token") !== "undefined" &&
      localStorage.getItem("token") !== "null" &&
      localStorage.getItem("token").trim() !== ""
    );
  }, [location]);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo con redirección y cierre del menú */}
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

        {/* Menú de navegación */}
        <ul className="navbar-menu">
          {isDashboard || isAuthenticated ? (
            <>
              <li className="navbar-item">
                <Link to="/contacto" className="navbar-link" onClick={closeMenu}>
                  Contacto
                </Link>
              </li>
              <li className="navbar-item">
                <button
                  onClick={() => {
                    closeMenu();
                    handleLogout();
                  }}
                  className="navbar-button navbar-button-logout"
                >
                  Cerrar Sesión
                </button>
              </li>
            </>
          ) : (
            <>
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
                <Link to="/login" className="navbar-button" onClick={closeMenu}>
                  Iniciar Sesión
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
