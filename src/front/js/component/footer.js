import React from "react";


export const Footer = () => (
  <footer
    className="footer mt-auto py-3 "
    style={{ backgroundColor: "#06132f" }}
  >
    <div className="row">
      <div className="col  mt-4 mb-4" style={{ marginLeft: "5rem" }}>
        <h1 style={{ color: "#FD862C" }}>Bexplora</h1>
        <h6 style={{ color: "#E8D2D2", marginBottom: "2rem" }}>
          Explora tu potencial.
        </h6>
        <h6 style={{ color: "#A6A6A6" }}>
          © 2023 Bexplora. Nos reservamos los derechos de autor.
        </h6>
      </div>
      <div
        className="col d-flex justify-content-end align-items-center"
        style={{ marginRight: "5rem" }}
      >
        <img
          src="https://i.imgur.com/zheDLvP.png"
          alt="Logo Bexplora"
          style={{ width: "100px", height: "100px" }}
        />
      </div>
    </div>
  </footer>
);
