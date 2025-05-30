import React, { useState, useEffect } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider.jsx";

export const AdminProfile = () => {
    const { store, dispatch } = useGlobalReducer()
    console.log(store);
    const auth = useAuth()

    useEffect(() => {
        auth.getProfile()
    }, [auth?.store?.access_token])

    return (
        <div className="container py-4">
            <div className="row justify-content-center">
                <div className="col-12 col-md-6 col-lg-5 mb-4 mb-md-0 d-flex flex-column justify-content-center align-items-center">
                    <h2 className="mb-4 text-center fs-2">Welcome Administrador! </h2>
                    <p className="fs-5">Correo: </p>
                </div>
            </div>
        </div>
    );
};