// 👇 ❇️ Riki for the group success 👊

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { showErrorAlert, showSuccessAlert } from "../../components/modal_alerts/modal_alerts";
import "./Signup.css";
import { useGlobalReducer } from "../../hooks/useGlobalReducer";


const Signup = () => {
  const navigate = useNavigate();
  const { dispatch } = useGlobalReducer(); // 👈 Hook global
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    dni: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        mode: "cors"
      });
      const data = await response.json();

      if (response.ok) {
        // 👇 Despachar login si el backend responde con token y user
        if (data.access_token && data.user) {
          dispatch({
            type: "LOGIN",
            payload: {
              token: data.access_token,
              rolId: data.user.rolId,
              userId: data.user.id
            }
          });
        }
        navigate("/app/plot_form");
        showSuccessAlert(data.msg || "¡Registro realizado con éxito!", () => {
          
        });
        setFormData({
          name: "",
          lastname: "",
          dni: "",
          email: "",
          password: ""
        });

      } else {
        showErrorAlert(data.error || "Error en el registro");
      }
    } catch (err) {
      showErrorAlert("Error del servidor");
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
        </form>
        <p className="signup-footer">
          ¿Ya tienes cuenta? <a href="/" className="signup-link">Inicia sesión</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;