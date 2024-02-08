import { Link } from "react-router-dom";
import logo from "../../img/logo.png";
import React, { useContext } from "react";
import { Context } from "../store/appContext";

export const Navbar = () => {
  const { store, actions } = useContext(Context);

  return (
    <nav className="navbar navbar-dark mb-1 px-5 d-flex flex-row">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <p className="m-1">
            <img src={logo} style={{ height: "40px" }} alt="Logo" />
          </p>
        </Link>
        <div className="ml-auto">
          <div className="navbar-nav d-flex flex-row align-items-center">
            <form className="d-flex" role="search">
              <input
                className="form-control buscar"
                type="search"
                placeholder="Buscar"
                aria-label="Search"
              ></input>
              <button className="btn btn-outline me-5" type="submit">
                Buscar
              </button>
            </form>
            <Link className="nav-link" onClick={() => actions.getRandomMovie()} to="#">
              Ver En Aleatorio
            </Link>
            <Link className="nav-link" to="#">
              Géneros
            </Link>
            <Link className="nav-link" to="#">
              Rankings
            </Link>
            <Link className="nav-link" to="#">
              Mi lista
            </Link>
            <Link className="nav-link" to="/login">
              <button type="button" className="btn ms-4">
                <i className="fa-solid fa-user me-2"></i> Iniciar Sesión
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
