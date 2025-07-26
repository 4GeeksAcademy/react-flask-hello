import React, { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import Sphere from "./Sphere.jsx";

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();

  const loadMessage = async () => {
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;

      if (!backendUrl)
        throw new Error("VITE_BACKEND_URL is not defined in .env file");

      const response = await fetch(backendUrl + "/api/hello");
      const data = await response.json();

      if (response.ok) dispatch({ type: "set_hello", payload: data.message });

      return data;
    } catch (error) {
      if (error.message)
        throw new Error(
          `Could not fetch the message from the backend.
          Please check if the backend is running and the backend port is public.`
        );
    }
  };

  useEffect(() => {
    loadMessage();
  }, []);

  return (
    <div>
      {/* NAVBAR */}
      <nav className="navbar navbar-light bg-light px-4 py-3 shadow-sm">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <div className="me-2">
              <span role="img" aria-label="logo">💸</span>
            </div>
          </div>
          <div className="navbar-brand mx-auto fw-bold fs-4">Mo’money</div>
          <div>
            <button className="btn btn-outline-primary me-2">Login</button>
            <button className="btn btn-primary">Register</button>
          </div>
        </div>
      </nav>

      {/* SECCIÓN CENTRAL: Quiénes somos + Esfera + Qué hacemos */}
      <section className="container my-5">
        <div className="row align-items-center text-center text-md-start">
          {/* QUIÉNES SOMOS */}
          <div className="col-md-4 mb-4 mb-md-0">
            <h2 className="mb-3">¿Quiénes somos?</h2>
            <p className="lead">
              Somos un equipo joven comprometido con ayudar a otros jóvenes a gestionar su dinero,
              ahorrar, invertir y alcanzar sus metas financieras con herramientas digitales sencillas.
            </p>
          </div>

          {/* ESFERA */}
          <div className="col-md-4 d-flex justify-content-center mb-4 mb-md-0">
            <Sphere />
          </div>

          {/* QUÉ HACEMOS */}
          <div className="col-md-4">
            <h2 className="mb-3">¿Qué hacemos?</h2>
            <p className="lead">
              Ofrecemos una plataforma con funciones para planificar tus gastos, visualizar tu ahorro,
              explorar oportunidades de inversión y conectarte con una comunidad de jóvenes como tú.
            </p>
          </div>
        </div>
      </section>

      {/* SECCIÓN INVERSIÓN */}
      <section className="text-center bg-light p-5 rounded shadow-sm">
        <h2 className="mb-3">Inversión</h2>
        <p className="lead">
          ¡Próximamente podrás descubrir formas inteligentes de hacer crecer tu dinero!
        </p>
      </section>
    </div>
  );
};
