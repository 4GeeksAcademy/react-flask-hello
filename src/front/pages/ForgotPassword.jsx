import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
        import.meta.env.VITE_BACKEND_URL + "/api/user/forgotten",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        setMessage("✅ Token generado. Redirigiendo al cambio de contraseña...");
        setEmail("");

        setTimeout(() => {
          navigate("/resetpassword");
        }, 1500);
      } else {
        setMessage(data.msg || "❌ No se pudo generar el token.");
      }
    } catch (error) {
      setMessage("❌ Error de red. Intenta de nuevo más tarde."+import.meta.env.VITE_BACKEND_URL);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-password card">
      <div className="forgot-password-header">
        <div className="forgot-password-emoji">🔐</div>
        <h3 className="forgot-password-title"><strong>¿Olvidaste tu contraseña?</strong></h3>
        <p className="forgot-password-subtitle">Introduce tu correo para generar un nuevo acceso.</p>
      </div>

      <form onSubmit={handleSubmit} className="forgot-password-form">
        <div className="form-group">
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

        <button className="btn forgot-password-submit" type="submit" disabled={loading}>
          {loading ? "Enviando..." : "Generar token"}
        </button>
      </form>

      {message && (
        <div className="forgot-password-message">
          {message}
        </div>
      )}
    </div>
  );
};