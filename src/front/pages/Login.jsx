import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();


    const handleLogin = async (e) => {
        e.preventDefault();
        alert("Inicio de sesion exitoso");
        navigate("/carrito");
    };

    const loginUser = async () => {

        try {
            const resp = await axios.post("https://friendly-lamp-x5v79p56j7xxf4gw-3001.app.github.dev/api/login", {
                email, password
            })
            localStorage.setItem("token", resp.data.token)
            console.log("token", resp.data.token)
        } catch (error) {
            console.error("Error logging in", error);
            alert("Ocurrió un error al conectar con el servidor");
        }
    }


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

                <button type="submit" className="btn btn-primary w-100" onClick={loginUser}>
                    Iniciar sesión
                </button>
            </form>
        </div>
    );
};

export default Login;
