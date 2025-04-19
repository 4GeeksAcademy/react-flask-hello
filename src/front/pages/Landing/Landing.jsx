import React, { useEffect } from "react";
import backgroundImage from "../../assets/img/DJI-Mavic-3-Multispectral-from-above-scaled.jpg";
import mask from "../../assets/img/putofondo.svg?url";
import logo from "../../assets/img/Logo_DronFarm_Icono1.png";
import "./Landing.css";

const Landing = () => {
  useEffect(() => {
    document.body.classList.add("landing-page");
    return () => {
      document.body.classList.remove("landing-page");
    };
  }, []);

  return (
    <div className="landing-container">
      {/* Fondo con máscara */}
      <div
        className="background-layer"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      ></div>

      {/* Logo absoluto */}
      <img src={logo} alt="DronFarm Logo" className="logo-absolute" />

      {/* Navbar absoluto */}
      <nav className="navbar-absolute">
        <a href="#servicios">Servicios</a>
        <a href="#quienes-somos">Quiénes somos</a>
        <a href="#contacto">Contacto</a>

        <a href="#login" className="cta-session">Iniciar Sesión</a>
      </nav>


      {/* Bloque inferior derecho */}
      <div className="info-box">
        <h2 className="info-title">Plataforma integral de monitoreo agrícola</h2>
        <p className="info-subtitle">Decisiones inteligentes con datos reales</p>
      </div>

      {/* Flecha y link separados, con control total */}
      <div className="info-action">
        <div className="circle">
          <div className="triangle"></div>
        </div>
        <span className="info-link-text">+ información</span>
      </div>

    </div>
  );
};

export default Landing;
