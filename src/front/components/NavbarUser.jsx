import { Link, useNavigate } from "react-router-dom";
import logoB from "../assets/img/logoB.svg";

export const NavbarUser = () => {

  const navigate = useNavigate()

    const handleLogout = () => {
    localStorage.removeItem("jwt_token");
    //setIsLogged(false);
    navigate("/");
    };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark shadow-sm mt-2 ms-2 me-2 px-3" style={{ backgroundColor: '#003366', borderRadius: '15px' }}>
      <div className="container-fluid">
        <img src={logoB} alt="Logo" width={200} />

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav align-items-center">
            <li className="nav-item">
              <Link className="nav-link" to="/">Inicio</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/vehiculos">Mis Vehículos</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">Perfil</Link>
            </li>
            <li className="nav-item">
              <button onClick={handleLogout} className="btn btn-info ms-3" to="/" >LogOut</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};