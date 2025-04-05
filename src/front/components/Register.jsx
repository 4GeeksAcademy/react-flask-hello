import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Styles/Register.css";
import ErrorMessage from "../components/ErrorMessage";
import SuccessMessage from "../components/SuccessMessage";

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [checked, setChecked] = useState(false);
    //ESTADOS DE LOS MENSAJES DE EXITO O ERROR
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch(import.meta.env.VITE_BACKEND_URL + 'api/signup', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password, username }),
            });

            if (response.ok) {
                setMessage("Registro exitoso");
                setMessageType("success");
                navigate("/login");

            } else if (response.status === 403) {
                setMessage("El usuario ya existe");
                setMessageType("error");

            } else {
                setMessage("Error al registrarse");
                setMessageType("error2");
            }

        } catch (error) {
            console.error("Error de registro:", error);
            setMessage("Hubo un problema con el registro");
            setMessageType("error");
        }

    };
        const handleMessageClose = () => {
        setMessage("");  
        setMessageType("");  
    };
    return (
        <div className="register">

            {/* MENSAJE DE EXITO O ERROR PROPIO PARA PODER APLICAR ESTILOS */}
            {message && (
                <div className={`reg-message-box ${messageType}`}>
                    {messageType === "error" && <ErrorMessage text={message} onClose={handleMessageClose} />}
                    {messageType === "success" && <SuccessMessage text={message} onClose={handleMessageClose} />}
                </div>
            )}


            <form onSubmit={handleRegister} className="reg-form-content">

                <div className="reg-label-content">
                    <label htmlFor="email" className="reg-form-label">
                        Email address
                    </label>
                    <input
                        type="email"
                        className="reg-form-control"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        aria-describedby="emailHelp"
                    />
                </div>

                <div className="reg-label-content">
                    <label htmlFor="password" className="reg-form-label">
                        Password
                    </label>
                    <input
                        type="password"
                        className="reg-form-control"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className="reg-label-content">
                    <label htmlFor="UserName" className="reg-form-label">
                        Username
                    </label>
                    <input
                        type="username"
                        className="reg-form-control"
                        id="username"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

                {/*BOTON DE CHEK*/}
                <div className="reg-form-check">
                    <input
                        type="checkbox"
                        className="reg-form-check-input"
                        id="check"
                        name="checked"
                        checked={checked}
                        onChange={(e) => setChecked(e.target.checked)}
                    />
                    <label className="reg-form-check-label" htmlFor="check">
                        Check me out
                    </label>
                </div>

                <button type="submit" className="reg-btn">Registrarse</button>

            </form>


        </div>
    );
}

export default Register;
