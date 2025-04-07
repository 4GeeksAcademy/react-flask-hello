/* 👇 ❇️ Riki for the group success 👊 */
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/img/Logo_DronFarm2.png";

import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <img src={logo} alt="DronFarm Logo" className="logo-img" />
        </Link>

        {/* Menú Hamburguesa (Mobile) */}
        <input type="checkbox" id="navbar-toggle" className="navbar-toggle" />
        <label htmlFor="navbar-toggle" className="navbar-toggle-label">
          <span></span>
        </label>

        {/* Items de Navegación */}
        <ul className="navbar-menu">
          <li className="navbar-item">
            <Link to="/dashboard" className="navbar-link">Dashboard</Link>
          </li>
          <li className="navbar-item">
            <Link to="/mapa" className="navbar-link">Mapa</Link>
          </li>
          <li className="navbar-item">
            <Link to="/informes" className="navbar-link">Informes</Link>
          </li>
          <li className="navbar-item">
            <Link to="/calendario" className="navbar-link">Calendario</Link>
          </li>

          {isAuthenticated ? (
            <>
              <li className="navbar-item">
                <Link to="/perfil" className="navbar-link">Mi Perfil</Link>
              </li>
              <li className="navbar-item">
                <button onClick={handleLogout} className="navbar-button">Cerrar Sesión</button>
              </li>
            </>
          ) : (
            <li className="navbar-item">
              <Link to="/login" className="navbar-button">Iniciar Sesión</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;