import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Styles/Register.css";
import ErrorMessage1 from "../components/ErrorMessage1";
import ErrorMessage2 from "../components/ErrorMessage2";

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [shopname, setShopname] = useState("");
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        if (!email || !password || !firstname || !lastname || !shopname) {
            setMessage("Por favor, completa todos los campos.");
            setMessageType("error2");
            return;
        }

        const requestData = { email, password, firstname, lastname, shopname };
        console.log("Datos enviados al backend:", requestData);

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}api/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(requestData) 
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("token", data.access_token);

                // Redirige al usuario
                navigate("/settings");

            } else if (response.status === 403) {
                setMessage("El usuario ya existe");
                setMessageType("error");

            } else if (response.status === 400) {
                setMessage(data.msg || "La solicitud es incorrecta. Verifica los datos.");
                setMessageType("error");

            } else {
                setMessage(data.error || "Hubo un problema con el registro");
                setMessageType("error");
            }
        } catch (error) {
            console.error("Error de registro:", error);
            setMessage("No se pudo conectar al servidor");
            setMessageType("error");
        }
    };

    const handleMessageClose = () => {
        setMessage("");
        setMessageType("");
    };

    return (
        <div className="register">
            
            {message && (
                <div className={`reg-message-box ${messageType}`}>
                    {messageType === "error" && <ErrorMessage1 text={message} onClose={handleMessageClose} />}
                    {messageType === "error2" && <ErrorMessage2 text={message} onClose={handleMessageClose} />}
                </div>
            )}

            <form onSubmit={handleRegister} className="reg-form-content">
                <div className="reg-label-content">
                    <label htmlFor="firstname" className="reg-form-label">First Name</label>
                    <input
                        type="text"
                        className="reg-form-control"
                        id="firstname"
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                    />
                </div>

                <div className="reg-label-content">
                    <label htmlFor="lastname" className="reg-form-label">Last Name</label>
                    <input
                        type="text"
                        className="reg-form-control"
                        id="lastname"
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                    />
                </div>

                <div className="reg-label-content">
                    <label htmlFor="shopname" className="reg-form-label">Shop Name</label>
                    <input
                        type="text"
                        className="reg-form-control"
                        id="shopname"
                        value={shopname}
                        onChange={(e) => setShopname(e.target.value)}
                    />
                </div>

                <div className="reg-label-content">
                    <label htmlFor="email" className="reg-form-label">Email address</label>
                    <input
                        type="email"
                        className="reg-form-control"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="reg-label-content">
                    <label htmlFor="password" className="reg-form-label">Password</label>
                    <input
                        type="password"
                        className="reg-form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>


                <button type="submit" className="reg-btn">Registrarse</button>
            </form>
        </div>
    );
}

export default Register;
