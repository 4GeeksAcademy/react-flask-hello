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
      {/* Capa del fondo con máscara */}
      <div
        className="background-layer"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          WebkitMaskImage: `url(${mask})`,
          maskImage: `url(${mask})`,
        }}
      ></div>

      {/* Capa por encima con logo y navbar */}
      <div className="ui-layer">
        <img src={logo} alt="DronFarm Logo" className="logo" />
        <nav className="navbar glass">
          <a href="#servicios">Servicios</a>
          <a href="#quienes-somos">Quiénes somos</a>
          <a href="#contacto">Contacto</a>
          <a href="#login">Iniciar Sesión</a>
        </nav>
      </div>
    </div>
  );
};

export default Landing;
