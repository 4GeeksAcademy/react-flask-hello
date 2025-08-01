import React, { useState } from "react";
import { Link } from "react-router-dom";
import LogoUrl from "../assets/img/logoAutoTekCeleste.svg";
import resetUrl from "../assets/img/resetmecanico.jpg";

export const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Nuevo estado para la segunda fase (cambiar contraseña)
  const [isCodeVerified, setIsCodeVerified] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // ✅ Enviar email al backend para generar y enviar código
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(import.meta.env.VITE_BACKEND_URL + "/recuperar-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok) {
        setMessage(data.message);
        setError(null);
        setShowModal(true);
      } else {
        setError(data.message || "Error desconocido");
        setMessage(null);
      }
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
      setError("Ocurrió un error al enviar la solicitud.");
      setMessage(null);
    }
  };

  // ✅ Verificar código enviado al correo
  const handleCodeSubmit = async () => {
    if (!code) {
      alert("Por favor ingresa el código.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(import.meta.env.VITE_BACKEND_URL + "/verificar-codigo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, codigo: code }),
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok) {
        setIsCodeVerified(true); // ✅ Cambiamos a la vista de nueva contraseña
        setMessage(data.message);
        setError(null);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
      alert("Error al verificar el código.");
    }
  };

  // ✅ Cambiar contraseña
  const handleChangePassword = async () => {
    if (!newPassword || !confirmPassword) {
      alert("Por favor, completa ambos campos.");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(import.meta.env.VITE_BACKEND_URL + "/resetPassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, codigo: code, password: newPassword }),
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok) {
        alert("✅ " + data.message);
        setShowModal(false); // Cerramos modal
        setIsCodeVerified(false);
        setCode("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        alert("❌ " + data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
      alert("Error al cambiar la contraseña.");
    }
  };

  return (
    <div className="login-page-containre py-3 py-md-5">
      <div className="container text-center">
        <div className="row justify-content-md-center">
          {/* 📩 FORMULARIO */}
          <div className="px-0 col-12 col-sm-12 col-md-6 col-lg-4">
            <div className="d-flex flex-column gap-3 bg-white p-4 p-md-5 rounded shadow-sm h-100">
              <div className="text-center mb-4">
                <img src={LogoUrl} className="img-fluid w-75" alt="Mecánico" />
              </div>

              <h2 className="fs-6 fw-normal text-center text-secondary mb-4">
                Proporcione su correo electrónico para recuperar la contraseña.
              </h2>

              {message && <div className="alert alert-success">{message}</div>}
              {error && <div className="alert alert-danger">{error}</div>}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Correo electrónico"
                  />
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
                    {loading ? "Enviando..." : "Restablecer Contraseña"}
                  </button>
                </div>
              </form>

              <Link to="/" className="btn btn-secondary">
                Volver al inicio
              </Link>
            </div>
          </div>

          {/* 📸 IMAGEN */}
          <div className="col-12 col-md-6 col-lg-8 px-0">
            <img src={resetUrl} className="img-fluid rounded" alt="Mecánico" />
          </div>
        </div>
      </div>

      {/* ✅ MODAL MULTIFASE */}
      {showModal && (
        <>
          <div className="modal fade show d-block" tabIndex="-1">
            <div className="modal-dialog">
              <div className="modal-content">
                {/* HEADER */}
                <div className="modal-header">
                  <h5 className="modal-title">
                    {isCodeVerified ? "🔒 Cambiar Contraseña" : "✅ Correo enviado"}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>

                {/* BODY */}
                <div className="modal-body">
                  {!isCodeVerified ? (
                    <>
                      <p>Hemos enviado un código a tu correo. Por favor, ingrésalo aquí:</p>
                      <input
                        type="text"
                        className="form-control mt-3"
                        placeholder="Código de verificación"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                      />
                    </>
                  ) : (
                    <>
                      <p>Introduce tu nueva contraseña:</p>
                      <input
                        type="password"
                        className="form-control mt-3"
                        placeholder="Nueva contraseña"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                      <input
                        type="password"
                        className="form-control mt-3"
                        placeholder="Confirmar contraseña"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </>
                  )}
                </div>

                {/* FOOTER */}
                <div className="modal-footer">
                  {!isCodeVerified ? (
                    <>
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => setShowModal(false)}
                      >
                        Cerrar
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleCodeSubmit}
                        disabled={loading}
                      >
                        {loading ? "Verificando..." : "Verificar Código"}
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => setShowModal(false)}
                      >
                        Cancelar
                      </button>
                      <button
                        type="button"
                        className="btn btn-success"
                        onClick={handleChangePassword}
                        disabled={loading}
                      >
                        {loading ? "Guardando..." : "Cambiar Contraseña"}
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Fondo oscuro */}
          <div className="modal-backdrop fade show"></div>
        </>
      )}
    </div>
  );
};
