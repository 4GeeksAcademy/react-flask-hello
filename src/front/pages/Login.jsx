import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    // Estado local para capturar los valores del formulario
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Hook de React Router para redirigir al usuario tras iniciar sesión
    const navigate = useNavigate();

    // Esta función se ejecuta cuando el usuario envía el formulario
    const handleLogin = async (e) => {
        e.preventDefault(); // Previene que el formulario recargue la página por defecto

        // ======== SIMULACIÓN TEMPORAL DE LOGIN ========
        // Esto es solo para poder continuar con el desarrollo del proyecto
        // Aquí aún NO se comprueba contra la base de datos ni se recibe un token
        console.log("Email ingresado:", email);
        console.log("Contraseña ingresada:", password);
        navigate("/home");

        // ======== LÓGICA REAL PARA CUANDO ESTÉ LISTA LA API ========
        // Descomenta este bloque cuando tengas acceso a la API de login

        /*
        try {
            const response = await fetch("https://miapi.com/login", {
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
                const data = await response.json();
                localStorage.setItem("token", data.token); // Guarda el token o info útil
                navigate("/home"); // Redirige al home si todo va bien
            } else {
                alert("Credenciales incorrectas. Intenta nuevamente.");
            }
        } catch (error) {
            console.error("Error al intentar iniciar sesión:", error);
            alert("Ocurrió un error al conectar con el servidor.");
        }
        */
    };

    return (
        <div className="container mt-5" style={{ maxWidth: "500px" }}>
            <h2 className="mb-4 text-center">Iniciar Sesión</h2>
            <form onSubmit={handleLogin}>
                <div className="mb-3">
                    <label htmlFor="loginEmail" className="form-label">
                        Correo electrónico
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="loginEmail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="loginPassword" className="form-label">
                        Contraseña
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="loginPassword"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary w-100">
                    Iniciar sesión
                </button>
            </form>
        </div>
    );
};

export default Login;
