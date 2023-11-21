import React, {useContext} from 'react'
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/Registros.css";

const RegistroUsuario = () => {
  const navigate = useNavigate()
  const { store, actions } = useContext(Context);
  store.signup ? navigate('/iniciarsesion') : null
  const handleChangeSignIn =(e)=>{
    actions.handleChange(e, "signup")
  }
  return (
    <div>
    <div
      className=" RegistroUsuarioDiv container d-flex justify-content-center align-items-center"
      style={{
        height: "32rem",
      }}
    >
      <form noValidate onSubmit={e=>{e.preventDefault(); actions.signUpUser(), e.target.reset()}}>
        <h2 className="tituloRegistro mb-4">Registrar Usuario</h2>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">
            Nombre
          </label>
          <input
            name='name'
            type="name"
            class="form-control"
            id="exampleInputEmail1"
            placeholder="Ingrese su Nombre"
            onChange={handleChangeSignIn}
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">
            Apellido
          </label>
          <input
            name="last_name"
            type="lastName"
            class="form-control"
            id="exampleInputEmail1"
            placeholder="Ingrese su Apellido"
            onChange={handleChangeSignIn}
          />
        </div>

        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">
            Correo
          </label>
          <input
            name='email'
            type="email"
            class="form-control"
            id="exampleInputPassword1"
            placeholder="Ingrese su correo"
            onChange={handleChangeSignIn}
          />
        </div>

        <div class="mb-4">
          <label for="exampleInputPassword1" class="form-label">
            Contraseña
          </label>
          <input
            name='password'
            type="password"
            class="form-control"
            id="exampleInputPassword1"
            placeholder="Ingrese una contraseña"
            onChange={handleChangeSignIn}
          />
        </div>
        <button type="submit" class="btn btn-primary">
          Registrarse
        </button>
      </form>
    </div>
    <div id="customAlertSignUp" class="alertMissing container justify-content-center align-items-center"></div>
    </div>
  );
};

export default RegistroUsuario;
