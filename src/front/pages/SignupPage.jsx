import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import imagenBack from "../assets/fondo-orquesta.jpg"

export const SignupPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Las contraseñas no coinciden.");
            return;
        }

        const username = email;
        const backendUrl = import.meta.env.VITE_BACKEND_URL;

        try {
            const createUserResponse = await fetch(`${backendUrl}api/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({email, password})
            });

            if (!createUserResponse.ok && createUserResponse.status !== 400) {
                throw new Error(`Error al inicializar usuario en 4Geeks API: ${createUserResponse.statusText}`);
            }

            const initialPost = { label: `Bienvenido a Festquila, ${username}!`, done: false };
            const addPostResponse = await fetch(`${backendUrl}api/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(initialPost)
            });

            if (!addPostResponse.ok) {
                console.warn(`Advertencia: No se pudo añadir la publicación inicial para ${username}.`);
            }

            alert("¡Registro exitoso en Festquila! Ahora puedes iniciar sesión.");
            navigate("/");
        } catch (error) {
            console.error("Error al registrarse con la API de 4Geeks:", error);
            alert(`Hubo un problema al registrarse: ${error.message}.`);
        }
    };

    return (
        <div className="signup-page-container">
            <div className="imagen-background">
                <img src={imagenBack} alt="imagen fondo" />
            </div>
            <div className="login-content-wrapper">
                <div className="login-form-card p-4">
                    <h2 className="text-center mb-4">Regístrate</h2>
                    <form onSubmit={handleSignup}>
                        <div className="mb-3">
                            <label htmlFor="emailInput" className="form-label">Correo Electrónico (será tu nombre de usuario)</label>
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
                        <div className="mb-3">
                            <label htmlFor="confirmPasswordInput" className="form-label">Confirmar Contraseña</label>
                            <input
                                type="password"
                                className="form-control"
                                id="confirmPasswordInput"
                                placeholder="********"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="d-grid gap-2 mb-3">
                            <button type="submit" className="btn btn-success btn-lg">
                                Crear Cuenta Festquila
                            </button>
                        </div>
                        <div className="text-center">
                            <Link to="/">¿Ya tienes cuenta? Inicia sesión aquí</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};