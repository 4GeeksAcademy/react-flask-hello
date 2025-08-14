import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from '../hooks/useGlobalReducer';
import { beautifulStyles } from "../styles/beautifulStyles";

export const ResetPassword = () => {
    const { store, dispatch } = useGlobalReducer();
    const [form, setForm] = useState({ email: "" });
    const [newPassword, setNewPassword] = useState({ nuevaContraseña: "", checkNuevaContraseña: "" })
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const isLoggedIn = localStorage.getItem('jwtToken') ? true : false;

    const handleChangeEmail = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleChangeNewPassword = e => {
        setNewPassword({ ...newPassword, [e.target.name]: e.target.value });
    };
    const handleSubmit = async e => {
        e.preventDefault();
        if (!isLoggedIn) {
            const resp = await fetch(`${backendUrl}api/resetPassword`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form)
            });

            const data = await resp.json();
            console.log(data)
            localStorage.setItem("jwt_token", data.msj.Message.subject.token);

        } else {
            if (newPassword.nuevaContraseña === newPassword.checkNuevaContraseña) {
                const resp = await fetch(`${backendUrl}api/user/resetPassword`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(newPassword)
                });
            }
        }
    }
    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Siembra tu Acceso al Cereal</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                {!localStorage.getItem('jwt_Token') ? (
                <input
                    name="email"
                    type="email"
                    placeholder="Correo del sembrador"
                    onChange={handleChangeEmail}
                    required
                    style={styles.input}
                />
                ) : (<>
                <input
                    name="nuevaContraseña"
                    type="password"
                    placeholder="Nueva Contraseña"
                    onChange={handleChangeNewPassword}
                    required
                    style={styles.input}
                />
                <input
                    name="checkNuevaContraseña"
                    type="password"
                    placeholder="Vuelva a escribir la misma contraseña"
                    onChange={handleChangeNewPassword}
                    required
                    style={styles.input}
                /></>
                )}
                
                
                <button type="submit" style={styles.button} disabled={sending}>
                    {sending ? "Arando..." : "¡Se cambio la clave correctamente!"}
                </button>
            </form>
        </div>
    )
}

