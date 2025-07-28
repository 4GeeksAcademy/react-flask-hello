import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Main() {
  return (
    <div className="container-fluid p-4">
      {/* Botón perfil en la esquina superior derecha */}
      <div className="d-flex justify-content-end mb-4">
        <button
          className="btn"
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            backgroundColor: "#007bff",
            color: "white",
            fontSize: "18px",
          }}
          onClick={() => {
            // Aquí enlazarás más adelante
          }}
        >
          P
        </button>
      </div>

      {/* Fila con dinero total y dinero ahorrado */}
     <div className="row mb-4">
  <div className="col-md-6">
    <div
      className="card text-center p-3"
      style={{
        backgroundColor: "white",
        border: "3px solid #b7ff00",
        color: "black",
      }}
    >
      <h5>Dinero Total</h5>
      <p className="display-6">0€</p>
    </div>
  </div>

  <div className="col-md-6">
    <div
      className="card text-center p-3"
      style={{
        backgroundColor: "white",
        border: "3px solid #b7ff00",
        color: "black",
      }}
    >
      <h5>Dinero Ahorrado</h5>
      <p className="display-6">0€</p>
    </div>
  </div> 
  </div>
  </div> );
}  