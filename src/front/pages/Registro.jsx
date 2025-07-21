import React from "react";
import { Link } from "react-router-dom";

 export const Registro = () => {
  /*const {form,setform}=useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""})
  }*/
  return (
    <div>
      <h1 className="text-center mb-5">¡Bienvenido a PatitasClub!</h1>

      <form>
        <div className="mb-3 text-center">
          <label htmlFor="username">Nombre de usuario:</label>
          <input className="form-control" type="text" id="username" name="username" required />
        </div>
        <div className="mb-3 text-center">
          <label htmlFor="email">Correo electrónico:</label>
          <input className="form-control" type="email" id="email" name="email" required />
        </div>
        <div className="mb-3 text-center">
          <label htmlFor="password">Contraseña:</label>
          <input className="form-control" type="password" id="password" name="password" required />
        </div>
        <div className="mb-3 text-center">
          <label htmlFor="confirm-password">Confirmar contraseña:</label>
          <input className="form-control" type="password" id="confirm-password" name="confirm-password" required />
        </div>
        <div className="text-center">
          <button className="btn btn-primary mt-2" type="submit">Registrarse</button>
        </div>
      </form>
      <p className="text-center mt-3">
        ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión aquí</Link>
      </p>
      <p className="text-center mb-1">
        <Link to="/">Volver a la página principal</Link>
      </p>
    </div>
  );
};


