import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "../../styles/home.css";
import Carrousel from "../component/carrousel.js";
import ".././component/nosotros.js";

export const Navbar = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    // Elimina la información del usuario al cerrar sesión
    localStorage.removeItem("user");

    // Redirige a la página principal después de cerrar sesión
    navigate("/");
  };

  return (
    <nav className="navbar navbar-dark bg-dark p-2">
      <div className="container text-center">
        <style>
          {`
    .navbar-brand-custom:hover {
      box-shadow: 0 0 10px 5px #ffd700; /* Glow dorado al pasar el ratón */
    }
  `}
        </style>
        <Link to="/" className="navbar-brand mb-0 h1 navbar-brand-custom">
          <strong>EasyJob</strong>
        </Link>

        <Link
          to="/Trabajos"
          className="navbar-brand mb-0 h1 navbar-brand-custom"
        >
          {" "}
          Trabajos
        </Link>

        <Link
          to="/nosotros"
          className="navbar-brand mb-0 h1 navbar-brand-custom"
        >
          Nosotros
        </Link>
        {/* <Link
          to="/experiencias"
          className="navbar-brand mb-0 h1 navbar-brand-custom"
        >
          Experiencias
        </Link> */}
        <div className="ml-auto">
          {user ? (
            <>
              <Link to="/perfil" className="text-white mr-5">
                ¡Hola, {user.nombre}!
              </Link>
              <button
                className="btn btn-danger"
                style={{
                  width: "auto",
                  padding: "0.1rem 0.5rem",
                  margin: "10px",
                  alignItems: "center",
                }}
                onClick={handleLogout}
              >
                x
              </button>
            </>
          ) : (
            <Link to="/login">
              <button className="btn btn-primary">Entrar</button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};
