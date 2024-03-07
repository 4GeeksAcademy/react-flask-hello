import React, { useState, useEffect, useContext } from 'react';
import Logo from "../../img/logo.png";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { Context } from '../store/appContext';
import { toast } from 'react-toastify';
export const PasswordRestoration = () => {
    const { store, actions } = useContext(Context);
    const [newPassword, setNewPassword] = useState("");
    const [newConfirmedPassword, setConfirmedPassword] = useState("");
    const params = useParams();
    const navigate = useNavigate();
    const handlePWRestoration = async (e) => {
        e.preventDefault()
        if (newPassword == newConfirmedPassword) {
            let token = params.token;
            await actions.restorePassword(newConfirmedPassword, token);
            navigate("/")
        } else {
            toast.error("Both password must be the same.")
        }
    }
    return (
        <div className='d-flex flex-column justify-content-start align-items-center vh-100'>
            <form className='col-4 my-5 row gy-3' onSubmit={handlePWRestoration}>
                <h3>Restore your password!</h3>
                <div className="form-group">
                    <label htmlFor="newPWD">Enter your new password</label>
                    <input type="password" className="form-control" id="newPWD" aria-describedby="emailHelp" onChange={(e) => setNewPassword(e.target.value)} required />
                    <small id="pwdHelp" className="form-text text-muted">We won't tell anyone you are using the same password all along Internet.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPWD">Confirm password</label>
                    <input type="password" className="form-control" id="confirmPWD" onChange={(e) => setConfirmedPassword(e.target.value)} required />
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-300 to-be-hoved">Submit</button>
                </div>
            </form>
        </div>
    );
};