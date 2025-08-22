import "./aboutus.css";
import SilviaImg from "./img/Silvia.png";
import AlbertoImg from "./img/Alberto.jpg";
import AdrianImg from "./img/Adrian.png";

import { Instagram, Facebook, Mail, Twitter } from "lucide-react";

export const AboutUs = () => {
  return (
    <section className="about" id="about">
      <header className="about__hero" aria-label="Presentación de la compañía">
        <div className="about__hero-bg" />
        <div className="about__hero-inner container">
          <h1 className="about__title">
            <span className="about__title-top">SOBRE</span>
            <span className="about__title-bottom">NOSOTROS</span>
          </h1>
          <p className="about__subtitle">
            Diseño, código y pasión por los videojuegos desde 1991.
          </p>
        </div>
        <div className="about__scroll" aria-hidden="true">▼</div>
      </header>

      <section className="about__story container">
        <article className="story story--left">
          <div className="story__media">
            <img
              className="story__img"
              src="https://www.hoymadrid.app/wp-content/uploads/2024/02/Las-tiendas-de-videojuegos-retro-mas-chulas-de-Madrid-.jpg"
              alt="Ilustración de nuestro origen"
              loading="lazy"
            />
          </div>
          <div className="story__text">
            <h3 className="story__title">Líderes desde 1991</h3>
            <p>
              Nacimos con la idea de crear experiencias inolvidables. Desde
              nuestros primeros servidores hasta la infraestructura actual,
              hemos mantenido un objetivo: hacer que cada partida cuente.
            </p>
          </div>
        </article>

        <article className="story story--right">
          <div className="story__text">
            <h3 className="story__title">Innovación constante</h3>
            <p>
              Nos reinventamos en cada proyecto: optimización, seguridad,
              accesibilidad y estilo propio. Menos ruido, más juego. Tecnología
              al servicio de la comunidad.
            </p>
          </div>
          <div className="story__media">
            <img
              className="story__img"
              src="https://static.grupojoly.com/clip/747a2a68-335a-414a-9b7e-412587400504_16-9-aspect-ratio_1600w_0.jpg"
              alt="Ilustración de innovación"
              loading="lazy"
            />
          </div>
        </article>
      </section>

      <section className="about__team container" aria-label="Nuestro equipo">
        <div><h2 className="team__title">Equipo</h2></div>

        <div className="team__grid">
          {/* Silvia */}
          <article className="team-card" tabIndex={0}>
            <div className="team-card__glow" aria-hidden="true" />
            <div className="team-card__img-wrap">
              <img src={SilviaImg} alt="Silvia — Front-End" className="team-card__img" />
            </div>
            <div className="team-card__body">
              <h3 className="team-card__name">Silvia</h3>
              <p className="team-card__role">Front-End</p>
              <nav className="team-card__social" aria-label="Redes sociales de Silvia">
                <a href="#"><Instagram size={18} /></a>
                <a href="#"><Facebook size={18} /></a>
                <a href="mailto:hi@example.com"><Mail size={18} /></a>
                <a href="#"><Twitter size={18} /></a>
              </nav>
            </div>
          </article>

          {/* Alberto */}
          <article className="team-card" tabIndex={0}>
            <div className="team-card__glow" aria-hidden="true" />
            <div className="team-card__img-wrap">
              <img src={AlbertoImg} alt="Alberto — Back-End" className="team-card__img" />
            </div>
            <div className="team-card__body">
              <h3 className="team-card__name">Alberto</h3>
              <p className="team-card__role">Back-End</p>
              <nav className="team-card__social" aria-label="Redes sociales de Alberto">
                <a href="#"><Instagram size={18} /></a>
                <a href="#"><Facebook size={18} /></a>
                <a href="mailto:hi@example.com"><Mail size={18} /></a>
                <a href="#"><Twitter size={18} /></a>
              </nav>
            </div>
          </article>

          {/* Adrián */}
          <article className="team-card" tabIndex={0}>
            <div className="team-card__glow" aria-hidden="true" />
            <div className="team-card__img-wrap">
              <img src={AdrianImg} alt="Adrián Beneroso — Full-Stack" className="team-card__img" />
            </div>
            <div className="team-card__body">
              <h3 className="team-card__name">Adrián Beneroso</h3>
              <p className="team-card__role">Full-Stack</p>
              <nav className="team-card__social" aria-label="Redes sociales de Adrián">
                <a href="#"><Instagram size={18} /></a>
                <a href="#"><Facebook size={18} /></a>
                <a href="mailto:hi@example.com"><Mail size={18} /></a>
                <a href="#"><Twitter size={18} /></a>
              </nav>
            </div>
          </article>
        </div>
      </section>
    </section>
  );
};