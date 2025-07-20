import { Link } from "react-router-dom";
import logoPatitas from "/logoPatitas.png";
export const Navbar = () => {
  return (
    <nav className="navbar w-100 p-0 m-0">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center w-100 px-3">
        <span className="navbar-brand mb-2 mb-md-0 col-12 col-md-2 text-center text-md-start">
          <img
            src="/logoPatitas.png"
            alt="Logo"
            className="img-fluid"
            style={{ maxHeight: "200px", height: "auto", width: "auto" }}
          />
        </span>
        <div className="search-bar my-2 my-md-0 mx-auto w-100 w-md-50 d-flex bg-white border border-dark rounded-pill">
          <button className="btn" type="submit" aria-label="Buscar">
            <span className="input-group-text bg-transparent border-0">
              <i className="fa-solid fa-magnifying-glass"></i>
            </span>
          </button>
          <input
            className="form-control text-center border-0"
            type="search"
            placeholder="Qué estás buscando?"
            aria-label="Buscar"
          />
          <button
            className="bg-transparent border-0 me-3"
            aria-label="Limpiar búsqueda"
            type="button"
          >
            <span>
              <i className="fa-solid fa-x"></i>
            </span>
          </button>
        </div>
        <div className="buttons d-flex justify-content-center justify-content-md-end mt-2 mt-md-0">
          <button
            style={{ color: "#3c6ca8" }} className="bg-transparent border-0 me-2"
            aria-label="Perfil de usuario"
            type="button"
          >
            <i className="fa-solid fa-user fs-2"></i>
          </button>
          <button
            style={{ color: "#3c6ca8" }}
            className="bg-transparent border-0"
            aria-label="Carrito de compras"
            type="button"
          >
            <i className="fa-solid fa-cart-shopping fs-2 me-md-5"></i>
          </button>
        </div>
      </div>
      <div className="icon-container d-flex justify-content-center align-items-center fs-1 w-100 mt-3 mt-md-1">
        <p className="m-0 me-2">
          <i style={{ color: "#3c6ca8" }} className="fa-solid fa-dog me-3"></i>
        </p>
        <p className="m-0">
          <i style={{ color: "#3c6ca8" }} className="fa-solid fa-cat"></i>
        </p>
      </div>
      <hr className="thick-hr m-0 w-100 mt-2" />
      <div className="d-flex justify-content-center align-items-center mt-2 w-100">
        <p style={{
          color: "#3c6ca8",
        }} className="m-0 text-center">Envíos en menos de 48 horas</p>
      </div>
    </nav>
  );
};






