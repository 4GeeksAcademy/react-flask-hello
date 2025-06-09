import React, { useState, useEffect } from "react"
import { useAuth } from "../context/AuthProvider.jsx";

export const AdminProfile = () => {
    const { store, getProfile } = useAuth();
    useEffect(() => {
        if (!store.user || !store.user.profile) {
            getProfile();
        }
    }, [])

    if (!store.user || !store.user.profile) {
        return (
            <div className="spinner-border position-absolute top-50 start-50 translate-middle" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        );
    }

    const { first_name, last_name, email } = store.user.profile;

    return (
        <div className="container py-4 my-5">
            <div className="row justify-content-center">
                <div className="col-12 col-md-6 col-lg-5 mb-4 mb-md-0 d-flex flex-column justify-content-center align-items-center">
                    <h2 className="mb-4 text-center fs-2">Administrador: {first_name} {last_name}</h2>
                    <p className="fs-5">Correo: {email} </p>
                </div>
            </div>
        </div>
    );
};