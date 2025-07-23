import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import videoBackground from "../assets/video.mp4";

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log("Intentando login simulado con:", { email, password });
        alert("Login simulado exitoso! Redirigiendo a Home.");
        navigate("/home");
    };

    return (
        <div className="login-page-container">
            <video autoPlay loop muted className="video-background">
                <source src={videoBackground} type="video/mp4" />
                Tu navegador no soporta la etiqueta de video.
            </video>

            <div className="login-content-wrapper">
                <div className="login-form-card p-4 shadow-lg rounded">
                    <h2 className="text-center mb-4">Iniciar Sesión</h2>
                    <form onSubmit={handleLogin}>
                        <div className="mb-3">
                            <label htmlFor="emailInput" className="form-label">Correo Electrónico</label>
                            <input
                                type="email"
                                className="form-control"
                                id="emailInput"
                                placeholder="tuemail@ejemplo.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="passwordInput" className="form-label">Contraseña</label>
                            <input
                                type="password"
                                className="form-control"
                                id="passwordInput"
                                placeholder="********"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="d-grid gap-2 mb-3">
                            <button type="submit" className="btn btn-primary btn-lg">
                                Entrar
                            </button>
                        </div>
                        <div className="text-center">
                            <Link to="/forgot-password" className="d-block mb-2">¿Olvidaste tu contraseña?</Link>
                            <Link to="/signup">¿No tienes cuenta? Regístrate aquí</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};