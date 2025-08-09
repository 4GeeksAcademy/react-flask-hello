// src/front/pages/VistaHome.jsx
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Login } from "../components/Login.jsx";

export const VistaHome = () => {
  // carrusel
  const settings = { dots: true, infinite: true, speed: 500, slidesToShow: 1, slidesToScroll: 1 };

  // rutas (tal cual la tenía)
  const navigate = useNavigate();
  const rutaLogin = () => navigate("/login");
  const rutaUsuario = () => navigate("/usuario");
  const rutaAjustesUsuario = () => navigate("/AjustesUsuario");
  const rutaEvento = () => navigate("/evento");
  const rutaNotFound = () => navigate("/NotFound");
  const rutaFormulario = () => navigate("/Formulario");
  const rutaCrearEvento = () => navigate("/crear-evento");
  const rutaLoginPage = () => navigate("/LoginPage");

  // ---- HERO COLLAGE (imagen Hori): imágenes desde /public/img
  const heroCollage = {
    lg: "/img/hero-zapatos.jpg",     // (Los zapatos)
    a:  "/img/hero-cine.jpg",        // (El puñetero proyector)
    b:  "/img/hero-festival.jpg",    // (El festival)
    c:  "/img/mexico.jpg",           // (Morelia)
  };

  // ---- DESTINOS PRINCIPALES (4 tarjetas)
  const destinosPrincipales = [
    { titulo: "Morelia, Michoacán",      pais: "México",   img: "/img/mexico.jpg"    },
    { titulo: "Cita a ciegas con el cine", pais: "Cultura", img: "/img/cine.jpg"      },
    { titulo: "Noche de fútbol",         pais: "Deportes", img: "/img/futbol.jpg"     },
    { titulo: "Festival al aire libre",  pais: "Música",   img: "/img/festival.jpg"   },
  ];

  return (
    <div className="gradient-container">
      <div className="page">
        {/* Login arriba */}
        <div style={{ position: "relative" }}>
          <div className="second-gradient" />
          <div style={{ position: "relative", zIndex: 1 }}>
            <Login />
          </div>
        </div>

        {/* HERO: texto + collage */}
        <section className="hero">
          {/* Columna izquierda */}
          <div>
            <h1 className="knect-title">Knect</h1>
            <p className="copy">Nace la nueva forma de organizarte a ti y a tu grupo de personas</p>
            <p className="copy">
              Con Knect, no te perderás los eventos que más te gustan, crearlos e incluso encontrar nuevas
              experiencias
            </p>

            <div className="actions">
              <button className="btn" onClick={rutaLogin}>Login</button>
              <button className="btn" onClick={rutaUsuario}>Usuario</button>
              <button className="btn" onClick={rutaAjustesUsuario}>Ajustes Usuario</button>
              <button className="btn" onClick={rutaEvento}>Evento</button>
              <button className="btn" onClick={rutaNotFound}>Not found</button>
              <button className="btn" onClick={rutaFormulario}>Formulario</button>
              <button className="btn" onClick={rutaCrearEvento}>Crear Evento</button>
            </div>

            <div style={{ marginTop: 14 }}>
              <Link to="/crear-evento" className="btn btn-chip">Planifica tu evento</Link>
            </div>
          </div>

          {/* Columna derecha: collage (1 cuadrado grande + 3 pequeñas) */}
          <div className="hero-collage">
            <div className="card lg">
              <img src={heroCollage.lg} alt="Hero grande" className="collage-img" />
            </div>
            <div className="card sm a">
              <img src={heroCollage.a} alt="Hero A" className="collage-img" />
            </div>
            <div className="card sm b">
              <img src={heroCollage.b} alt="Hero B" className="collage-img" />
            </div>
            <div className="card sm c">
              <img src={heroCollage.c} alt="Hero C" className="collage-img" />
            </div>
          </div>
        </section>

        {/* Destinos principales */}
        <section className="section">
          <div className="section-head">
            <h2>Destinos principales</h2>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <button className="pill active">Los más populares</button>
              <button className="pill">Nuevos eventos</button>
              <button className="pill">Cerca de ti</button>
              <Link to="/evento" className="pill">Explorar todo</Link>
            </div>
          </div>

          <div className="grid-cards">
            {destinosPrincipales.map((d, idx) => (
              <article key={idx} className="dest-card">
                <div className="thumb">
                  <img src={d.img} alt={d.titulo} className="thumb-img" />
                </div>
                <div className="meta">
                  <h3 className="title">{d.titulo}</h3>
                  <p className="country">{d.pais}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Últimas historias (sin cambios) */}
        <section className="section">
          <div className="section-head">
            <h2>Anteriormente en Knect</h2>
            <Link to="/demo" className="pill">Leer más</Link>
          </div>

          <div className="stories">
            <article className="story main">
              <div className="thumb" />
              <h3 className="title">Guía express para Yucatán</h3>
              <p className="country">Tips, presupuesto y mejores meses…</p>
            </article>

            <div className="story-stack">
              {[1, 2, 3].map((i) => (
                <article key={i} className="story mini">
                  <div className="thumb" />
                  <div>
                    <h4 className="title">City breaks alrededor del mundo</h4>
                    <p className="country">2 min read</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Carrusel (Mi contenido) */}
        <section className="section">
          <Slider {...settings}>
            <div>
              <div style={{ display: "grid", gap: 24, alignItems: "center", gridTemplateColumns: "1fr 1fr" }}>
                <img
                  src="/img/mexico.jpg"
                  alt="Imagen 1"
                  style={{ width: "100%", borderRadius: 12, border: "3px solid rgba(99,102,241,.8)" }}
                />
                <p className="copy">
                  Guarda todos los eventos en tu calendario y
                  mantente al tanto de las novedades para asistir al evento.
                </p>
              </div>
            </div>

            <div>
              <div style={{ display: "grid", gap: 24, alignItems: "center", gridTemplateColumns: "1fr 1fr" }}>
                <img
                  src="/img/cine.jpg"
                  alt="Imagen 2"
                  style={{ width: "100%", borderRadius: 12, border: "3px solid rgba(99,102,241,.8)" }}
                />
                <p className="copy">
                  Estarás en todos los eventos y podrás comunicarte con tus amigos a través de la aplicación.
                </p>
              </div>
            </div>

            <div>
              <div style={{ display: "grid", gap: 24, alignItems: "center", gridTemplateColumns: "1fr 1fr" }}>
                <img
                  src="/img/festival.jpg"
                  alt="Imagen 3"
                  style={{ width: "100%", borderRadius: 12, border: "3px solid rgba(99,102,241,.8)" }}
                />
                <p className="copy">
                  Podrás añadir la dirección del evento y abrirlo en un instante.
                </p>
              </div>
            </div>
          </Slider>
        </section>
      </div>

      <div style={{ height: 40 }} />
    </div>
  );
};
