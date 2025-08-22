import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useGlobalReducer from '../hooks/useGlobalReducer';
import { beautifulStyles } from "../styles/beautifulStyles";

export const ResetPassword = () => {
    const { store, dispatch } = useGlobalReducer();
    const [form, setForm] = useState({ email: "" });
    const [newPassword, setNewPassword] = useState({ nuevaContraseña: "", checkNuevaContraseña: "" })
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const { token } = useParams();
    const isLoggedIn = localStorage.getItem('jwtToken') ? true : false;
    const isPassChanged = !!token;

    const handleChangeEmail = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleChangeNewPassword = e => {
        setNewPassword({ ...newPassword, [e.target.name]: e.target.value });
    };
    const handleSubmit = async e => {
        e.preventDefault();
        if (token) {
            if (newPassword.nuevaContraseña === newPassword.checkNuevaContraseña) {
                const resp = await fetch(`${backendUrl}api/user/resetPassword`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({"password" : newPassword,"token": token})
                });
            }

        }else{
            const resp = await fetch(`${backendUrl}api/resetPassword`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form)
            });

            const data = await resp.json();

            
        }
    }
    return (
        <div style={beautifulStyles.container}>
            <h2 style={beautifulStyles.title}>Siembra tu Acceso al Cereal</h2>
            <form onSubmit={handleSubmit} style={beautifulStyles.form}>
                {!token ? (
                <input
                    name="email"
                    type="email"
                    placeholder="Correo del sembrador"
                    onChange={handleChangeEmail}
                    required
                    style={beautifulStyles.input}
                />
                ) : (<>
                <input
                    name="nuevaContraseña"
                    type="password"
                    placeholder="Nueva Contraseña"
                    onChange={handleChangeNewPassword}
                    required
                    style={beautifulStyles.input}
                />
                <input
                    name="checkNuevaContraseña"
                    type="password"
                    placeholder="Vuelva a escribir la misma contraseña"
                    onChange={handleChangeNewPassword}
                    required
                    style={beautifulStyles.input}
                /></>
                )}
                
                
                <button type="submit" style={beautifulStyles.button} >
                    Confirmar
                </button>
            </form>
        </div>
    )
}

