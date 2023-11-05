import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../styles/navbar_footer.css";

export const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="container bottom_border">
          <div className="row">
            <div className="col-sm-8 col-md col-sm-8 col-2 col me-1">
              <h5 className="brandFooter headin5_amrc col_white_amrc pt2">
                Books Market
              </h5>
              <p className="mb10">
                ¡Descubre una nueva forma de enriquecer tu biblioteca personal!
                En Books Market, estamos emocionados de invitarte a unirse a
                nuestra creciente comunidad de amantes de la lectura
              </p>
              <p>
                <i className="fa fa-location-arrow"></i> Santiago, Chile
              </p>
              <p>
                <i className="fa fa-phone"></i> +56-9999878398
              </p>
              <p>
                <i className="fa fa fa-envelope"></i> info@booksmarket.com
              </p>
            </div>
            <div className="col-sm-2 col-md col-4 col  text-end">
              <form>
                <h5 className="tituloFooter headin5_amrc pt2">
                  Subscribe to our newsletter
                </h5>
                <form className="d-flex" role="search">
                  <input
                    id="newsletter1"
                    className="form-control"
                    style={{
                      borderTopLeftRadius: "20px",
                      borderBottomLeftRadius: "20px",
                      borderTopRightRadius: "0",
                      borderBottomRightRadius: "0",
                    }}
                    type="search"
                    placeholder="Email address"
                    aria-label="Search"
                  />
                  <button
                    className="buttonFooter btn pb-2 px-3"
                    type="submit"
                    style={{
                      borderTopLeftRadius: "0px",
                      borderBottomLeftRadius: "0px",
                      borderTopRightRadius: "20px",
                      borderBottomRightRadius: "20px",
                    }}
                  >
                    Subscribe
                  </button>
                </form>
              </form>
            </div>
            <div className="col-sm-2 col-md col-2 col text-end">
              <h5 className="headin5_amrc pt2 tituloFooter"></h5>
              <ul className="footer_ul_amrc">
                <li>
                  {/*                 <Link
                    to="/guiaCompra"
                    className="nav-link p-0 text-white"
                    aria-current="page"
                  ></Link> */}
                </li>
                <li>
                  <Link
                    to="/metodoPago"
                    className="nav-link p-0 text-white"
                    aria-current="page"
                  ></Link>
                </li>
                <li></li>
              </ul>
            </div>
            <div className="col-sm-2 col-md col-2 col text-end">
              <h5 className="headin5_amrc pt2 tituloFooter">
                ¿Cómo intercambiar?
              </h5>
              <ul className="footer_ul_amrc">
                <li className="nav-item mb-2">
                  <Link
                    to="/metodoEnvio"
                    className="nav-link p-0 text-white"
                    aria-current="page"
                  >
                    Guía intercambio de libros
                  </Link>
                </li>
                <li className="nav-item mb-2">
                  <Link
                    to="/comoDonar"
                    className="nav-link p-0 text-white"
                    aria-current="page"
                  >
                    Guía donaciones
                  </Link>
                </li>
                <li className="nav-item mb-2">
                  <Link
                    to="/metodoEnvio"
                    className="nav-link p-0 text-white"
                    aria-current="page"
                  >
                    Guía libros gratis
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-sm-4 col-md col-2 col text-end">
              <h5 className="headin5_amrc  pt2 tituloFooter">
                Servicio al cliente
              </h5>
              <ul className="footer_ul_amrc">
                <li className="nav-item mb-2">
                  <Link
                    to="/nuestraHistoria"
                    className="nav-link p-0 text-white"
                    aria-current="page"
                  >
                    Nuestra Historia
                  </Link>
                </li>
                <li className="nav-item mb-2">
                  <Link
                    to="/sobreNosotros"
                    className="nav-link p-0 text-white"
                    aria-current="page"
                  >
                    Nuestro Team
                  </Link>
                </li>
                <li className="nav-item mb-2">
                  <Link
                    to="/metodoEnvio"
                    className="nav-link p-0 text-white"
                    aria-current="page"
                  >
                    Contactanos
                  </Link>
                </li>
                <li className="nav-item mb-2">
                  <Link
                    to="/metodoEnvio"
                    className="nav-link p-0 text-white"
                    aria-current="page"
                  >
                    Preguntas frecuentes
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="container m-1">
          <p className="text-end">
            Copyright @2023 | Designed With by Books Market
          </p>
          <ul className="social_footer_ul">
            <li>
              <a className="circulo" href="http://facebook.com">
                <i className="fab fa-facebook-f"></i>
              </a>
            </li>
            <li>
              <a className="circulo" href="http://twitter.com">
                <i className="fab fa-twitter"></i>
              </a>
            </li>
            <li>
              <a className="circulo" href="http://linkedin.com">
                <i className="fab fa-linkedin"></i>
              </a>
            </li>
            <li>
              <a className="circulo" href="http://instagram.com">
                <i className="fab fa-instagram"></i>
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
};

