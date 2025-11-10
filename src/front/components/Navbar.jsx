import { Link } from "react-router-dom";
import logo from "../assets/img/Logo.png"
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {

  const {store, dispatch } = useGlobalReducer()
  const navigate = useNavigate()
  const handleLogout = () => {
    dispatch({type: "logout"})
    navigate('/')
  }

  return (


   <nav className="navbar navbar-expand-lg bg-transparent">
  <div className="container-fluid">
    {/* Logo */}
    <Link className="navbar-brand d-flex align-items-center" to="/">
      <img
        src={logo}
        alt="Logo"
        width="360"
        height="56"
        className="d-inline-block align-text-top me-2"
      />
    </Link>

    {/* Botón hamburguesa */}
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon"></span>
    </button>

    {/* Contenedor colapsable */}
    <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
      <ul className="navbar-nav align-items-lg-center text-center">
        <li className="nav-item m-2">
          <a className="nav-link fw-semibold" href="#">Products</a>
        </li>
        <li className="nav-item m-2">
          <a className="nav-link fw-semibold" href="#">Shopping Cart</a>
        </li>
        <li className="nav-item m-2">
          <a className="nav-link fw-semibold" href="#">QR Code Generator</a>
        </li>

        <li className="nav-item m-2">
          <Link
            to={store.auth ? "/perfil" : "/login"}
            className="btn btn-danger px-4"
          >
            <strong>{store.auth ? "Perfil" : "Login"}</strong>
          </Link>
        </li>

        {store.auth && (
          <li className="nav-item m-2">
            <button
              onClick={handleLogout}
              className="btn btn-outline-danger px-4"
            >
              <strong>Logout</strong>
            </button>
          </li>
        )}
      </ul>
    </div>
  </div>
</nav>

  );
};