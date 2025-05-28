import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {
  const { store } = useGlobalReducer();

  // Calcular número total de artículos
  const totalItems = store.carrito.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-warning w-100 px-3">
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <i className="bi bi-box-seam fs-4 me-2"></i>
          <span className="fw-bold">MiApp</span>
        </Link>

        <div className="d-flex ms-auto align-items-center gap-3">
          <Link className="btn btn-outline-primary" to="/men">Hombre</Link>
          <Link className="btn btn-outline-primary" to="/women">Mujer</Link>
          <Link className="btn btn-outline-primary" to="/service">Servicio</Link>
          <Link className="btn btn-outline-primary" to="/producto">Producto</Link>
          <Link className="btn btn-outline-success" to="/productos">Productos</Link>

          <Link className="btn btn-outline-secondary position-relative" to="/carrito">
            <i className="bi bi-cart-fill fs-5"></i>
            {totalItems > 0 && (
              <span
                className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                style={{ fontSize: "0.7rem" }}
              >
                {totalItems}
              </span>
            )}
          </Link>

          <Link className="btn btn-primary" to="/login">Inicia sesión</Link>
          <Link className="btn btn-outline-dark" to="/register">Regístrate</Link>
        </div>
      </div>
    </nav>
  );
};
