import { Link } from "react-router-dom";
import logo from "../assets/img/Logo.png"
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {

  const { store, dispatch } = useGlobalReducer()
  const navigate = useNavigate()
  const handleLogout = () => {
    dispatch({ type: "logout" })
    navigate('/')
  }

  return (


    <nav className="navbar navbar-expand-lg bg-transparent">
  <div className="container-fluid">

    {/* Logo a la izquierda */}
    <Link className="navbar-brand d-flex align-items-center" to="/">
      <img
        src={logo}
        alt="Logo"
        width="360"
        height="56"
        className="d-inline-block align-text-top me-2"
        style={{ objectFit: "contain" }}
      />
    </Link>

    {/* Botón hamburguesa centrado */}
    <div className="d-lg-none d-flex justify-content-end w-100 mb-2">
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
    </div>

    {/* Menú desplegable */}
    <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
      <ul className="navbar-nav align-items-center">
        <li className="nav-item m-2">
          <Link className="nav-link" to="/products">Products</Link>
        </li>
        {/* <li className="nav-item m-2">
          <a className="nav-link" href="#">Shopping Cart</a>
        </li> */}
        <li className="nav-item m-2">
          <a className="nav-link" href="#">QR Code Generator</a>
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
              className="btn btn-danger text-light"
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