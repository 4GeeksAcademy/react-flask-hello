import React, { useState, useEffect } from "react";
import "./Landing.css";
import logo from "../../assets/img/Logo_DronFarm_Icono1_negro.png";
import logonaked from "../../assets/img/Logo_DronFarm_Icono1_sinmarco.png";
import DarkModeToggle from "../../components/DarkModeToggle/DarkModeToggle";

const Landing = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="landing-container">
      <DarkModeToggle />

      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="navbar-content">
          <img src={logo} alt="Logo DronFarm" className="logo-navbar" />

          <div className="nav-links">
            <a href="#inicio">Inicio</a>
            <a href="#servicios">Servicios</a>
            <a href="#nosotros">Nosotros</a>
            <a href="#contacto">Contacto</a>
          </div>

          <div className="nav-buttons">
            <button className="login-btn">Iniciar Sesión</button>
            <button className="signup-btn">Registrarse</button>
          </div>
        </div>
      </nav>

      <div className="cards-container">
        <div className="card card-main">
          <h1>Plataforma integral de monitoreo agrícola</h1>
          <h2>Optimiza tus cultivos con drones de última generación</h2>
          <div className="card-logo">
            <img src={logonaked} alt="DronFarm Naked Logo" />
          </div>
          <p className="copyright-text">
            © 2025 Todos los derechos reservados DronFarm Inc.
          </p>
        </div>

        <div className="card card-support">
          <h2>Soporte</h2>
          <p>
            ¿Tienes preguntas? Ponte en contacto con nuestro equipo o visita
            nuestro centro de ayuda.
          </p>
          <p><a href="#ayuda">Centro de ayuda</a></p>
          <p>
            También puedes contactar al equipo:<br />
            <strong>+34 911 23 45 67</strong><br />
            <a href="mailto:soporte@dronfarm.com">soporte@dronfarm.com</a>
          </p>
        </div>

        <div className="card card-terms">
          <h2>Enlaces</h2>
          <a href="#terminos">Términos de uso</a>
          <a href="#privacidad">Política de privacidad</a>
        </div>

        <div className="card card-social">
          <h2>Síguenos</h2>
          <div className="social-icons">
            <a href="#instagram" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
            <a href="#facebook" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
            <a href="#twitter" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
