import React, { useContext, useRef } from "react";
import { Context } from "../store/appContext";
import CardBeca from "../component/CardBeca";
import "../../styles/home.css";
import { Link } from "react-router-dom";

export const Home = () => {
  const { store, actions } = useContext(Context);

   const thirdBlockRef = useRef(null);

   const scrollToThirdBlock = () => {
     thirdBlockRef.current.scrollIntoView({ behavior: "smooth" });
   };
 

  return (
    <>
      <div className="landing-page container my-5">
        <div className="first-block d-inline-flex">
          <div className="text-main-box">
            <h1 className="text-main">
              Queremos que tengas la oportunidad de llevar tu potencial al
              máximo
            </h1>
            <h5 className="text-subtitle">
              Una sola plataforma que te facilita el proceso y te ayuda a
              cumplir tus sueños
            </h5>
            <button className="button-becas" onClick={scrollToThirdBlock}>Ver Becas</button>
          </div>
          <div className="image-side">
            <img
              className="first-img"
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2942&q=80"
            />
          </div>
        </div>
        <div className="second-block d-inline-flex">
          <div className="image-side">
            <img
              className="second-img"
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80"
            />
          </div>
          <div className="text-second-box">
            <h1 className="text-second">
              Bexplora se enfoca en brindar un espacio donde se puedan encontrar
              las mejores oportunidades para tu carrera profesional y futuro
              laboral
            </h1>

            <h5 className="text-second-subtitle">
              {" "}
              Nos enfocamos en reunir en un solo lugar diferentes tipos de becas
              educativas principalmente de grados técnicos y universitarios para
              residentes de Costa Rica brindadas por diferentes instituciones
              alrededor del mundo. Queremos que estas oportunidades únicas
              tengan la visibilidad necesaria para que tu gran potencial
              encuentre el talle perfecto.
            </h5>
            <br />
            <h5 className="text-second-subtitle">
              Creemos que todos merecen tener la misma información a su alcance
              para una oportunidad equitativa de participar por una mejor
              educación que se va a reflejar en una inversión futura de
              mejoramiento laboral.{" "}
            </h5>
            <Link to="/nosotros">
              <button className="button-nosotros d-flex">
                Más Sobre Nosotros
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="third-block" ref={thirdBlockRef}>
        <div className="container">
          <h1 className="title-becas">
            Becas Disponibles <i class="fa-solid fa-arrow-right" />
          </h1>
          <div className="card-holder my-4">
            <CardBeca />
          </div>
        </div>
      </div>
    </>
  );
};
