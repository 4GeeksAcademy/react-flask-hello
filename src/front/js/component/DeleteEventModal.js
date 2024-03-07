import React, { useState, useEffect, useContext } from "react";;
import { Context } from "../store/appContext";
import { useNavigate } from 'react-router-dom';

export const DeleteEventModal = props => {

	const { store, actions } = useContext(Context);
	const navigate = useNavigate();

	async function deleteEvent() {
        await actions.eliminarEvento(props.id_evento);
        props.onClose(); // Cierra el modal
        navigate('/');
      }

	return (


			<div className="modal" tabIndex="-1" role="dialog" style={{ display: props.show ? "inline-block" : "none", cursor: "pointer" }}>
				<div className="modal-dialog" role="document">
					<div className="modal-content">
						<div className="modal-header bg-100 d-flex flex-column px-5">
							<h4 className="modal-title">Are you sure to delete the event?</h4>
                            <button className="btn btn-300 to-be-hoved text-white my-2 rounded col-12 col-md-4" onClick={deleteEvent}>YES</button>
                            <button className="btn btn-300 to-be-hoved text-white rounded col-12 col-md-4" onClick={() => props.onClose()}>NO</button>
						</div>
                    </div>
                </div>
            </div>
	);
};
