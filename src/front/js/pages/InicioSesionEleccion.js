import React from "react";
import "../../styles/RegistroEleccion.css";
import { Link } from "react-router-dom";

const IniciarSesionEleccion = () => {
  return (
    <div className=" divRegsitroE container d-flex justify-content-center align-items-center flex-column">
      <Link to="/iniciarsesion">
        <button
          className="btn btn-custom mb-4"
          style={{ width: "250px" }}
          type="button"
        >
          Iniciar sesión como usuario
        </button>
      </Link>
      <Link to="/iniciarsesion_institucion">
        <button
          className="btn btn-custom"
          style={{ width: "250px" }}
          type="button"
        >
          Iniciar sesión como Institución
        </button>
      </Link>
    </div>
  );
};

export default IniciarSesionEleccion;
