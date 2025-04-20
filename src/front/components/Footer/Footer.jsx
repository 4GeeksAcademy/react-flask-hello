import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer-glass">
      <div className="footer-content">
        <p>© 2025 DronFarm Inc. Todos los derechos reservados.</p>
        <div className="footer-links">
          <a href="#terminos">Términos</a>
          <a href="#privacidad">Privacidad</a>
          <a href="#contacto">Contacto</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
