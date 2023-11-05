import React, { Component } from "react";
import { Link } from "react-router-dom";

export const Footer = () => {

  return (
    <div className="mt-5 mb-5">
      <footer className="py-5 bg-dark">
        <div className="d-flex justify-content-between ">
          <div className="mx-3">
            <h5 className="text-white">¿Cómo comprar?</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <Link to="/guiaCompra" className="nav-link p-0 text-white" aria-current="page">Guía de compra</Link>
              </li>              
              <li className="nav-item mb-2">
                <Link to="/metodoPago" className="nav-link p-0 text-white" aria-current="page">Métodos de pago</Link>
              </li>
              <li className="nav-item mb-2">
                <Link to="/metodoEnvio" className="nav-link p-0 text-white" aria-current="page">Envíos</Link>
              </li>
            </ul>
          </div>

          <div className="me-3">
            <h5 className="text-white">¿Cómo intercambiar libros?</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <Link to="/metodoEnvio" className="nav-link p-0 text-white" aria-current="page">Guía intercambio de libros</Link>
              </li>
              <li className="nav-item mb-2">
                <Link to="/comoDonar" className="nav-link p-0 text-white" aria-current="page">Guía donaciones</Link>
              </li>
              <li className="nav-item mb-2">
                <Link to="/metodoEnvio" className="nav-link p-0 text-white" aria-current="page">Guía libros gratis</Link>
              </li>
            </ul>
          </div>

          <div className="me-3">
            <h5 className="text-white">Servicio al cliente</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <Link to="/nuestraHistoria" className="nav-link p-0 text-white" aria-current="page">Nuestra Historia</Link>
              </li>
              <li className="nav-item mb-2">
                <Link to="/sobreNosotros" className="nav-link p-0 text-white" aria-current="page">Nuestro Team</Link>
              </li>
              <li className="nav-item mb-2">
                <Link to="/metodoEnvio" className="nav-link p-0 text-white" aria-current="page">Contactanos</Link>
              </li>
              <li className="nav-item mb-2">
                <Link to="/Support" className="nav-link p-0 text-white" aria-current="page">Preguntas frecuentes</Link>
              </li>              
            </ul>
          </div>

          <div className="offset-1 me-3 ms-0">
            <form>
              <h5 className="text-white mb-5">Subscribe to our newsletter</h5>
              <div className="d-flex w-100 gap-2">
                <label htmlFor="newsletter1" className="visually-hidden">Email address</label>
                <input id="newsletter1" type="text" className="form-control" placeholder="Email address" />
                <button className="btn btn-light" type="button">Subscribe</button>
              </div>
            </form>

          </div>
          <div className="me-3">
            <h5 className="text-white">Redes Sociales</h5>
            <ul className="nav flex-column">
              <a className="btn btn-outline-light btn-floating m-1" href="https://www.facebook.com/?locale=es_LA" role="button"><i className="fab fa-facebook-f"></i></a>
              <a className="btn btn-outline-light btn-floating m-1" href="https://www.instagram.com/" role="button"><i className="fab fa-instagram"></i></a>
              <a className="btn btn-outline-light btn-floating m-1" href="https://twitter.com/?lang=es" role="button"><i className="fab fa-twitter"></i></a>
            </ul>
          </div>
        </div>

        <div className="d-flex justify-content-center text-white mt-2">
          <p>© 2023 Company, Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};