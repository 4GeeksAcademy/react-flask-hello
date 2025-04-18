import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Styles/Login.css";
import ErrorMessage2 from "./ErrorMessage2";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        // Validación de los campos
        if (!email || !password) {
            setMessage("Por favor, completa todos los campos.");
            setMessageType("error2");
            return;
        }

        const requestData = { email, password };

        try {
            // Verificar si la URL base termina en barra
            const baseUrl = import.meta.env.VITE_BACKEND_URL;
            const apiUrl = baseUrl.endsWith('/') ? `${baseUrl}api/login` : `${baseUrl}api/login`;

            // Petición al servidor
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(requestData),
                
            });

            const data = await response.json();

            if (response.ok) {

                // Guardamos el Token en el navegador
                localStorage.setItem("access_token", data.access_token);

                console.log("Token guardado en cookies:", data.access_token);

                navigate("/settings");
            
            
            } else {
                // Mostrar mensaje de error
                setMessage(data.error || "Error al iniciar sesión");
                setMessageType("error2");
            }

        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            setMessage("Error al conectar con el servidor");
            setMessageType("error2");
        }
    };

    const handleMessageClose = () => {
        setMessage("");
        setMessageType("");
    };

    return (
        <div className="login">

            {message && (
                <div className={`reg-message-box ${messageType}`}>
                    {messageType === "error2" && <ErrorMessage2 text={message} onClose={handleMessageClose} />}
                </div>
            )}

            <form onSubmit={handleLogin} className="log-form-content">
                <div className="log-label-content">
                    <label htmlFor="email" className="log-form-label">
                        Email address
                    </label>
                    <input
                        type="email"
                        className="log-form-control"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        aria-describedby="emailHelp"
                    />
                </div>

                <div className="log-label-content">
                    <label htmlFor="password" className="log-form-label">
                        Password
                    </label>
                    <input
                        type="password"
                        className="log-form-control"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button type="submit" className="log-btn">Login</button>
            </form>
        </div>
    );
};

export default Login;
