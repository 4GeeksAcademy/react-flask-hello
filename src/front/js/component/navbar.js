import React, { useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/navbar_footer.css";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const location = useLocation(); // renderizar con ruta
  // const { pathname } = useLocation();
  console.log(location?.pathname);

  return (
    <div>
      <nav className="navbarBooks navbar navbar-expand-lg bg-body-tertiary px-5">
        <div className="container-fluid">
          <div className="col d-flex">
            <Link to="/" className="brand">
              Books Market
            </Link>
            <Link
              to="/"
              className="nav-link active text-dark ms-3"
              aria-current="page"
            >
              Home
            </Link>
          </div>

          {location?.pathname !== "/register" &&
            location?.pathname !== "/login" &&
            location?.pathname !== "/registroLibro" && (
              <div className="col py-1">
                <form className="d-flex" role="search">
                  <input
                    className="form-control m-0"
                    style={{
                      borderTopLeftRadius: "20px",
                      borderBottomLeftRadius: "20px",
                      borderTopRightRadius: "0",
                      borderBottomRightRadius: "0",
                    }}
                    type="search"
                    placeholder="Buscar"
                    aria-label="Search"
                  />
                  <button
                    className="btn btn-dark pb-2 px-3 ms-0"
                    type="submit"
                    style={{
                      borderTopLeftRadius: "0px",
                      borderBottomLeftRadius: "0px",
                      borderTopRightRadius: "20px",
                      borderBottomRightRadius: "20px",
                    }}
                  >
                    Buscar
                  </button>
                </form>
              </div>
            )}
          <div className="col">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex justify-content-end">
              {location?.pathname !== "/register" &&
                location?.pathname !== "/login" &&
                location?.pathname !== "/registroLibro" && (
                  <li className="nav-item">
                    <Link
                      className="nav-link active text-dark mx-2"
                      aria-current="page"
                      to="#"
                    ></Link>
                  </li>
                )}

              {!!store.currentUser ? (
                <li className="nav-item">
                  <Link
                    className="nav-link text-dark ms-2 "
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {store.currentUser?.user?.email}
                    {/* operador de encadenamiento opcional */}
                  </Link>
                  <ul className="dropdown-menu dropdown-menu-end bg-dark text-light">
                    <li>
                      <Link
                        to="/profile"
                        className="dropdown-item bg-dark text-light"
                      >
                        Mi Perfil
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/registerBook"
                        className="dropdown-item bg-dark text-light"
                      >
                        Publicar Libro
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li onClick={() => actions.logout()}>
                      <Link to="/" className="dropdown-item bg-dark text-light">
                        Cerra sesión
                      </Link>
                    </li>
                  </ul>
                </li>
              ) : (
                <li className="nav-item dropdown mx-2">
                  <Link
                    className="nav-link dropdown-toggle text-dark"
                    to="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    LOGIN / REGISTER
                  </Link>
                  <ul className="dropdown-menu bg-dark text-light">
                    <li>
                      <Link
                        to="/login"
                        className="dropdown-item bg-dark text-light"
                      >
                        Iniciar sesión
                      </Link>
                    </li>
                    <hr className="dropdown-divider" />
                    <li>
                      <Link
                        to="/register"
                        className="dropdown-item bg-dark text-light"
                      >
                        Registrarse
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <Link
                        to="/register2"
                        className="dropdown-item bg-dark text-light"
                      >
                        Something else here
                      </Link>
                    </li>
                  </ul>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
      {location?.pathname !== "/register" &&
        location?.pathname !== "/login" &&
        location?.pathname !== "/registroLibro" && (
          <nav className="navbar navbar-expand-lg bg-body-tertiary bg-dark ">
            <div className="container-fluid d-flex justify-content-center">
              <div className="">
                <Link
                  to="/allBooks"
                  className="navbarItem nav-link active mx-4"
                  aria-current="page"
                >
                  LIBROS DISPONIBLES
                </Link>
              </div>
              <div className="">
                <Link
                  to="/purchasedBooks"
                  className="navbarItem nav-link active mx-4"
                  aria-current="page"
                >
                  LIBROS PARA INTERCAMBIO
                </Link>
              </div>
              <div className="">
                <Link
                  to="/masVendidos"
                  className="navbarItem nav-link active mx-4"
                  aria-current="page"
                >
                  VENTA
                </Link>
              </div>
              <div className="">
                <Link
                  to="/enviar_formulario"
                  className="navbarItem nav-link active mx-4"
                  aria-current="page"
                >
                  DONACIONES REALIZADAS
                </Link>
              </div>
            </div>
          </nav>
        )}
    </div>
  );
};
