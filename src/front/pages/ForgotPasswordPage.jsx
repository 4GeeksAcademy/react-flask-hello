import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import imagenBack from "../assets/fondo-concierto.jpg";

export const ForgotPasswordPage = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSendResetLink = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");
        setIsLoading(true);

        try {
            const backendUrl = import.meta.env.VITE_BACKEND_URL;
            if (!backendUrl) {
                setError("Error: La URL del backend no está configurada.");
                setIsLoading(false);
                return;
            }
            const response = await fetch(`${backendUrl}api/forgot-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email })
            });

            const data = await response.json();
            if (response.ok) {
                setMessage(data.msg);
            } else {
                setError(data.msg || "Algo salió mal. Inténtalo de nuevo.");
            }
        } catch (err) {
            console.error("Error en la solicitud:", err);
            setError("Hubo un problema al conectar con el servidor.");
        } finally {
            setIsLoading(false);
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
                        {message && <div className="alert alert-success mt-3">{message}</div>}
                        {error && <div className="alert alert-danger mt-3">{error}</div>}
                        <div className="d-grid gap-2 mb-3">
                            <button type="submit" className="btn btn-primary btn-lg" disabled={isLoading}>
                                {isLoading ? "Enviando..." : "Enviar enlace"}
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