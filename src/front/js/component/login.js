import React, { useState, useContext } from 'react';
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
// import Background from "/workspaces/Rosas-Alonso-Rodriguez-Acu-a-y-Chaves-Proyecto-final/src/front/img/background.png";

const Login = () => {
    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="container p-5 bg-white shadow rounded" style={{ width: "550px" }}>
                    <h1 className="mb-4">Iniciar sesión</h1>
                    <div className="form-floating mb-3">
                        <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
                        <label htmlFor="floatingInput">EMAIL</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="password" className="form-control" id="floatingPassword" placeholder="Password" />
                        <label htmlFor="floatingPassword">CONTRASEÑA</label>
                    </div>
                    <Link to="/forgot-password" className="d-block mb-3">¿OLVIDÓ SU CONTRASEÑA?</Link>
                    <button className="btn btn-primary" style={{ width: "100%" }}>Iniciar sesión</button>
                    <p className="mt-3">¿NO TIENES UNA CUENTA? <Link to="/signup">REGÍSTRATE</Link></p>
                </div>
        </div>
    );
};

export default Login;
