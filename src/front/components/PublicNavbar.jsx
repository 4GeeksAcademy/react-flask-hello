import { Link, useLocation } from "react-router-dom";
import { BsPersonFill, BsHouseFill } from "react-icons/bs";
import "../styles/Navbar.css";

const PublicNavbar = () => {
  const location = useLocation();
  const isRegisterPage = location.pathname === "/register";
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        paddingTop: "0.2rem",
        paddingBottom: "0.2rem",
      }}
    >
      <div className="container-fluid d-flex align-items-center">
        <Link to="/" className="nav-link-persona me-3">
          <BsHouseFill size={28} />
        </Link>

        {/* Botón Crear cuenta (solo si NO estás en /register) */}
        {!isRegisterPage && (
          <Link to="/register" className="btn btn-outline-success me-3">
            Crear cuenta
          </Link>
        )}

        {/* OPCIÓN A: Frase inspiradora simple */}
        {/* <span className="text-muted ms-3">
          SportConnect: conecta a través del deporte
        </span> */}

        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="navbar-nav d-flex flex-row gap-4"></div>
        </div>

        <div className="navbar-brand ms-auto">
          <img
            src="/logo_sin_fondo.png"
            alt="SportConnect"
            height="50"
            className="d-inline-block align-top"
          />
        </div>


      </div>
    </nav>
  );
};

export default PublicNavbar;
