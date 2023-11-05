import React from "react";

const ResetPass = () => {
    return(
      <div className="container">
        <a href="" data-bs-toggle="modal" data-bs-target="#exampleModal">
          Recuperar contraseña
        </a>
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Recuperar Contraseña</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <div className="col-md-12">
                  <div className="panel panel-default">
                      <div className="panel-body">
                          <div className="text-center">
                            <p>Escribe tu correo y te enviaremos tu contraseña.</p>
                              <div className="panel-body">
                                  <fieldset>
                                      <div className="form-group">
                                          <input className="form-control input-lg" placeholder="E-mail" name="email" type="email"></input>
                                      </div>
                                      <input className="btn btn-lg btn-outline-primary btn-block mt-3" value="Enviar Contraseña" type="submit"></input>
                                  </fieldset>
                              </div>
                          </div>
                      </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}
export default ResetPass;