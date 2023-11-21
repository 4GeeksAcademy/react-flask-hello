import React from "react";
import "../../styles/RegistroEleccion.css";
import { Link } from "react-router-dom";

const RegistroEleccion = () => {
  return (
    <div className=" divRegsitroE container d-flex justify-content-center align-items-center flex-column">
      <Link to="/registroUsuario">
        <button
          className="btn btn-custom mb-4"
          style={{ width: "250px" }}
          type="button"
        >
          Registrarse como Usuario
        </button>
      </Link>
      <Link to="/registroInst">
        <button
          className="btn btn-custom"
          style={{ width: "250px" }}
          type="button"
        >
          Registrarse como Institución
        </button>
      </Link>
    </div>
  );
};

export default RegistroEleccion;
