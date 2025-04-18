import React, { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Aquí puedes hacer la llamada al backend
    try {
      const response = await fetch("https://special-space-halibut-r4pxpqgvpw75fpjx7-3001.app.github.dev/user/send-reset-link", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Revisa tu correo electrónico para recuperar tu contraseña.");
      } else {
        setMessage(data.error || "Ha ocurrido un error.");
      }
    } catch (error) {
      setMessage("Error al conectar con el servidor.");
    }
  };

  return (
    <div className="forgot-password-container">
      <h2>Recuperar contraseña</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Introduce tu correo electrónico:</label>
        <input
          type="email"
          id="email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Enviar</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ForgotPassword;
