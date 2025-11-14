import React, { useState, useEffect } from "react";
import "../styles/Form.css";
import { Link } from "react-router-dom";
const Form = ({ mode, onSubmit, successMessage, userData }) => {
  const [email, setEmail] = useState(userData?.email || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [errorMsn, setErrorMsn] = useState(null);

  useEffect(() => {
    if (successMessage) setErrorMsn(successMessage);
    if (userData) {
      setEmail(userData.email);
      setNewEmail(userData.email);
    }
  }, [successMessage, userData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (mode === "register" && password !== confirmPassword) {
      setErrorMsn("Las contraseñas no coinciden");
      return;
    }
    if (mode === "config" && newPassword && newPassword !== confirmNewPassword) {
      setErrorMsn("Las nuevas contraseñas no coinciden");
      return;
    }
    try {
      if (mode === "config") {
        await onSubmit({ newEmail, newPassword, setErrorMsn });
        setPassword("");
        setConfirmPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
      } else {
        await onSubmit({ email, password, setErrorMsn });
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      }
    } catch (error) {
      setErrorMsn(error.message || "Error");
    }
  };

  return (
    <div className={`container-fluid min-vh-100 d-flex ${mode === "config" ? "justify-content-center align-items-center" : ""}`}>
      <div className="row min-vh-80 w-100">
        {mode !== "config" && (
          <div className="col-lg-6 d-none d-lg-flex align-items-center justify-content-center p-0">
            <img
              src="https://res.cloudinary.com/dmx0zjkej/image/upload/v1763121985/Pngtree_group_of_office_worker_discussing_4041370_ptshsp.png"
              alt="Visual"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        )}
        <div className={`col-12 ${mode !== "config" ? "col-lg-6 d-flex align-items-center justify-content-center py-5 px-4" : "d-flex justify-content-center"}`}>
          <div className="Form">
            <h1 className="mb-4 text-center">
              {mode === "register" && "Registrarse"}
              {mode === "login" && "Iniciar Sesión"}
              {mode === "config" && "Configuración"}
            </h1>
            {errorMsn && (
              <div className={`alert alert-${successMessage === errorMsn ? "success" : "danger"}`}>
                {errorMsn}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              {(mode === "register" || mode === "login") && (
                <>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Contraseña</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  {mode === "register" && (
                    <div className="mb-3">
                      <label htmlFor="confirmPassword" className="form-label">Confirmar Contraseña</label>
                      <input
                        type="password"
                        className="form-control"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                    </div>
                  )}
                </>
              )}
              {mode === "config" && (
                <>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control mb-2" value={email} readOnly />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Modificar Email</label>
                    <input
                      type="email"
                      className="form-control"
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Modificar Contraseña</label>
                    <input
                      type="password"
                      className="form-control mb-2"
                      placeholder="Nueva contraseña"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Confirmar nueva contraseña"
                      value={confirmNewPassword}
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                    />
                  </div>
                </>
              )}
              <button type="submit" className="button w-100 mb-3">
                {mode === "register" && "Registrarse"}
                {mode === "login" && "Iniciar Sesión"}
                {mode === "config" && "Guardar Cambios"}
              </button>
              {mode === "config" && (
                <Link to="/dashboard" className="btn btn-danger w-100 mb-3">
                  Cancelar
                </Link>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;