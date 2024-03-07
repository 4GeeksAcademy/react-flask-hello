import React, { useState, useEffect, useContext } from "react";;
import { Context } from "../store/appContext";
import { useNavigate } from 'react-router-dom';

export const LogoutModal = props => {

	const { store, actions } = useContext(Context);
	const navigate = useNavigate();

	function logOut() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("email");
        localStorage.removeItem("id");
        store.auth = false;
        store.infoUser = []
        navigate("/")
        props.onClose(); // Cierra el modal
      }

	return (


			<div className="modal" tabIndex="-1" role="dialog" style={{ display: props.show ? "inline-block" : "none", cursor: "pointer" }}>
				<div className="modal-dialog" role="document">
					<div className="modal-content">
						<div className="modal-header bg-100 px-5">
							<h4 className="modal-title">Are you sure to log out?</h4>
                        </div>
                        <div className="modal-body w-100 px-5 d-flex flex-column align-items-center">
                            <button className="btn btn-300 to-be-hoved text-white mb-2 rounded col-4" onClick={logOut}>YES</button>
                            <button className="btn btn-300 to-be-hoved text-white rounded col-4" onClick={() => props.onClose()}>NO</button>
                        </div>
					</div>
                </div>
            </div>
	);
};