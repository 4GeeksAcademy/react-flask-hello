import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { Loader } from './Loader'
import './Navbar.css';
import vertikaLogo from "../assets/images/Vértika Logo.png";

export const Navbar = () => {
  const navigate = useNavigate()
  const { store, isAuthenticated, logout, loading } = useGlobalReducer();
  const totalItems = store.carrito.reduce((acc, item) => acc + item.cantidad, 0);

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  if (loading) return <Loader />

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark w-100 px-3">
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center text-light" to="/">
          <img
            src={vertikaLogo}
            alt="Vértika"
            height="32"
            style={{ objectFit: "contain" }}
          />
        </Link>

        <div className="d-flex ms-auto align-items-center gap-3">

          {isAuthenticated ? (
            <>
              <Link className="navbar-link" to="/men">Hombre</Link>
              <Link className="navbar-link" to="/women">Mujer</Link>
              <Link className="navbar-link" to="/service">Servicio</Link>
              <Link className="navbar-link" to="/productos">Productos</Link>
            </>
          ) : (
            <Link className="navbar-link" to="/productos">Productos</Link>
          )}

          <Link className="navbar-link position-relative" to="/carrito">
            Carrito
            {totalItems > 0 && (
              <span
                className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                style={{ fontSize: "0.7rem" }}
              >
                {totalItems}
              </span>
            )}
          </Link>

          {isAuthenticated ? (
            <>
              <span className="navbar-link logout-link" onClick={handleLogout}>Cerrar Sesión</span>
            </>
          ) : (
            <>
              <Link className="navbar-link" to="/login">Inicia sesión</Link>
              <Link className="navbar-link" to="/register">Regístrate</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
