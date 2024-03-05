import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const PasswordRecoveryModal = props => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [email, setEmail] = useState("");

    const handlePWRecovery = async (e) => {
        e.preventDefault()
        let sentEmail = await actions.sendEmail(email);
        if (sentEmail == true) {
            props.onClose()
        }
    }

    function closeRecovery() {
        setEmail("");
        props.onClose()
    }


    return (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: props.show ? "inline-block" : "none", cursor: "pointer" }}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header bg-100 d-flex flex-column px-5">
                        <h4 className="modal-title">Recuperación de contraseña</h4>
                    </div>
                    <div className="modal-body w-100 px-5">
                        <form className="d-flex flex-column justify-content-center align-items-center w-100 row gy-3" onSubmit={handlePWRecovery}>
                            <p>Si has olvidado tu contraseña, introduce tu email y te mandaremos un email con un enlace para recuperarla.</p>
                            <div className="form-group d-flex flex-column justify-content-center align-items-center w-100 m-0">
                                <label className="d-flex justify-content-start w-100">Correo electrónico</label>
                                <input
                                    value={email}
                                    className="w-100 rounded-3"
                                    type="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn-300 to-be-hoved form-control w-50 my-3">
                                Recuperar contraseña
                            </button>
                            <button type="button" className="btn-300 to-be-hoved form-control w-50 my-3" onClick={() => closeRecovery()}>
                                Cancelar
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
