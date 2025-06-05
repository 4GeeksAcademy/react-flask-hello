import React from "react";
import "../../styles/login.css";

const Login = () => {

    return (
        <div className="container_login">
            <div className="form-container">
                <form>
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
                            <a href="#" className="forgot-password me-4">¿Olvidaste tu contraseña?</a>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;