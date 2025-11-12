import React, { useState, useEffect } from "react";
import "../styles/Form.css";
import { Link } from "react-router-dom";

const Form = ({ mode, onSubmit, successMessage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsn, setErrorMsn] = useState(null);

  useEffect(() => {
    if (successMessage) {
      setErrorMsn(successMessage);
    }
  }, [successMessage]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSubmit({ email, password, setErrorMsn });
      setEmail("");
      setPassword("");
    } catch (error) {
      setErrorMsn(error.message || "Error");
      console.error(error.message || "Error");
    }
  };

  return (
    <div className="container-fluid min-vh-100">
      <div className="row min-vh-100">
        <div className="col-lg-6 d-none d-lg-flex align-items-center justify-content-center p-0">
          <img
            src="https://res.cloudinary.com/dqstkdc6y/image/upload/v1762644212/unnamed_2_q3khjk.jpg"
            alt="Visual de login"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
        <div className="col-12 col-lg-6 d-flex align-items-center justify-content-center py-5 px-4">

          <div style={{ width: '100%', maxWidth: '450px' }}>

            <h2 className="mb-4 text-center">
              {mode === "register" ? "Registrarse" : "Iniciar Sesión"}
            </h2>

            <form onSubmit={handleSubmit}>

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

              {errorMsn && (
                <div className={`alert ${successMessage === errorMsn ? "alert-success" : "alert-danger"}`}>
                  {errorMsn}
                </div>
              )}

              <button type="submit" className="button w-100 mb-3">
                {mode === "register" ? "Registrarse" : "Iniciar Sesión"}
              </button>
              {mode === "login" && (
                <div className="text-center">
                  <Link to="/forgot-password" className="text-white">
                    ¿Olvidaste tu contraseña? Click aqui!
                  </Link>
                </div>
              )}

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;