import React from "react";
import { Link } from "react-router-dom";
import "../../styles/navbar.css";

export const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container my-4">
        <div className="d-flex align-items-center">
          <Link to="/">
            <img className="logo" src="https://i.imgur.com/J6XQNp5.png" />
          </Link>
          <Link to="/">
            <h1 className="title">Bexplora</h1>
          </Link>
        </div>
        <div className="d-inline-flex ml-auto align-items-center">
          <Link to="/nosotros">
            <button className="button-regular mx-1">Nosotros</button>
          </Link>
          <Link to="/faq">
            <button className="button-regular mx-1">
              Preguntas Frecuentes
            </button>
          </Link>
          <Link to="/aplicaciones">
            <button className="button-regular mx-1">Mis Aplicaciones</button>
          </Link>
          <Link to="/perfil">
            <button className="button-regular mx-1">Mi Perfil</button>
          </Link>
          <div className="buttons-right mx-2">
            <Link to="/signup">
              <button className="button-login">Iniciar sesión</button>
            </Link>
            <Link to="/registroEleccion">
              <button className="button-signup">Registrarse</button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
