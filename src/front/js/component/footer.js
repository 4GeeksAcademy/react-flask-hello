import React from "react";
import logo from "../../img/logo.png";

export const Footer = () => (
  <footer className="footer py-3 text-center">
    <div className="color-footer container text-center d-flex" style={{fontFamily: "Poppins, Work Sans"}}>

      {/* Primera Columna */}
      <div className="col-md-4 col-sm-4" style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
        <p>
          <img src={logo} style={{ height: "100%", maxHeight:"20px"}} alt="Logo" />
        </p>
        <p style={{ textAlign: "left" }}>Una red social que conecta entretenimiento con personas</p>
        <p>Únete a la comunidad:</p>
        <p className="d-flex">
          <i className="fa-brands fa-discord" style={{ marginRight: "3%" }}></i>
          <i className="fa-brands fa-youtube" style={{ marginRight: "3%" }}></i>
          <i className="fa-brands fa-twitter" style={{ marginRight: "3%" }}></i>
          <i className="fa-brands fa-instagram" style={{ marginRight: "3%" }}></i>
        </p>
      </div>

      {/* Segunda Columna */}
      <div className="col-md-4 col-sm-4">
        <p className="text-light">Explore</p>
        <p>Géneros</p>
        <p>Rankings</p>
        <p>Ayuda</p>
      </div>

      {/* Tercera Columna */}
      <div className="col-md-4 col-sm-4">
        <p className="text-light" style={{ textAlign: "left" }}>Suscríbete ¡ES GRATIS!</p>
        <p style={{ textAlign: "left" }}>Recibe notificaciones con promociones exclusivas</p>
        <form className="d-flex" role="search">
          <input className="form-control buscar" type="search" placeholder="Introduce tu correo" aria-label="Search" />
          <button className="btn btn-outline" type="submit">Suscribir</button>
        </form>
      </div>

    </div>
  </footer>
);
