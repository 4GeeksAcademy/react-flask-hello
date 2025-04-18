import React, { useState } from "react";
import "./ForgotPassword.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/send-reset-link`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("✅ Revisa tu correo electrónico para recuperar tu contraseña.");
      } else {
        setMessage(data.error || "❌ Ha ocurrido un error.");
      }
    } catch (error) {
      setMessage("❌ Error al conectar con el servidor.");
    }
  };

  return (
    <div className="forgot-password-background">
      <div className="forgot-password-container">
        <h2 className="forgot-password-title">🔐 Recuperar contraseña</h2>
        <form className="forgot-password-form" onSubmit={handleSubmit}>
          <input
            className="forgot-password-input"
            type="email"
            placeholder="Introduce tu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button className="forgot-password-button" type="submit">
            Enviar enlace
          </button>
        </form>
        {message && (
          <p className="forgot-password-message">{message}</p>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
