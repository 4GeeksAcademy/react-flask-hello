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

  // Detectar si estamos en el dashboard - corregido para usar "/app"
  const isDashboard = location.pathname.includes("/app");

  useEffect(() => {
    // Actualizar el estado de autenticación cuando cambie
    setIsAuthenticated(!!localStorage.getItem("token"));
  }, [location]);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/"); // Redirige a la página de landing
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to={isAuthenticated ? "/app" : "/"} className="navbar-logo">
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

        {/* Items de Navegación */}
        <ul className="navbar-menu">
          {isDashboard || isAuthenticated ? (
            <>
              {/* Solo contacto y cerrar sesión, manteniendo la misma estructura que PublicNavbar */}
              <li className="navbar-item">
                <Link to="/contacto" className="navbar-link">Contacto</Link>
              </li>
              <li className="navbar-item">
                <button
                  onClick={handleLogout}
                  className="navbar-button navbar-button-logout"
                >
                  Cerrar Sesión
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="navbar-item">
                <Link to="/" className="navbar-link">Inicio</Link>
              </li>
              <li className="navbar-item">
                <Link to="/nosotros" className="navbar-link">Nosotros</Link>
              </li>
              <li className="navbar-item">
                <Link to="/servicios" className="navbar-link">Servicios</Link>
              </li>
              <li className="navbar-item">
                <Link to="/contacto" className="navbar-link">Contacto</Link>
              </li>
              <li className="navbar-item">
                <Link to="/login" className="navbar-button">Iniciar Sesión</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;