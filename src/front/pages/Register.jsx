import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Register = () => {
    const [form, setForm] = useState({
        fullName: "",
        email: "",
        password: "",
        coordinates: "",
        hasTransport: false
    });

    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);
    const [sending, setSending] = useState(false);
    const navigate = useNavigate();

    const handleChange = e => {
        const { name, value, type, checked } = e.target;
        setForm({ ...form, [name]: type === "checkbox" ? checked : value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setError(null);
        setMessage(null);

        if (!form.fullName || !form.email || !form.password) {
            setError("Por favor, completa todos los campos obligatorios.");
            return;
        }

        if (!form.email.includes("@")) {
            setError("El email no es válido.");
            return;
        }

        setSending(true);

        const resp = await fetch("FALTA EL LINKKKK!!!!!!!!!", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form)
        });

        const data = await resp.json();

        if (resp.ok) {
            setMessage("Usuario registrado correctamente.");
            setTimeout(() => navigate("/login"), 2000);
        } else {
            setError(data.msg || "Error al registrar.");
        }

        setSending(false);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                name="fullName"
                type="text"
                placeholder="Nombre y Apellido"
                onChange={handleChange}
                required
            />
            <input
                name="email"
                type="email"
                placeholder="Email"
                onChange={handleChange}
                required
            />
            <input
                name="password"
                type="password"
                placeholder="Contraseña"
                onChange={handleChange}
                required
            />
            <input
                name="coordinates"
                type="text"
                placeholder="Coordenadas"
                onChange={handleChange}
                required
            />
            <label>
                Dispones de transporte?
                <input
                    name="hasTransport"
                    type="checkbox"
                    onChange={handleChange}
                />
            </label>

            <button type="submit" disabled={sending}>
                {sending ? "Enviando..." : "Registrarse"}
            </button>

            {message && <p style={{ color: "green" }}>{message}</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
    );
};
