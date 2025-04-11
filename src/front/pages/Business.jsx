import React from "react";
import { SelectBusiness } from "../components/SeleccionarNegocio/SelectBusiness";

export const Business = () => {
  return (
    <>
      <div style={{ backgroundColor: "#CAD2C5", minHeight: "100vh" }}> {/* ← Fondo aplicado aquí */}
        {/* Navbar */}
        <nav className="navbar navbar-expand-lg p-3" style={{ backgroundColor: "#354F52" }}>
          <div className="container">
            <a className="navbar-brand text-white" href="#">Flow</a>
          </div>
        </nav>

        {/* Contenido */}
        <div className="container mt-5">
          <div className="row">
          < SelectBusiness /> {/* Formulario cliente*/}
          </div>
        </div>
      </div>
    </>
  );
};
