import React from "react";
import "./HeroSection.css";

export const HeroSection = () => {
  return (
    <section className="features">
      <div className="features-header">
        <h2>Por qué elegir Spidy's?</h2>
        <p>
         Proveemos de una tienda online customizable para tu marca o empresa.
        </p>
      </div>

      <div className="features-row row">
        <div className="feature-card col-sm-12 col-md-6 col-lg-4">
          <div className="feature-icon red">
            <i className="fas fa-box-open"></i>
          </div>
          <h3>Gran selección de productos</h3>
          <p>Busca en una lista de productos o crea una tienda para empezar a vender.</p>
        </div>

        <div className="feature-card col-sm-12 col-md-6 col-lg-4 ">
          <div className="feature-icon coral">
            <i className="fas fa-shopping-cart"></i>
          </div>
          <h3>Conecta con tus clientes</h3>
          <p>Comparte tus productos a tu público objetivo.</p>
        </div>

        <div className="feature-card col-sm-12 col-md-6 col-lg-4">
          <div className="feature-icon yellow">
            <i className="fas fa-qrcode"></i>
          </div>
          <h3>Generador QR</h3>
          <p>Crea un QR automaticamente y expande tus horizontes.</p>
        </div>

        <div className="feature-card col-sm-12 col-md-6 col-lg-4 ">
          <div className="feature-icon blue">
            <i className="fas fa-lock"></i>
          </div>
          <h3>Login Seguro</h3>
          <p>Tu tienda está segura con nosotros.</p>
        </div>
      </div>
    </section>
  );
};

