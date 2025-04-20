import React from "react";
import "./Landing.css";
import DarkModeToggle from "../../components/DarkModeToggle/DarkModeToggle";
import mavicImage from "../../assets/img/Mavic 3 volando.png";

const Landing = () => {
  return (
    <div className="landing-container fade-in">
      <DarkModeToggle />

      <div className="cards-container">
        <div className="card card-main">
          <h1>Plataforma integral de monitoreo agrícola</h1>
          <h2>Decisiones inteligentes con datos reales</h2>
        </div>

        <div className="card card-support">
          <h2>Soporte</h2>
          <p>
            ¿Tienes preguntas? Ponte en contacto con nuestro equipo o visita
            nuestro centro de ayuda.
          </p>
          <p>
            También puedes contactar al equipo:<br />
            <strong>+34 911 23 45 67</strong><br />
            <a href="mailto:soporte@dronfarm.com">soporte@dronfarm.com</a>
          </p>
        </div>

        <div className="card card-terms">
          <img src={mavicImage} alt="Drone Mavic 3 volando" />
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
