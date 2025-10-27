import React from "react";
import { Link } from "react-router-dom";
import "./Register.css";

export const Register = () => {
  return (
    <>
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <div className="card p-4 shadow-lg" style={{ width: "40rem" }}>
          <h3 className="text-center mb-3">Crear Cuenta</h3>

          <form>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email 
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="tuemail@ejemplo.com"
                required
                style={{ borderColor: "#a00" }}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Contraseña
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="contraseña"
                required
                style={{ borderColor: "#a00" }}
              />
            </div>
            

            <button type="submit" className="btn btn-danger w-100">
              Crear cuenta
            </button>
            
          </form>

         
        </div>
      </div>
    </>
  );
};
