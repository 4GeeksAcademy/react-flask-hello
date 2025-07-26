import React from "react";

export const InicioUser = () => {
  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{ backgroundColor: "#003366" }}
    >
      <div className="container-fluid px-4">

        ({/* Logo */})
        <a className="navbar-brand text-white fw-bold d-flex align-items-center" href="#">
          <img src="logo.svg" alt="AutoTekC Logo" style={{ height: "30px", marginRight: "8px" }} />
          Auto<span style={{ color: "#00BFFF" }}>TekC</span>
        </a>

        {/* Botón */}
        <button
          className="navbar-toggler bg-white"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Enlaces del navbar */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto text-uppercase">
            <li className="nav-item px-2">
              <a className="nav-link text-white" href="/">Home</a>
            </li>
            <li className="nav-item px-2">
              <a className="nav-link text-white" href="#">Órdenes</a>
            </li>
            <li className="nav-item px-2">
              <a className="nav-link text-info fw-bold" href="/vehiculos">Mis Autos</a>
            </li>
            <li className="nav-item px-2">
              <a className="nav-link text-white" href="#">Notificaciones</a>
            </li>
          </ul>

        </div>
      </div>
    </nav>
  );
};
