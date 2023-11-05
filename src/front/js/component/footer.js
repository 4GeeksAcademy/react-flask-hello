import React from "react";

export const Footer = () => (
  <nav
    className="navbar"
    style={{ backgroundColor: "#161C28" }}
  >
    <div className="col-7  mt-4 mb-4" style={{ marginLeft: "5rem" }}>
      <h1 style={{ color: "#FD862C" }}>Bexplora</h1>
      <h6 style={{ color: "#E8D2D2", marginBottom: "2rem" }}>
        Mejorando tu futuro
      </h6>
      <h6 style={{ color: "#A6A6A6" }}>
        © 2023 Bexplora. Nos reservamos los derechos de autor.
      </h6>
    </div>
    <div
      className="col-3 d-flex justify-content-end"
      style={{ marginRight: "5rem" }}
    >
      <img
        src="https://i.imgur.com/J6XQNp5.png"
        alt="Logo Bexplora"
        style={{ width: "100px", height: "auto" }}
      />
    </div>
  </nav>
);
