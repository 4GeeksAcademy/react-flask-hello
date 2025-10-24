import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import imagenBack from "../assets/fondo-concierto.jpg";

export const ResetPasswordPage = () => {
    const [password, setPassword] = useState("");

    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();
    const { token } = useParams();
    console.log(token)

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Las contraseñas no coinciden.");
            return;
        }

        if (!token) {
            alert("Token de restablecimiento no encontrado.");
            return;
        }

        try {
            const backendUrl = import.meta.env.VITE_BACKEND_URL;
            if (!backendUrl) {
                alert("Error: La URL del backend no está configurada.");
                return;
            }

            const response = await fetch(`${backendUrl}api/reset-password/${token}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ password })
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
                <div className="login-form-card p-4 form-evet rounded">
                    <h2 className="text-center mb-4">Establecer Nueva Contraseña</h2>
                    <form onSubmit={handleResetPassword}>
                        <div className="mb-3">
                            <label htmlFor="passwordInput" className="form-label">Nueva Contraseña</label>
                            <input
                                type="password"
                                className="form-control"
                                id="passwordInput"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="confirmPasswordInput" className="form-label">Confirmar Contraseña</label>
                            <input
                                type="password"
                                className="form-control"
                                id="confirmPasswordInput"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="d-grid gap-2 mb-3">
                            <button type="submit" className="btn btn-primary btn-lg">
                                Restablecer Contraseña
                            </button>
                        </div>
                        <div className="text-center">
                            <Link to="/">Volver al login</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};