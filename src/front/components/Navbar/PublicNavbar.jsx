//* 👆 🤟🏼 ❇️ Riki for the group success 9_Abril 👊 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './PublicNavbar.css';
import logo from '../../assets/img/Logo_DronFarm2.png';

const PublicNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  return (
    <nav className="public-navbar">
      <div className="public-navbar-container">
        {/* Logo */}
        <Link to="/" className="public-navbar-logo">
          <img src={logo} alt="DronFarm Logo" className="public-logo-img" />
        </Link>

        {/* Menú Hamburguesa (Mobile) */}
        <input 
          type="checkbox" 
          id="public-navbar-toggle" 
          className="public-navbar-toggle" 
          checked={isMenuOpen}
          onChange={toggleMenu}
        />
        <label htmlFor="public-navbar-toggle" className="public-navbar-toggle-label">
          <span></span>
          <span></span>
          <span></span>
        </label>

        {/* Menú de Navegación */}
        <ul className="public-navbar-menu">
          <li className="public-navbar-item">
            <Link to="/contacto" className="public-navbar-link">Contacto</Link>
          </li>
          <li className="public-navbar-item">
            <Link to="/login" className="public-navbar-button">Iniciar sesión</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default PublicNavbar;