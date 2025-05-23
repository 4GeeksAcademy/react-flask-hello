import { Link } from "react-router-dom";

export const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-warning w-100 px-3">
            <div className="container-fluid">
                {/* Logo a la izquierda */}
                <Link className="navbar-brand d-flex align-items-center" to="/">
                    <i className="bi bi-box-seam fs-4 me-2"></i> {/* Ícono como logo */}
                    <span className="fw-bold">MiApp</span>
                </Link>

                {/* Botones a la derecha */}
                <div className="d-flex ms-auto align-items-center gap-3">
                    <Link className="btn btn-outline-primary" to="/men">Hombre</Link>
                    <Link className="btn btn-outline-primary" to="/women">Mujer</Link>
                    <Link className="btn btn-outline-primary" to="/service">Servicio</Link>
                    <Link className="btn btn-outline-primary" to="/producto">Producto</Link>
                    <Link className="btn btn-outline-secondary position-relative" to="/carrito">
                        <i className="bi bi-cart-fill fs-5"></i>
                    </Link>
                    <Link className="btn btn-primary" to="/login">
                        Inicia sesión
                    </Link>
                    <Link className="btn btn-outline-dark" to="/register">
                        Regístrate
                    </Link>

                </div>
            </div>
        </nav>
    );
};