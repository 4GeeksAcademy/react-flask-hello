import React, { useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const location = useLocation(); // renderizar con ruta
  console.log(location.pathname)



  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary bg-dark">
        <div className="container-fluid">
          <div className="col d-flex">
            <Link to="/" className="navbar-brand text-white" href="#"  >
              Books Market
            </Link>
            <Link to="/" className="nav-link active text-white" aria-current="page" >
              Home
            </Link>
          </div>


          {location.pathname !== "/register" && location.pathname !== "/login" && location.pathname !== "/registroLibro" && (
            <div className="col">
              <form className="d-flex" role="search">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                <button className="btn btn-light" type="submit">
                  Search
                </button>
              </form>
            </div>
          )}
          <div className="col">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex justify-content-end">
              
              {location.pathname !== "/register" && location.pathname !== "/login" && location.pathname !== "/registroLibro" && (
                <li className="nav-item">
                  <a className="nav-link text-white" href="#">
                    Wish List
                  </a>
                </li>
              )}

              {!!store.currentUser ? (

                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle text-white" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {store.currentUser?.user?.email} {/* operador de encadenamiento opcional */}
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <Link to="/profile" className="dropdown-item">
                        Mi Perfil
                      </Link>
                    </li>
                    <li>
                      <Link to="/registerBook" className="dropdown-item">
                        Publica tu libro
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li  onClick={() => actions.logout()}>
                      <Link to="/" className="dropdown-item">
                        Cerra sesión
                      </Link>                      
                    </li>
                  </ul>
                </li>
              ) : (
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle text-white" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Iniciar sesión/Registrarse
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <Link to="/login" className="dropdown-item" >
                        Iniciar sesión
                      </Link>
                    </li>
                    <li>
                      <Link to="/register" className="dropdown-item" >
                        Registrarse
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <Link to="/register2" className="dropdown-item" >
                      Something else here
                      </Link>                      
                    </li>
                  </ul>
                </li>
              )
              }
            </ul>
          </div>
        </div>
      </nav>
      {location.pathname !== "/register" && location.pathname !== "/login" && location.pathname !== "/registroLibro" && (
        <nav className="navbar navbar-expand-lg bg-body-tertiary bg-dark">
          <div className="container-fluid d-flex justify-content-around">
            <div className="">
              <Link to="/allBooks" className="nav-link active text-white" aria-current="page">
                Libros disponibles
              </Link>
            </div>
            <div className="">
              <Link to="/exchangeBooks" className="nav-link active text-white" aria-current="page">
                Intercambio
              </Link>
            </div>
            <div className="">
              <Link to="/saleBooks" className="nav-link active text-white" aria-current="page">
                Venta
              </Link>
            </div>
            <div className="">
              <Link to="/enviar_formulario" className="nav-link active text-white" aria-current="page">
                Donaciones realizadas
              </Link>
            </div>
          </div>
        </nav>
      )}

    </div>
  );
};

