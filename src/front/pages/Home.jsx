// src/front/pages/VistaHome.jsx
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


            <div style={{ marginTop: 14 }}>
              <Link to="/crear-evento" className="btn btn-chip">Planifica tu evento</Link>
            </div>
          </div>

          {/* Columna derecha: collage (1 cuadrado grande + 3 pequeñas) */}
          <div className="hero-collage">
            <div className="card lg">
              <img src={heroZapatos} alt="Hero grande" className="collage-img" />
            </div>
            <div className="card sm a">
              <img src={heroFestival} alt="Hero A" className="collage-img" />
            </div>
            <div className="card sm b">
              <img src={heroCine} alt="Hero B" className="collage-img" />
            </div>
            <div className="card sm c">
              <img src={mexico} alt="Hero C" className="collage-img" />
            </div>
          </div>
        </section>

        {/* Destinos principales */}
        <section className="section">
          <div className="section-head">
            <h2>Destinos principales</h2>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <Link to="/evento" className="pill">Explorar todo</Link>
            </div>
          </div>

          <div className="grid-cards">
            {destinosPrincipales.map((d, idx) => (
              <Card key={idx} d={d} />
            ))}
          </div>
        </section>

        {/* Carrusel (Mi contenido) */}
        <section className="section">
          <Slider {...settings}>
            <div>
              <div style={{ display: "grid", gap: 24, alignItems: "center", gridTemplateColumns: "1fr 1fr" }}>
                <img
                  src={mexico}
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
                  src={heroCine}
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
                  src={heroFestival}
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
