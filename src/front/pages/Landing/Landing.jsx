import React from "react";
import "./Landing.css";
import logo from "../../assets/img/Logo_DronFarm_Icono1.png"; // Ajusta la ruta según la ubicación de tu logo

const Landing = () => {
  return (
    <div className="landing-container">
      {/* Container para el navbar */}
      <div className="navbar-container">
        {/* Navbar en la parte superior */}
        <nav className="navbar">
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
        </nav>
      </div>

      {/* Contenedor con borde para el grid */}
      <div className="grid-container">
        {/* Grid de rectángulos blancos */}
        <div className="rectangles-grid">
          <div className="rectangle rect-1">
            {/* Logo */}
            <div className="logo-container">
              <img 
                src={logo} 
                alt="DroneFarm Logo" 
                className="logo-img"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/200x100?text=DroneFarm";
                }}
              />
            </div>
          </div>
          <div className="rectangle rect-2">
            <div className="rect-content">
              <h1>Plataforma integral de monitoreo agrícola</h1>
              <p>Tecnología de drones para monitoreo y análisis avanzado</p>
            </div>
          </div>
          <div className="rectangle rect-3">
            <div className="rect-content">
              <h3>Servicios</h3>
              <ul>
                <li>Mapeo de cultivos</li>
                <li>Análisis de suelo</li>
                <li>Detección de plagas</li>
              </ul>
            </div>
          </div>
          <div className="rectangle rect-4">
            <div className="rect-content">
              <h3>20%</h3>
              <p>De ahorro en recursos hídricos</p>
            </div>
          </div>
          <div className="rectangle rect-5">
            <div className="rect-content">
              <h2>Revoluciona tu forma de cultivar</h2>
              <p>Nuestras soluciones con drones te permiten optimizar recursos, aumentar rendimientos y reducir costos con decisiones basadas en datos precisos.</p>
              <button className="cta-button">Comenzar ahora</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;