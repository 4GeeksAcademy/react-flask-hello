import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
    // Estado para almacenar lo que el usuario escribe
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    // Esta función se ejecuta al enviar el formulario
    const handleRegister = async (e) => {
        e.preventDefault();

        // ======== SIMULACIÓN TEMPORAL DE REGISTRO ========
        console.log("Nuevo usuario:", email);
        console.log("Contraseña:", password);
        alert("Usuario registrado (simulación)");
        navigate("/login");

        // ======== LÓGICA REAL PARA CUANDO TENGAMOS API ========
        /*
        try {
            const response = await fetch("https://miapi.com/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });

            if (response.ok) {
                alert("Registro exitoso. Ahora puedes iniciar sesión.");
                navigate("/login");
            } else {
                alert("Error al registrar. Intenta con otro correo.");
            }
        } catch (error) {
            console.error("Error en el registro:", error);
            alert("No se pudo conectar con el servidor.");
        }
        */
    };

    return (
        <div className="container mt-5" style={{ maxWidth: "500px" }}>
            <h2 className="mb-4 text-center">Crear Cuenta</h2>
            <form onSubmit={handleRegister}>
                <div className="mb-3">
                    <label htmlFor="registerEmail" className="form-label">
                        Correo electrónico
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="registerEmail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="registerPassword" className="form-label">
                        Contraseña
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="registerPassword"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-success w-100">
                    Registrarse
                </button>
            </form>
        </div>
    );
};

export default Register;
