import { Link } from "react-router-dom";
import React from "react";

export const Login = () => {
  return (
    <div>
      <h1 className="text-center mb-5">¡Bienvenido a PatitasClub!</h1>

      <form>
        <div className="mb-3 text-center">
          <label htmlFor="username">Nombre de usuario:</label>
          <input className="form-control" type="text" id="username" name="username" required />
        </div>
        <div className="mb-3 text-center">
          <label htmlFor="password">Contraseña:</label>
          <input className="form-control" type="password" id="password" name="password" required />
        </div>
        <div className="text-center">
          <button className="btn btn-primary mt-2" type="submit">Iniciar sesión</button>
        </div>
      </form>
      <p className="text-center mt-3">
        ¿No tienes una cuenta? <Link to="/registro">Regístrate aquí</Link>
      </p>
      <p className="text-center mb-1">
        <Link to="/">Volver a la página principal</Link>
      </p>
    </div>
  );
}