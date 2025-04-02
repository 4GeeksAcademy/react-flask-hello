import React from "react";
import FormularioLogin from "../components/FormularioLogin"; 

const Login = () => {
  return (
    <div style={{ backgroundColor: "#CAD2C5", minHeight: "100vh" }}> {/* ← Fondo aplicado aquí */}
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg p-3" style={{ backgroundColor: "#354F52" }}>
        <div className="container">
          <a className="navbar-brand text-white" href="#">Flow</a>
        </div>
      </nav>

      {/* Contenido */}
      <div className="container mt-5">
        <div className="row">
          {/* Tarjeta de Bienvenida */}
          <div className="col-md-6">
            <div className="card p-4" style={{ backgroundColor: "#52796F", borderRadius: "15px", color: "#1C1C1C" }}>
              <h2 className="text-center">Bienvenido</h2>
              <p className="text-center">Ingrese sus datos para registrarse en el sistema.</p>
            </div>
          </div>

          {/* Formulario de Inicio de Sesión */}
          <div className="col-md-6">
            <FormularioLogin />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;