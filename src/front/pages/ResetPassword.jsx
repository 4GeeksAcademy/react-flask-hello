import React, { useState, useEffect } from "react";

const PasswordValidation = ({ password }) => {
  if (!password) return null;

  const isLongEnough = password.length >= 8;
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);

  return (
    <div className="mt-2">
      <p className="text-muted mb-1">Tu contraseña debe contener:</p>
      <ul className="list-unstyled small mb-0">
        <li className={isLongEnough ? "text-success" : "text-danger"}>
          {isLongEnough ? "✅" : "❌"} Al menos 8 caracteres
        </li>
        <li className={hasLetter ? "text-success" : "text-danger"}>
          {hasLetter ? "✅" : "❌"} Contiene letras
        </li>
        <li className={hasNumber ? "text-success" : "text-danger"}>
          {hasNumber ? "✅" : "❌"} Contiene números
        </li>
      </ul>
    </div>
  );
};

export const ResetPassword = () => {
  // Solo usamos token de localStorage:
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [resetMessage, setResetMessage] = useState("");
  const [resetLoading, setResetLoading] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  useEffect(() => {
    const savedToken = localStorage.getItem("token") || "";
    setToken(savedToken);
  }, []);

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
        "https://vigilant-space-trout-q769qjqx64r9f657x-3001.app.github.dev/user/new-password",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // ✅ Token como header
          },
          body: JSON.stringify({ password: newPassword }), // ✅ Solo se manda la nueva contraseña
        }
      );

      const data = await res.json();
      if (res.ok) {
        setResetMessage("✅ ¡Hecho! Tu contraseña ha sido actualizada");
        setResetMessage("✅ ¡Hecho! Tu contraseña ha sido actualizada");
        setToken("");
        setNewPassword("");
        localStorage.removeItem("token"); // opcional: borrar token al cambiar
      } else {
        setResetMessage(data.msg || "❌ Ups! Error al resetear la contraseña");
      }
    } catch (error) {
      setResetMessage("❌ Algo no ha salido bien..., Inténtalo de nuevo");
      setResetMessage("❌ Algo no ha salido bien..., Inténtalo de nuevo");
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <div className="reset-password card p-4 shadow">
      <div className="text-center mb-4">
        <div className="emoji" style={{ fontSize: "2rem" }}>
          {isPasswordFocused ? "🙈" : "🐵"}
        </div>
        <h3>Crear nueva contraseña</h3>
        <p className="text-muted">Introduce tu token y la nueva contraseña</p>
      </div>

      <form onSubmit={handleReset}>
        <div className="mb-3">
          <label className="form-label">Token</label>
          <input
            type="text"
            className="form-control"
            placeholder="Token"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Nueva contraseña</label>
          <input
            id="password"
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
          className="btn btn-success w-100"
          type="submit"
          disabled={
            resetLoading ||
            !(isLongEnough && hasLetter && hasNumber) ||
            !token
          }
        >
          {resetLoading ? "Cambiando..." : "Cambiar contraseña"}
        </button>
      </form>

      {resetMessage && (
        <div className="alert alert-info mt-3 text-center">{resetMessage}</div>
      )}
    </div>
  );
};



