import React, { useState } from "react";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    if (!email.includes("@")) {
      setMessage("❌ Introduce un correo válido.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(
        "https://vigilant-space-trout-q769qjqx64r9f657x-3001.app.github.dev/api/new-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await res.json();
      if (res.ok) {
        setMessage("✅ Enlace enviado. Revisa tu correo.");
        setEmail("");
        if (data.token) {
          localStorage.setItem("token", data.token);
        }
      } else {
        setMessage(data.msg || "❌ Error al enviar el correo.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("❌ Error de red. Inténtalo más tarde.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-password card p-4 shadow">
      <div className="text-center mb-4">
        <div className="emoji" style={{ fontSize: "2rem" }}>
          🔒
        </div>
        <h3>¿Olvidaste tu contraseña?</h3>
        <p className="text-muted">Te enviaremos un enlace por correo</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Correo electrónico</label>
          <input
            type="email"
            className="form-control"
            placeholder="ejemplo@correo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button className="btn btn-primary w-100" type="submit" disabled={loading}>
          {loading ? "Enviando..." : "Enviar enlace"}
        </button>
      </form>

      {message && (
        <div className="alert alert-info mt-3 text-center">
          {message}
        </div>
      )}
    </div>
  );
};



