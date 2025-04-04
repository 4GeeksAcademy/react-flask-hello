import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";



const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        lastname: "",
        dni: "",
        email: "",
        password: ""
    });
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(null);
        setError(null);

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData),
                mode:"cors"
            });

            const data = await response.json();

            if (response.ok) {
                setMessage(data.msg || "¡Registro exitoso!");
                setFormData({
                    name: "",
                    lastname: "",
                    dni: "",
                    email: "",
                    password: ""
                });

                setTimeout(() => {
                    navigate("/");
                }, 1000);
            } else {
                setError(data.error || "Error en el registro");
            }
        } catch (err) {
            console.error(err);
            setError("Error del servidor");
        }
    };

    return (
        <div className="signup-background">
            <div className="signup-container">
                <h2 className="signup-title">Registro</h2>
                
                <form className="signup-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Nombre"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="signup-input"
                    />
                    
                    <input
                        type="text"
                        name="lastname"
                        placeholder="Apellido"
                        value={formData.lastname}
                        onChange={handleChange}
                        required
                        className="signup-input"
                    />
                    
                    <input
                        type="text"
                        name="dni"
                        placeholder="DNI"
                        value={formData.dni}
                        onChange={handleChange}
                        required
                        className="signup-input"
                    />
                    
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="signup-input"
                    />
                    
                    <input
                        type="password"
                        name="password"
                        placeholder="Contraseña"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="signup-input"
                    />

                    <button type="submit" className="signup-button">Registrarse</button>

                    {message && <p className="signup-message success">{message}</p>}
                    {error && <p className="signup-message error">{error}</p>}
                </form>

                <p className="signup-footer">
                    ¿Ya tienes cuenta? <a href="/" className="signup-link">Inicia sesión</a>
                </p>
            </div>
        </div>
    );
};

export default Signup;