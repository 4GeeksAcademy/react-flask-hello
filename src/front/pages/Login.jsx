import React from "react";
import "../../styles/login.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // navigate("/"); queda pendiente
    };


    return (
        <div className="container_login">
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2 className="mt-5">Iniciar sesión</h2>
                    <span>Usa tu email para iniciar sesión</span>
                    <input type="email" placeholder="Correo" required />
                    <input type="password" placeholder="Contraseña" required />
                    <button className="button_login">Login</button>
                    <div className="form-footer">
                        <div className="options-row">
                            <label className="remember-label">
                                <input type="checkbox" className="me-4" />
                                Recuérdame
                            </label>
                            <Link to="/register" className="forgot-password me-3">
                                ¿No tienes cuenta? Regístrate
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
