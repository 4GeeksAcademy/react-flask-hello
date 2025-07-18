import { Link } from "react-router-dom";
import logoPatitas from "/logoPatitas.png";
export const Navbar = () => {
  return (
    <nav className="navbar w-100 p-0 m-0">
      <div className="d-flex justify-content-between align-items-center w-100 px-3 py-2">
        <span className="navbar-brand mb-0 h1">
          <img src="/logoPatitas.png" alt="Logo Patitas" />
        </span>
        <div className="search-bar my-2 mx-auto w-50 d-flex bg-white border border-dark rounded-pill">
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
        <div className="buttons d-flex justify-content-end">
          <button
            className="bg-transparent border-0 me-2"
            aria-label="Perfil de usuario"
            type="button"
          >
            <i className="fa-solid fa-user fs-2"></i>
          </button>
          <button
            className="bg-transparent border-0"
            aria-label="Carrito de compras"
            type="button"
          >
            <i className="fa-solid fa-cart-shopping fs-2 me-5"></i>
          </button>
        </div>
      </div>
      <div className="d-flex justify-content-center align-items-center fs-1 w-100">
        <p className="m-0 me-2">
          <i className="fa-solid fa-dog"></i> |
        </p>
        <p className="m-0">
          <i className="fa-solid fa-cat"></i>
        </p>
      </div>
      <hr className="thick-hr m-0 w-100 mt-2" />
      <div className="d-flex justify-content-center align-items-center mt-2 w-100">
        <p className="m-0 text-primary">Envíos en menos de 48 horas</p>
      </div>
    </nav>
  );
};