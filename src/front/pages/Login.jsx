import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import videoBackground from "../assets/video.mp4";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { dispatch } = useGlobalReducer();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const backendUrl = import.meta.env.VITE_BACKEND_URL;
            if (!backendUrl) {
                alert("Error: La URL del backend no está configurada.");
                return;
            }

            const response = await fetch(`${backendUrl}api/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("jwt_token", data.access_token);
                
                dispatch({
                    type: "set_login_status",
                    payload: {
                        isLoggedIn: true,
                        user_id: data.user_id, 
                        token: data.access_token
                    }
                });

                alert("Inicio de sesión exitoso!");
                navigate("/home");
            } else {
                alert(`Error al iniciar sesión: ${data.message || response.statusText}`);
            }
        } catch (error) {
            console.error("Error de conexión al iniciar sesión:", error);
            alert("Hubo un problema al conectar con el servidor. Asegúrate de que el backend esté funcionando.");
        }
    };

    return (
        <div className="login-page-container">
            <video autoPlay loop muted className="video-background">
                <source src={videoBackground} type="video/mp4" />
                Tu navegador no soporta la etiqueta de video.
            </video>

            <div className="login-content-wrapper">
                <div className="login-form-card p-4">
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