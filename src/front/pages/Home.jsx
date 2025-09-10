// src/front/pages/Home.jsx
import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Login } from "../components/Login.jsx";
import heroZapatos from "../assets/img/hero-zapatos.jpg"
import heroFestival from "../assets/img/hero-festival.jpg"
import heroCine from "../assets/img/hero-cine.jpg"
import mexico from "../assets/img/mexico.jpg"
import { Card } from "../components/Card.jsx";
import { useParams } from 'react-router-dom';
import { supabase } from "../../api/supabaseClient";
import { ListaEventos } from "./ListaEventos.jsx";
import { EventosHome } from "../components/EventosHome.jsx";

export const Home = () => {
  // carrusel
  const settings = { dots: true, infinite: true, speed: 500, slidesToShow: 1, slidesToScroll: 1 };
  let { token } = useParams();
  // rutas (tal cual la tenía)
  const navigate = useNavigate();

  // ---- DESTINOS PRINCIPALES (4 tarjetas)
  const destinosPrincipales = [
    { titulo: "Morelia, Michoacán",      pais: "México",   img: "/src/front/assets/img/Morelia-turistica.jpg"    },
    { titulo: "Cita a ciegas con el cine", pais: "Cultura", img: "src/front/assets/img/cita-ciegas.jpg"      },
    { titulo: "Noche de fútbol",         pais: "Deportes", img: "src/front/assets/img/Chiringuito de jugones.jpg"     },
    { titulo: "Festival al aire libre",  pais: "Música",   img: "src/front/assets/img/Andalucia-starlite.jpg"   },
  ];

  useEffect(() => {
    if (token) {
      moveUser()
    }
  }, [])

  const moveUser = async () => {
    const { error } = await supabase.auth.signOut();
    navigate("/login")
  }

  return (
    <div className="home-masterpiece">
      <div className="gradient-container">
        <div className="page">
          {/* Login arriba */}
          <div className="login-section">
            <div className="second-gradient" />
            <div className="login-content">
              <Login />
            </div>
          </div>

          {/* HERO: texto + collage */}
          <section className="hero">
            {/* Columna izquierda */}
            <div className="hero-text">
              <h1 className="knect-title">Knect</h1>
              <p className="copy hero-copy-1">Nace la nueva forma de organizarte a ti y a tu grupo de personas</p>
              <p className="copy hero-copy-2">
                Con Knect, no te perderás los eventos que más te gustan, crearlos e incluso encontrar nuevas
                experiencias
              </p>

              <div className="hero-cta">
                <Link to="/crear-evento" className="btn btn-chip cta-button">Planifica tu evento</Link>
              </div>
            </div>

            {/* Columna derecha: collage (1 cuadrado grande + 3 pequeñas) */}
            <div className="hero-collage">
              <div className="card lg">
                <img src="https://images.pexels.com/photos/380283/pexels-photo-380283.jpeg" alt="Hero grande" className="collage-img" />
              </div>
              <div className="card sm a">
                <img src="https://images.pexels.com/photos/154147/pexels-photo-154147.jpeg" alt="Hero A" className="collage-img" />
              </div>
              <div className="card sm b">
                <img src="https://cdn.pixabay.com/photo/2024/06/23/20/54/ai-generated-8848753_960_720.jpg" alt="Hero B" className="collage-img" />
              </div>
              <div className="card sm c">
                <img src="https://cdn.pixabay.com/photo/2017/09/17/11/54/dresden-2758277_960_720.jpg" alt="Hero C" className="collage-img" />
              </div>
            </div>
          </section>

        {/* Carrusel (Mi contenido) */}
          <section className="section carousel-section">
            <Slider {...settings}>
              <div>
                <div className="slide-content">
                  <img
                    src={mexico}
                    alt="Imagen 1"
                    className="slide-image"
                  />
                  <p className="copy slide-text">
                    Guarda todos los eventos en tu calendario y
                    mantente al tanto de las novedades para asistir al evento.
                  </p>
                </div>
              </div>

              <div>
                <div className="slide-content">
                  <img
                    src={heroCine}
                    alt="Imagen 2"
                    className="slide-image"
                  />
                  <p className="copy slide-text">
                    Estarás en todos los eventos y podrás comunicarte con tus amigos a través de la aplicación.
                  </p>
                </div>
              </div>
     
              <div>
                <div className="slide-content">
                  <img
                    src={heroFestival}
                    alt="Imagen 3"
                    className="slide-image"
                  />
                  <p className="copy slide-text">
                    Podrás añadir la dirección del evento y abrirlo en un instante.
                  </p>
                </div>
              </div>
            </Slider>
          </section>

          {/* Destinos principales */}
          <section className="section events-section">
            <div className="section-head">
              <div className="section-actions">
                <Link to="/eventos" className="pill explore-pill">Explorar todos los eventos</Link>
              </div>
            </div>
              <div className="events-container">
                <EventosHome />
              </div>
          </section>
        </div>

        <div className="spacer" />
      </div>

      <style jsx>{`
        .home-masterpiece {
          min-height: 100vh;
          position: relative;
          overflow-x: hidden;
        }

        /* FONDO ÉPICO CON GRADIENTES ANIMADOS */
        .home-masterpiece::before {
          content: '';
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: 
            radial-gradient(circle at 20% 80%, var(--glow-primary) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, var(--glow-secondary) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(124, 92, 255, 0.3) 0%, transparent 30%),
            linear-gradient(135deg, var(--bg-start) 0%, var(--bg-end) 100%);
          animation: backgroundPulse 15s ease-in-out infinite;
          z-index: -2;
        }

        @keyframes backgroundPulse {
          0%, 100% { 
            filter: brightness(1) hue-rotate(0deg); 
            transform: scale(1);
          }
          50% { 
            filter: brightness(1.05) hue-rotate(5deg); 
            transform: scale(1.01);
          }
        }

        /* PARTÍCULAS FLOTANTES ELEGANTES */
        .home-masterpiece::after {
          content: '';
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: 
            radial-gradient(2px 2px at 20% 30%, var(--particles), transparent),
            radial-gradient(1px 1px at 40% 70%, rgba(255, 255, 255, 0.4), transparent),
            radial-gradient(1px 1px at 90% 40%, var(--glow-secondary), transparent),
            radial-gradient(2px 2px at 70% 80%, var(--glow-primary), transparent);
          background-size: 400px 300px, 300px 250px, 350px 200px, 450px 350px;
          animation: particlesFlow 25s linear infinite;
          pointer-events: none;
          z-index: -1;
          opacity: 0.6;
        }

        @keyframes particlesFlow {
          0% { transform: translateX(0) translateY(0); }
          100% { transform: translateX(-400px) translateY(-300px); }
        }

        .gradient-container {
          position: relative;
          z-index: 1;
        }

        .page {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
          position: relative;
        }

        /* LOGIN SECTION CON GLASS EFFECT */
        .login-section {
          position: relative;
          margin-bottom: 4rem;
          padding: 2rem 0;
        }

        .second-gradient {
          position: absolute;
          top: 0;
          left: -50%;
          right: -50%;
          bottom: 0;
          background: linear-gradient(
            135deg, 
            rgba(124, 92, 255, 0.1) 0%, 
            rgba(255, 184, 107, 0.1) 50%,
            rgba(124, 92, 255, 0.1) 100%
          );
          border-radius: 30px;
          filter: blur(20px);
          animation: gradientShift 8s ease-in-out infinite;
        }

        @keyframes gradientShift {
          0%, 100% { transform: translateX(0) scale(1); }
          50% { transform: translateX(20px) scale(1.02); }
        }

        .login-content {
          position: relative;
          z-index: 2;
        }

        /* HERO SECTION ESPECTACULAR */
        .hero {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
          margin: 6rem 0;
          position: relative;
        }

        .hero-text {
          animation: heroTextSlide 1.2s cubic-bezier(0.23, 1, 0.32, 1) forwards;
          opacity: 0;
          transform: translateX(-50px);
        }

        @keyframes heroTextSlide {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .knect-title {
          font-size: clamp(3rem, 8vw, 5rem);
          font-weight: 900;
          margin: 0 0 2rem 0;
          background: linear-gradient(
            135deg, 
            var(--accent) 0%, 
            var(--accent-2) 50%, 
            var(--accent) 100%
          );
          background-size: 200% 200%;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: titleGlow 3s ease-in-out infinite;
          text-shadow: 0 0 40px rgba(124, 92, 255, 0.3);
          line-height: 0.9;
        }

        @keyframes titleGlow {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .hero-copy-1 {
          font-size: 1.3rem;
          font-weight: 600;
          color: var(--text);
          line-height: 1.4;
          margin-bottom: 1.5rem;
          text-shadow: var(--text-glow);
        }

        .hero-copy-2 {
          font-size: 1.1rem;
          color: var(--muted);
          line-height: 1.6;
          margin-bottom: 2.5rem;
        }

        .hero-cta {
          margin-top: 2rem;
        }

        .cta-button {
          background: linear-gradient(135deg, var(--accent), var(--accent-2)) !important;
          color: #ffffff !important;
          border: none !important;
          padding: 1rem 2rem !important;
          font-size: 1.1rem !important;
          font-weight: 700 !important;
          border-radius: 16px !important;
          box-shadow: 
            0 10px 30px rgba(124, 92, 255, 0.4),
            0 0 40px rgba(124, 92, 255, 0.2) !important;
          transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1) !important;
          position: relative;
          overflow: hidden;
        }

        .cta-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          transition: left 0.6s ease;
        }

        .cta-button:hover {
          transform: translateY(-5px) scale(1.05) !important;
          box-shadow: 
            0 20px 60px rgba(124, 92, 255, 0.6),
            0 0 80px rgba(124, 92, 255, 0.4) !important;
          filter: brightness(1.1);
        }

        .cta-button:hover::before {
          left: 100%;
        }

        /* COLLAGE CON EFECTOS 3D */
        .hero-collage {
          display: grid;
          grid-template-areas: 
            "lg lg sm-a"
            "lg lg sm-b"
            "sm-c sm-c sm-c";
          grid-template-rows: 1fr 1fr 120px;
          grid-template-columns: 1fr 1fr 150px;
          gap: 20px;
          height: 500px;
          animation: collageSlide 1.2s cubic-bezier(0.23, 1, 0.32, 1) 0.3s forwards;
          opacity: 0;
          transform: translateX(50px);
        }

        @keyframes collageSlide {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .hero-collage .card.lg { grid-area: lg; }
        .hero-collage .card.sm.a { grid-area: sm-a; }
        .hero-collage .card.sm.b { grid-area: sm-b; }
        .hero-collage .card.sm.c { grid-area: sm-c; }

        .hero-collage .card {
          border-radius: 24px;
          overflow: hidden;
          position: relative;
          box-shadow: 
            0 20px 40px rgba(0, 0, 0, 0.2),
            0 0 40px rgba(124, 92, 255, 0.1);
          transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
          transform-style: preserve-3d;
        }

        .hero-collage .card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            135deg, 
            rgba(124, 92, 255, 0.1), 
            rgba(255, 184, 107, 0.1)
          );
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: 2;
        }

        .hero-collage .card:hover {
          transform: 
            translateY(-15px) 
            rotateX(10deg) 
            rotateY(5deg) 
            scale(1.02);
          box-shadow: 
            0 40px 80px rgba(0, 0, 0, 0.3),
            0 0 60px rgba(124, 92, 255, 0.3);
        }

        .hero-collage .card:hover::before {
          opacity: 1;
        }

        .collage-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: all 0.6s ease;
          filter: brightness(0.9) contrast(1.1);
        }

        .hero-collage .card:hover .collage-img {
          transform: scale(1.1);
          filter: brightness(1.1) contrast(1.2) saturate(1.3);
        }

        /* CAROUSEL SECTION MEJORADA */
        .carousel-section {
          margin: 8rem 0;
          background: var(--glass-bg);
          backdrop-filter: blur(20px);
          border: 1px solid var(--glass-border);
          border-radius: 32px;
          padding: 4rem 3rem;
          box-shadow: 
            0 30px 60px rgba(0, 0, 0, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
          position: relative;
          overflow: hidden;
        }

        .carousel-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            135deg,
            rgba(124, 92, 255, 0.05) 0%,
            transparent 50%,
            rgba(255, 184, 107, 0.05) 100%
          );
          pointer-events: none;
        }

        .slide-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          align-items: center;
          position: relative;
          z-index: 1;
        }

        .slide-image {
          width: 100%;
          border-radius: 20px;
          border: 3px solid var(--accent);
          box-shadow: 
            0 20px 40px rgba(124, 92, 255, 0.3),
            0 0 40px rgba(124, 92, 255, 0.1);
          transition: all 0.4s ease;
          transform: perspective(1000px) rotateY(-5deg);
        }

        .slide-image:hover {
          transform: perspective(1000px) rotateY(0deg) scale(1.02);
          box-shadow: 
            0 30px 60px rgba(124, 92, 255, 0.4),
            0 0 60px rgba(124, 92, 255, 0.2);
        }

        .slide-text {
          font-size: 1.2rem !important;
          line-height: 1.7 !important;
          color: var(--text) !important;
          font-weight: 500;
          text-shadow: var(--text-glow);
        }

        /* EVENTS SECTION FINAL */
        .events-section {
          margin: 6rem 0 4rem 0;
        }

        .section-head {
          text-align: center;
          margin-bottom: 3rem;
        }

        .section-actions {
          display: flex;
          justify-content: center;
        }

        .explore-pill {
          background: linear-gradient(135deg, var(--accent), var(--accent-2)) !important;
          color: #ffffff !important;
          text-decoration: none !important;
          padding: 1rem 2rem !important;
          border-radius: 50px !important;
          font-weight: 600 !important;
          font-size: 1.1rem !important;
          box-shadow: 
            0 10px 30px rgba(124, 92, 255, 0.3),
            0 0 40px rgba(124, 92, 255, 0.1) !important;
          transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1) !important;
          border: none !important;
          position: relative;
          overflow: hidden;
        }

        .explore-pill::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.5s ease;
        }

        .explore-pill:hover {
          transform: translateY(-3px) scale(1.05) !important;
          box-shadow: 
            0 20px 50px rgba(124, 92, 255, 0.5),
            0 0 60px rgba(124, 92, 255, 0.3) !important;
        }

        .explore-pill:hover::before {
          left: 100%;
        }

        .events-container {
          margin-top: 3rem;
          position: relative;
        }

        .spacer {
          height: 2rem;
        }

        /* MEJORAS EN SLICK CAROUSEL */
        .carousel-section :global(.slick-dots) {
          bottom: -60px;
        }

        .carousel-section :global(.slick-dots li button:before) {
          font-size: 16px;
          color: var(--accent);
          opacity: 0.5;
        }

        .carousel-section :global(.slick-dots li.slick-active button:before) {
          opacity: 1;
          color: var(--accent);
        }

        .carousel-section :global(.slick-prev),
        .carousel-section :global(.slick-next) {
          z-index: 10;
          width: 50px;
          height: 50px;
        }

        .carousel-section :global(.slick-prev:before),
        .carousel-section :global(.slick-next:before) {
          font-size: 30px;
          color: var(--accent);
        }

        /* RESPONSIVE DESIGN */
        @media (max-width: 768px) {
          .hero {
            grid-template-columns: 1fr;
            gap: 3rem;
            text-align: center;
          }

          .hero-collage {
            grid-template-areas: 
              "lg lg"
              "sm-a sm-b"
              "sm-c sm-c";
            grid-template-columns: 1fr 1fr;
            grid-template-rows: 250px 120px 100px;
            height: auto;
          }

          .slide-content {
            grid-template-columns: 1fr;
            gap: 2rem;
            text-align: center;
          }

          .slide-image {
            transform: perspective(1000px) rotateY(0deg);
          }

          .carousel-section {
            padding: 2rem 1.5rem;
          }

          .page {
            padding: 0 1rem;
          }

          .knect-title {
            font-size: 3rem;
          }
        }

        @media (max-width: 480px) {
          .hero-collage {
            grid-template-areas: 
              "lg"
              "sm-a"
              "sm-b"
              "sm-c";
            grid-template-columns: 1fr;
            grid-template-rows: repeat(4, 150px);
            gap: 15px;
          }

          .cta-button,
          .explore-pill {
            width: 100% !important;
            text-align: center !important;
          }
        }
      `}</style>
    </div>
  );
};