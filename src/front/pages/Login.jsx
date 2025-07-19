import React, { useState } from "react";
import { Link } from "react-router-dom";

export const Login = () => {
    const [form, setForm] = useState({ email: "", password: "" });

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        console.log(form); // aquí meteré el fetch al navbar©
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
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
                <button type="submit">Login</button>
            </form>

            <p>
                No estás registrado?{" "}
                <Link to="/register">
                    <button type="button">Clic aquí</button>
                </Link>
            </p>
        </>
    );
};