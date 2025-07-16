import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/">
          <span className="navbar-brand mb-0 h1">LOGO</span>
        </Link>

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
            <i className="fa-solid fa-cart-shopping fs-2"></i>
          </button>
        </div>

        <div className="container d-flex justify-content-center align-items-center fs-1">
          <p className="m-0 me-2">
            <i className="fa-solid fa-dog"></i> |
          </p>
          <p className="m-0">
            <i className="fa-solid fa-cat"></i>
          </p>
        </div>
      </div>


      <hr className="thick-hr m-0 w-100 mt-2" />
      <div className="container d-flex justify-content-center align-items-center mt-2">
        <p className="m-0 text-primary">Envíos en menos de 48 horas</p>
      </div>

    </nav>
  );
};
