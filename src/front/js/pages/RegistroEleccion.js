import React from "react";
import "../../styles/RegistroEleccion.css";

const RegistroEleccion = () => {
  return (
    <div
      className="container d-flex justify-content-center align-items-center my-5"
      style={{
        width: "18rem",
        backgroundColor: "#1E3151",
        borderRadius: "2rem",
      }}
    >
      <div className="d-grid gap-2  mx-auto my-5">
        <button className="btn btn-custom mb-3" type="button">
          Registrarse como Usuario
        </button>
        <button className="btn btn-custom" type="button">
          Registrarse como Institución
        </button>
      </div>
    </div>
  );
};

export default RegistroEleccion;
