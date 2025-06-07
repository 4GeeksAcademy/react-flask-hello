import { Link } from "react-router-dom";
import { BsPersonFill, BsHouseFill } from "react-icons/bs";
import "../styles/Navbar.css";

const PublicNavbar = () => {
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

        <span
          cclassName="nav-link-disabled me-3"
          data-bs-toggle="tooltip"
          data-bs-placement="bottom"
          title="Solo para usuarios registrados"
          style={{ cursor: "not-allowed" }}
        >
          <BsPersonFill size={28} />
        </span>

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
