import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "./Styles/Login.css";


function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [checked, setChecked] = useState(false); 
    //ESTADOS DE LOS MENSAJES DE EXITO O ERROR
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");
    
    const navigate = useNavigate(); 

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(import.meta.env.VITE_BACKEND_URL +'api/login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

        
            if (response.ok) {
                navigate("/settings");
            }
            
        } catch (error) {
            console.error("Error Iniciar secion:", error);
            setMessage("Error Iniciar secion");
            setMessageType("error");
        }
    };
  
    return (
        <div className="login">

            {/* MENSAJE DE EXITO O ERROR PROPIO PARA PODER APLICAR ESTILOS */}
            {message && (
                <div className={`message-box ${messageType}`}>
                    {message && <messageBox message={message} type={messageType} />}
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

          
            {/*BOTON DE CHEK*/}
            <div className="log-form-check">
                <input
                    type="checkbox"
                    className="log-form-check-input"
                    id="check"
                    name="checked"
                    checked={checked}
                    onChange={(e) => setChecked(e.target.checked)}
                />
                <label className="log-form-check-label" htmlFor="check">
                    Check me out
                </label>
            </div>

            <button type="submit" className="log-btn">Login</button>

        </form>
    </div>
);
};

export default Login;
