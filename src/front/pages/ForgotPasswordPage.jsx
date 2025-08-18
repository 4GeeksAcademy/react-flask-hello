import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import imagenBack from "../assets/fondo-concierto.jpg";

export const ForgotPasswordPage = () => {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    const { store } = useGlobalReducer();

    const handleSendResetLink = async (e) => {
        e.preventDefault();
        try {
            const backendUrl = import.meta.env.VITE_BACKEND_URL;
            if (!backendUrl) {
                alert("Error: La URL del backend no está configurada.");
                return;
            }
            const response = await fetch(`${backendUrl}/api/users/forgot-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email })
            });

            const data = await response.json();
            if (response.ok) {
                alert(data.msg);
                navigate("/");
            } else {
                alert(`Error: ${data.msg || response.statusText}`);
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
            alert("Hubo un problema al conectar con el servidor.");
        }
    };

    return (
        <div className="signup-page-container">
            <div className="imagen-background">
                <img src={imagenBack} alt="imagen fondo" />
            </div>
            <div className="login-content-wrapper">
                <div className="login-form-card p-4">
                    <h2 className="text-center mb-4">Forgot your password?</h2>
                    <h6 className="text-center mb-4">
                        Introduce tu email para recibir un correo de restablecimiento.
                    </h6>
                    <form onSubmit={handleSendResetLink}>
                        <div className="mb-3">
                            <label htmlFor="emailInput" className="form-label">Email address</label>
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
                        <div className="d-grid gap-2 mb-3">
                            <button type="submit" className="btn btn-primary btn-lg">
                                Enviar enlace
                            </button>
                        </div>
                        <div className="text-center">
                            <Link to="/">Regresar a login</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};