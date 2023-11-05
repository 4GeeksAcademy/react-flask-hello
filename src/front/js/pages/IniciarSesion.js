import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/Registros.css";

const IniciarSesion = () => {
  const navigate = useNavigate()
  const { store, actions } = useContext(Context);
  const handleChangeLogin = (e) => {
    actions.handleChange(e, "login")
  }
  store.isloged ? navigate('/') : null
  return (
    <div>
      <div
        className=" RegistroUsuarioDiv container d-flex justify-content-center align-items-center"
        style={{
          height: "24rem",
        }}
      >
        <form noValidate onSubmit={e => { e.preventDefault(); actions.logInUser() }}>
          <h2 className="tituloRegistro mb-4">Iniciar Sesión</h2>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">
              Correo
            </label>
            <input
              name="email"
              type="email"
              class="form-control"
              id="exampleInputPassword1"
              placeholder="Ingrese su correo"
              onChange={handleChangeLogin}
            />
          </div>

          <div class="mb-4">
            <label for="exampleInputPassword1" class="form-label">
              Contraseña
            </label>
            <input
              name="password"
              type="password"
              class="form-control"
              id="exampleInputPassword1"
              placeholder="Ingrese su contraseña"
              onChange={handleChangeLogin}
            />
          </div>
          <button type="submit" class="btn btn-primary">
            Iniciar Sesión
          </button>
        </form>
      </div>
      <div id="customAlertLogIn" class="alertMissing container justify-content-center align-items-center"></div>
    </div>
  );
};

export default IniciarSesion;