/* import React, { Component } from "react";
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
                <Link
                  to="/guiaCompra"
                  className="nav-link p-0 text-white"
                  aria-current="page"
                >
                  Guía de compra
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link
                  to="/metodoPago"
                  className="nav-link p-0 text-white"
                  aria-current="page"
                >
                  Métodos de pago
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link
                  to="/metodoEnvio"
                  className="nav-link p-0 text-white"
                  aria-current="page"
                >
                  Envíos
                </Link>
              </li>
            </ul>
          </div>

          <div className="me-3">
            <h5 className="text-white">¿Cómo intercambiar libros?</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <Link
                  to="/metodoEnvio"
                  className="nav-link p-0 text-white"
                  aria-current="page"
                >
                  Guía intercambio de libros
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link
                  to="/comoDonar"
                  className="nav-link p-0 text-white"
                  aria-current="page"
                >
                  Guía donaciones
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link
                  to="/metodoEnvio"
                  className="nav-link p-0 text-white"
                  aria-current="page"
                >
                  Guía libros gratis
                </Link>
              </li>
            </ul>
          </div>

          <div className="me-3">
            <h5 className="text-white">Servicio al cliente</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <Link
                  to="/nuestraHistoria"
                  className="nav-link p-0 text-white"
                  aria-current="page"
                >
                  Nuestra Historia
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link
                  to="/sobreNosotros"
                  className="nav-link p-0 text-white"
                  aria-current="page"
                >
                  Nuestro Team
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link
                  to="/metodoEnvio"
                  className="nav-link p-0 text-white"
                  aria-current="page"
                >
                  Contactanos
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link
                  to="/metodoEnvio"
                  className="nav-link p-0 text-white"
                  aria-current="page"
                >
                  Preguntas frecuentes
                </Link>
              </li>
            </ul>
          </div>

          <div className="offset-1 me-3 ms-0">
            <form>
              <h5 className="text-white mb-5">Subscribe to our newsletter</h5>
              <div className="d-flex w-100 gap-2">
                <label htmlFor="newsletter1" className="visually-hidden">
                  Email address
                </label>
                <input
                  id="newsletter1"
                  type="text"
                  className="form-control"
                  placeholder="Email address"
                />
                <button className="btn btn-light" type="button">
                  Subscribe
                </button>
              </div>
            </form>
          </div>
          <div className="me-3">
            <h5 className="text-white">Redes Sociales</h5>
            <ul className="nav flex-column">
              <a
                className="btn btn-outline-light btn-floating m-1"
                href="https://www.facebook.com/?locale=es_LA"
                role="button"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                className="btn btn-outline-light btn-floating m-1"
                href="https://www.instagram.com/"
                role="button"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                className="btn btn-outline-light btn-floating m-1"
                href="https://twitter.com/?lang=es"
                role="button"
              >
                <i className="fab fa-twitter"></i>
              </a>
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
 */
