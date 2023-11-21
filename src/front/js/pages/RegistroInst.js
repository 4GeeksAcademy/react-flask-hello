import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/Registros.css";

const RegistroInst = () => {
  const navigate = useNavigate()
  const { store, actions } = useContext(Context);
  store.insSignup ? navigate('/iniciarsesion_institucion') : null
  const handleChangeSignInInstitution = (e) => {
    actions.handleChange(e, "insSignup")
  }
  return (
    <div>
    <div
      className=" RegistroUsuarioDiv container d-flex justify-content-center align-items-center"
      style={{
        height: "30rem",
      }}
    >
      <form noValidate onSubmit={e=>{e.preventDefault(); actions.signUpInstitution(), e.target.reset()}}>
        <h2 className="tituloRegistro mb-4">Registrar Institución</h2>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Nombre
          </label>
          <input
            name='institutional_name'
            type="name"
            className="form-control"
            id="exampleInputEmail1"
            placeholder="Nombre de la Institución"
            onChange={handleChangeSignInInstitution}
          />
        </div>

        <div class="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Correo Institucional
          </label>
          <input
            name='email'
            type="email"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Ingrese correo Institucional"
            onChange={handleChangeSignInInstitution}

          />
        </div>

        <div class="mb-4">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Contraseña
          </label>
          <input
            name='password'
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Ingrese una contraseña"
            onChange={handleChangeSignInInstitution}

          />
        </div>
        <button type="submit" class="btn btn-primary">
          Registrarse
        </button>
      </form>
    </div>
    <div id="customAlertLogInInst" class="alertMissing container justify-content-center align-items-center"></div>
    </div>
  );
};

export default RegistroInst;
