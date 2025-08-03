import { Link } from "react-router-dom";
import logoPatitas from "/logoPatitas.png";

export const Navbar = () => {
  return (
    <nav className="navbar w-100 p-0 m-0">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center w-100 px-3">
        <span className="navbar-brand mb-2 mb-md-0 col-12 col-md-2 text-center text-md-start">
          <Link to="/">
            <img
              src={logoPatitas}
              alt="Logo"
              className="img-fluid"
              style={{ maxHeight: "200px", height: "auto", width: "auto" }}
            />
          </Link>
        </span>

        <div className="search-bar my-2 my-md-0 mx-auto w-100 w-md-50 d-flex bg-white border border-dark rounded-pill">
          <button className="btn" type="submit" aria-label="Buscar">
            <span className="input-group-text bg-transparent border-0">
              <i className="fa-solid fa-magnifying-glass"></i>
            </span>
          </button>
          <input
            className="form-control text-center border-0 bg-transparent  "
            type="search"
            placeholder="Qué estás buscando?"
            aria-label="Buscar"
          />
        </div>

        <div className="buttons d-flex justify-content-center justify-content-md-end mt-2 mt-md-0">
          <Link to="/registro">
            <button
              style={{ color: "#3c6ca8" }}
              className="bg-transparent border-0 me-2"
              aria-label="Perfil de usuario"
              type="button"
            >
              <i className="fa-solid fa-user fs-2 ms-5"></i>
            </button>
          </Link>

          <Link to="/carrito">
            <button
              style={{ color: "#3c6ca8" }}
              className="bg-transparent border-0"
              aria-label="Carrito de compras"
              type="button"
            >
              <i className="fa-solid fa-cart-shopping fs-2 me-md-5 ms-3 me-2"></i>
            </button>
          </Link>
        </div>
      </div>
      <div className="icon-container d-flex justify-content-center align-items-center fs-1 w-100 mt-3 mt-md-1 gap-4">
        <Link to="/perros">
          <i
            style={{ color: "#3c6ca8", cursor: "pointer" }}
            className="fa-solid fa-dog"
          ></i>
        </Link>

        <Link to="/gatos">
          <i
            style={{ color: "#3c6ca8", cursor: "pointer" }}
            className="fa-solid fa-cat"
          ></i>
        </Link>
      </div>

      <hr className="thick-hr m-0 w-100 mt-2" />

      <div className="d-flex justify-content-center align-items-center mt-2 w-100">
        <p style={{ color: "#3c6ca8" }} className="m-0 text-center mb-2"> 
          Gracias por visitarnos en <strong>PatitasClub</strong>, el lugar favorito de miles de patitas felices. 
        </p>
      </div>
    </nav>
  );
};
