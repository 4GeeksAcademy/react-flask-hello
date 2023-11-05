import React, { useContext } from 'react';
import { Context } from "../store/appContext";

const Mensajes = () => {

  const {store, actions} = useContext(Context);
  const [modalmsje] = store.modalmsje;

    return(
      <div className="container">
        <a href="" data-bs-toggle="modal" data-bs-target="#exampleModal">
          {modalmsje.boton}
        </a>
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">{modalmsje.header}</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                {modalmsje.body}
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
export default Mensajes;