/* 👇 ❇️ Riki for the group success 👊 */
import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/img/Logo_DronFarm1.png";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Sección 1: Logo y Descripción */}
        <div className="footer-section">
          <div className="footer-logo">
            <img src={logo} alt="DronFarm" />
            <p>Plataforma integral de monitoreo agrícola inteligente. Decisiones con datos</p>
          </div>
        </div>

        {/* Sección 2: Enlaces Rápidos */}
        <div className="footer-section">
          <h3>Enlaces Rápidos</h3>
          <ul>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/mapa">Mapa Interactivo</Link></li>
            <li><Link to="/informes">Generar Informes</Link></li>
            <li><Link to="/calendario">Calendario</Link></li>
          </ul>
        </div>

        {/* Sección 3: Legal */}
        <div className="footer-section">
          <h3>Legal</h3>
          <ul>
            <li><Link to="/terminos">Términos de Servicio</Link></li>
            <li><Link to="/privacidad">Política de Privacidad</Link></li>
            <li><Link to="/cookies">Cookies</Link></li>
          </ul>
        </div>

        {/* Sección 4: Contacto */}
        <div className="footer-section">
          <h3>Contacto</h3>
          <ul>
            <li><i className="fas fa-envelope"></i> info@dronfarm.com</li>
            <li><i className="fas fa-phone"></i> +34 123 456 789</li>
            <li><i className="fas fa-map-marker-alt"></i> Málaga, España</li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} DronFarm. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;