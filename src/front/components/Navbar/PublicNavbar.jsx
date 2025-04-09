//* 👆 🤟🏼 ❇️ Riki for the group success 8_Abril 👊 */

import { Link } from "react-router-dom";
import logo from "../../assets/img/Logo_DronFarm2.png";
import "./PublicNavbar.css";

const PublicNavbar = () => {
  return (
    <nav className="navbar public-navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img 
            src={logo} 
            alt="DronFarm Logo" 
            className="logo-img"
          />
        </Link>

        <div className="nav-links">
          <Link to="#servicios" className="nav-link">Servicios</Link>
          <Link to="#beneficios" className="nav-link">Beneficios</Link>
          <Link to="#contacto" className="nav-link">Contacto</Link>
          <Link to="/app/login" className="nav-button login-button">Acceso Clientes</Link>
        </div>
      </div>
    </nav>
  );
};

export default PublicNavbar;