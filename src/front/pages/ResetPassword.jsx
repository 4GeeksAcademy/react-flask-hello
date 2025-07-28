import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PasswordValidation = ({ password }) => {
  if (!password) return null;

  const isLongEnough = password.length >= 8;
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);

  return (
    <div className="password-validation">
      <p className="password-validation-title">Tu contraseña debe incluir:</p>
      <ul className="password-validation-list">
        <li className={isLongEnough ? "validation-success" : "validation-error"}>
          {isLongEnough ? "✅" : "❌"} Al menos 8 caracteres
        </li>
        <li className={hasLetter ? "validation-success" : "validation-error"}>
          {hasLetter ? "✅" : "❌"} Letras (a-z)
        </li>
        <li className={hasNumber ? "validation-success" : "validation-error"}>
          {hasNumber ? "✅" : "❌"} Números (0-9)
        </li>
      </ul>
    </div>
  );
};

export const ResetPassword = () => {
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [resetMessage, setResetMessage] = useState("");
  const [resetLoading, setResetLoading] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const savedToken = localStorage.getItem("token") || "";
    setToken(savedToken);
  }, []);

  const isLongEnough = newPassword.length >= 8;
  const hasLetter = /[a-zA-Z]/.test(newPassword);
  const hasNumber = /[0-9]/.test(newPassword);

  const handleReset = async (e) => {
    e.preventDefault();
    setResetMessage("");
    setResetLoading(true);

    try {
      const res = await fetch(
        import.meta.env.VITE_BACKEND_URL+"/api/user/new-password",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ password: newPassword }),
        }
      );

      const data = await res.json();
      if (res.ok) {
        setResetMessage("✅ Contraseña actualizada correctamente.");
        setNewPassword("");
        localStorage.removeItem("token");
        setToken("");
        setResetLoading(false);

        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        setResetMessage(data.msg || "❌ Error al actualizar la contraseña.");
        setResetLoading(false);
      }
    } catch (error) {
      setResetMessage("❌ Algo salió mal. Intenta de nuevo.");
      setResetLoading(false);
    }
  };

  return (
    <div className="reset-password card">
      <div className="reset-password-header">
        <div className={`reset-password-emoji ${isPasswordFocused ? "hidden" : "visible"}`}>
          {isPasswordFocused ? "🙈" : "🐵"}
        </div>
        <h3 className="reset-password-title"><strong>Establece tu nueva contraseña</strong></h3>
        <p className="reset-password-subtitle">Crea una contraseña segura para tu cuenta.</p>
      </div>

      <form onSubmit={handleReset} className="reset-password-form">
        {!token && (
          <div className="form-group">
            <label className="form-label">Token</label>
            <input
              type="text"
              className="form-control"
              placeholder="Pega tu token aquí"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              required
            />
          </div>
        )}

        <div className="form-group">
          <label className="form-label">Nueva contraseña</label>
          <input
            type="password"
            className="form-control"
            placeholder="********"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            onFocus={() => setIsPasswordFocused(true)}
            onBlur={() => setIsPasswordFocused(false)}
            required
          />
          <PasswordValidation password={newPassword} />
        </div>

        <button
          className="btn reset-password-submit"
          type="submit"
          disabled={resetLoading || !(isLongEnough && hasLetter && hasNumber) || !token}
        >
          {resetLoading ? "Actualizando..." : "Cambiar contraseña"}
        </button>
      </form>

      {resetMessage && (
        <div className="reset-password-message">
          {resetMessage}
        </div>
      )}
    </div>
  );
};



