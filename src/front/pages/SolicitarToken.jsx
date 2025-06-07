import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SolicitarToken = () => {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();

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
        setShowConfirmation(true);
      } else {
        setMsg(data.error || data.msg);
      }

    } catch (error) {
      console.error("Error en la solicitud:", error);
      setMsg("Error en la conexión con el servidor.");
    }
  };

  return (
    <div className="background-container">
      {showConfirmation ? (
        <div className='login-signup-form position-absolute top-50 start-50 translate-middle border rounded-3 p-4'>
          <div className='text-center'>
            <i className="ri-checkbox-circle-line text-success fs-1 mb-3"></i>
            <h2 className='mb-3'>¡Correo Enviado!</h2>
            <div className='d-flex flex-column gap-2'>
              <p className='mb-0'>Se ha enviado un correo con las instrucciones para restablecer tu contraseña.</p>
              <p className='text-muted small'>Por favor, revisa tu bandeja de entrada.</p>
            </div>
            <Link
              to="/"
              className='btn btn-dark mt-4'
            >
              Volver
            </Link>
          </div>
        </div>
      ) : (
        <div className="login-signup-form position-absolute top-50 start-50 translate-middle border rounded-3 p-3 p-md-4">
          <h2 className="text-center mb-4">Recupera tu cuenta</h2>
          <form onSubmit={handleSubmit} className="px-2">
            <div className="mb-4">
              <label className="form-label mb-2">Introduce tu correo electrónico para reestablecer tu contraseña.</label>
              <input
                type="email"
                className="form-control py-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Correo electrónico"
                required
              />
            </div>
            {msg && (
              <div className="alert alert-danger d-flex justify-content-center align-items-center py-1 mb-3 gap-2" role="alert">
                <i className="ri-error-warning-line"></i>
                <div>{msg}</div>
              </div>
            )}
            <div className="d-flex gap-3 justify-content-end flex-row mt-4">
              <Link to="/" className="btn btn-secondary w-25">
                Cancelar
              </Link>
              <button type="submit" className="btn btn-dark w-25">
                Enviar
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default SolicitarToken;
