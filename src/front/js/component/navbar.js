import React, { useContext, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const location = useLocation(); // renderizar con ruta
  console.log(location.pathname)
  const title = ""
  const searchBook = (e) => {
    const navigate = useNavigate();
    console.log(" /libroVenta?q=" + document.getElementById("search").value)
        // window.location.href = "/libroVenta?q=" + document.getElementById("search").value
        
}

const books = []

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


          {location.pathname !== "/formularioRegistro" && location.pathname !== "/login" && (
            <div className="col">
              <form className="d-flex" role="search">
                <input id="search" className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                
                <a onClick={()=>{window.location.href = "/libroVenta?q=" + document.getElementById("search").value}} className="btn btn-light">
                  Search
                </a>
              </form>
            </div>
          )}
          <div className="col">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex justify-content-end">

              {location.pathname !== "/formularioRegistro" && location.pathname !== "/login" && (
                <li className="nav-item">
                  <a className="nav-link active text-white" aria-current="page" href="#">
                    Cart
                  </a>
                </li>
              )}
              {location.pathname !== "/formularioRegistro" && location.pathname !== "/login" && (
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
                      <Link to="/registroLibro" className="dropdown-item">
                        Publicar Libro
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
                      <Link to="/formularioRegistro" className="dropdown-item" >
                        Registrar
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Something else here
                      </a>
                    </li>
                  </ul>
                </li>
              )
              }
            </ul>
          </div>
        </div>
      </nav>
      {location.pathname !== "/formularioRegistro" && location.pathname !== "/login" && (
        <nav className="navbar navbar-expand-lg bg-body-tertiary bg-dark">
          <div className="container-fluid d-flex justify-content-around">
            <div className="">
              <Link to="/libroVenta" className="nav-link active text-white" aria-current="page">
                Libros en Venta
              </Link>
            </div>
            <div className="">
              <Link to="/librosIntercambio" className="nav-link active text-white" aria-current="page">
                Libros para intercambio
              </Link>
            </div>
            <div className="">
              <Link to="/masVendidos" className="nav-link active text-white" aria-current="page">
                Libros más vendidos
              </Link>
            </div>
            <div className="">
              <Link to="/donacionesRalizadas" className="nav-link active text-white" aria-current="page">
                Donaciones realizadas
              </Link>
            </div>
          </div>
        </nav>
      )}

    </div>
  );
};

