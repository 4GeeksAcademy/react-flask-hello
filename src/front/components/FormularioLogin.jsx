import React from "react";

const FormularioLogin = () => {
  return (
    <div className="card p-4" style={{ backgroundColor: "#52796F" }}>
      <h3 className="text-center">Inicio de sesión</h3>
      <form id="registerForm">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Usuario:</label>
          <input type="text" className="form-control" id="name" required />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Contraseña:</label>
          <input type="password" className="form-control" id="password" required />
        </div>
        <button type="submit" className="btn btn-primary w-100" style={{ backgroundColor: "rgba(121, 185, 135, 0.7)", border: "none" }}>
          Iniciar sesión
        </button>
      </form>
    </div>
  );
};

export default FormularioLogin;