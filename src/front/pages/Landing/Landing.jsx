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
          
          {/* Contenedor para la imagen (antes estaba en card-terms) */}
          <div className="main-image-container">
            <img src={mavicImage} alt="Drone Mavic 3 volando" />
          </div>
        </div>

        <div className="card card-support">
          {/* Contenido que estaba en card-terms */}
          <h2>Agricultura de Precisión</h2>
          <p>Optimiza tus cultivos con tecnología de vanguardia. Nuestros drones capturan datos precisos que transforman la forma de gestionar tus campos.</p>
          <div className="terms-logo">
            <i className="fas fa-seedling"></i>
          </div>
        </div>

        <div className="card card-terms">
          {/* Contenido que estaba en card-support */}
          <h2>Soporte</h2>
          <p>
            ¿Tienes preguntas? Contacta con nuestro equipo o visita
            el centro de ayuda.
          </p>
          <p>
            <br />
            <strong>+34 911 23 45 67</strong><br />
            <a href="mailto:soporte@dronfarm.com">soporte@dronfarm.com</a>
          </p>
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