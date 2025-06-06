import React, { useState } from "react";

const SolicitarToken = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // evita recarga

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (response.ok) {
        alert("Correo de recuperación enviado con éxito");
      } else {
        alert(`Error: ${data.error || data.msg}`);
      }

    } catch (error) {
      console.error("Error en la solicitud:", error);
      alert("Hubo un problema al intentar enviar el correo.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Recuperar Contraseña</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Correo electrónico</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Enviar</button>
      </form>
    </div>
  );
};

export default SolicitarToken;
