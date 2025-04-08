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

        if (!email || !password) {
            setMessage("Por favor, completa todos los campos.");
            setMessageType("error2");
            return;
        }
        const requestData = { email, password};
        console.log("Datos enviados al backend:", requestData);


        try {
            const response = await fetch(import.meta.env.VITE_BACKEND_URL + 'api/login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestData),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.access_token)
                navigate("/settings");
            }

        } catch (error2) {
            console.error("Error Iniciar secion:", error2);
            setMessage("Error Iniciar secion");
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
