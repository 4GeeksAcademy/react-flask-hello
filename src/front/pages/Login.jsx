import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";


const Login = () => {

    const URLBACK = import.meta.env.VITE_BACKEND_URL
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { login } = useGlobalReducer()


    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const resp = await axios.post(`${URLBACK}api/login`, {
                email, password
            })

            const data = resp.data

            if (data?.token) {
                login(data.token)
                navigate('/')
            } else {
                alert("Usuario o contraseña equivocada")
            }

        } catch (error) {
            console.error("Error logging in", error);
            alert("Ocurrió un error al conectar con el servidor");
        }
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
                        onChange={(e) => setEmail(e.target.value.toLowerCase())}
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

                <button type="submit" className="btn btn-primary w-100" >
                    Iniciar sesión
                </button>
            </form>
            <div className="mt-3 text-center">
                <p> ¿Olvidaste tu contraseña?{" "} <a href="/recuperacion-de-contrasena" className="text-decoration-none">Recuperar contraseña</a>
                </p>
            </div>
        </div>
    );
};

export default Login;
