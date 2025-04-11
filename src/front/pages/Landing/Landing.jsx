import React from 'react';
import './Landing.css';
import Logo from '../../assets/img/Logo_DronFarm2.png';

const Landing = () => {
  return (
    <div className="landing-page">
      {/* Columna izquierda (logo) */}
      <div className="logo-column">
        <img src={Logo} alt="DronFarm" className="logo" />
      </div>

      {/* Columna derecha (glassmorphism) */}
      <div className="glass-column">
        <div className="navigation">
          <a href="#contacto" className="nav-link">Contacto</a>
          <a href="#login" className="nav-link login-btn">Iniciar sesión</a>
        </div>
      </div>
    </div>
  );
};

export default Landing;