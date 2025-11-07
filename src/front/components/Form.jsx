import React, { useState, useEffect } from "react";

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
    <div className="form container mt-5">
      <div className="row justify-content-end">
        <div className="col-12 col-sm-10 col-md-8 col-lg-5 col-xl-4">
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

            <button type="submit" className="button btn btn-primary w-100">
              {mode === "register" ? "Registrarse" : "Iniciar Sesión"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;