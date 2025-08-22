import React from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {
    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLanguageChange = (e) => {
        dispatch({ type: 'set_language', payload: e.target.value });
    };

    const handleThemeToggle = () => {
        dispatch({ type: 'toggle_theme' });
    };

    const handleLogout = () => {
        localStorage.removeItem("jwt_token");
        dispatch({
            type: "set_login_status",
            payload: { isLoggedIn: false, user_id: null, token: null }
        });
        alert("Sesión cerrada.");
        navigate("/");
    };

    const showIcons = store.isLoggedIn || location.pathname === '/home';
    const showLogoutButton = store.isLoggedIn;

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-0">
            <div className="container-fluid">
                <Link to="/home" className="navbar-brand d-flex align-items-center">
                    <i className="fa-solid fa-compact-disc me-2"></i>
                    <span className="h4 mb-0 text-white">Festquila</span>
                </Link>

                <div className="d-flex align-items-center">
                    {showIcons && (
                        <Link to="/prebuy" className="text-white me-3">
                            <i className="fa-solid fa-cart-shopping fa-lg"></i>
                        </Link>
                    )}

                    {showIcons && (
                        <Link to="/create-event" className="text-white me-3">
                            <i className="fa-solid fa-calendar-plus fa-lg"></i>
                        </Link>
                    )}

                    <div className="nav-item me-3">
                        <select 
                            className="form-select form-select-sm" 
                            aria-label="Selector de Idioma"
                            value={store.language}
                            onChange={handleLanguageChange}
                        >
                            <option value="es">Español</option>
                            <option value="en">English</option>
                        </select>
                    </div>

                    <button 
                        className={`btn btn-${store.theme === 'light' ? 'light' : 'dark'} me-3`} 
                        onClick={handleThemeToggle}
                        aria-label="Alternar tema claro/oscuro"
                    >
                        {store.theme === 'light' ? (
                            <i className="fa-solid fa-moon"></i>
                        ) : (
                            <i className="fa-solid fa-sun"></i>
                        )}
                    </button>

                    {showLogoutButton && (
                        <button className="btn btn-outline-danger" onClick={handleLogout}>
                            Cerrar Sesión
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
};