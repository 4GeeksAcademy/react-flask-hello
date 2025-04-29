import { Link, useNavigate, useLocation } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import "../assets/styles/navbar.css";

const Navbar = () => {
  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();
  const location = useLocation();

  // Solo mostrar el navbar en la página de inicio (landing)
  const isLanding = location.pathname === "/";

  if (!isLanding) return null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch({ type: "set_user", payload: null });
    navigate("/");
  };

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link className="navbar-brand" to="/" onClick={handleLogoClick}>
          <span className="level-text">LEVEL</span><span className="up-text">UP</span>
        </Link>
        <div className="navbar-buttons">
          {store.user ? (
            <>
              <span>{store.user.email}</span>
              <button className="btn btn-outline-danger" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline-primary">Login</Link>
              <Link to="/register" className="btn btn-outline-success">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;