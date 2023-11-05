import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Context } from "../store/appContext";

export const PerfilOrganizador = () => {
    const { store, actions } = useContext(Context);
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate()

    //cuando cargue llamamos a getuserinfo y enviamos la data al userData
    useEffect(()=>{
      console.log(store.accessToken)
      if ((store.accessToken)){
        actions.getUserInfo().then(data=>setUserData(data))
      } else {
        navigate("/cuenta")
      }
    }, [store.accessToken])

    return (
      <div className="contSuperior container bg-white border rounded-5">
      <div className="justify-content-center">
        <div className="contOrganiza container">
        <ul className="nav nav-pills nav-justified" id="ex1" role="tablist">
          <li className="nav-item" role="presentation">
            <a className="nav-link active" id="tab-login" data-mdb-toggle="pill" href="#pills-login" role="tab"
              aria-controls="pills-login" aria-selected="true">Perfil</a>
          </li>
          <li className="nav-item" role="presentation">
            <a className="nav-link" id="tab-register" data-mdb-toggle="pill" href="#pills-register" role="tab"
              aria-controls="pills-register" aria-selected="false">Eventos</a>
          </li>
        </ul>

        <div className="taborganiza tab-content">
          <div className="tab-pane fade show active" id="pills-login" role="tabpanel" aria-labelledby="tab-login">
            <form className="formPerfil">
              <div className="form-group">
                <label htmlFor="inputName">Nombre</label>
                <input type="text" className="form-control" id="inputName" value="Nombre"></input>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="inputEmail4">Email</label>
                  <input type="email" className="form-control" id="inputEmail4" value="Email"></input>
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="inputPassword4">Password</label>
                  <input type="password" className="form-control" id="inputPassword4" value="Password"></input>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="inputAddress">Dirección</label>
                  <input type="text" className="form-control" id="inputAddress" value="1234 Main St"></input>
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="inputTel">Teléfono</label>
                  <input type="password" className="form-control" id="inputTel" value="Tel"></input>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="inputCity">Ciudad</label>
                  <input type="text" className="form-control" id="inputCity" value="Ciudad"></input>
                </div>
                <div className="form-group col-md-4">
                  <label htmlFor="inputState">Estado</label>
                  <input type="text" className="form-control" id="inputState" value="Estado"></input>
                </div>
                <div className="form-group col-md-2">
                  <label htmlFor="inputZip">C.P.</label>
                  <input type="text" className="form-control" id="inputZip" value="CP"></input>
                </div>
              </div>
              <div className="form-row">
                <fieldset disabled>
                  <div className="form-group col-md-4">
                    <label htmlFor="inputCreados">Eventos Creados</label>
                    <input type="text" className="form-control" id="inputCreados" value="0"></input>
                  </div>
                  <div className="form-group col-md-4">
                    <label htmlFor="inputAbiertos">Eventos Abiertos</label>
                    <input type="text" className="form-control" id="inputAbiertos" value="0"></input>
                  </div>
                  <div className="form-group col-md-4">
                    <label htmlFor="inputCerrados">Eventos Cerrados</label>
                    <input type="text" className="form-control" id="inputCerrados" value="0"></input>
                  </div>
                </fieldset>
              </div>
              <button type="submit" className="btn btn-primary btn-block mb-4">Grabar</button>
            </form>
          </div>

          <div className="tab-pane fade" id="pills-register" role="tabpanel" aria-labelledby="tab-register">
            <form>

            </form>
          </div>
        </div>
        </div>
        </div>

      </div>
);
}
export default PerfilOrganizador;