import React, { useState, useEffect } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider.jsx";

export const AdminProfile = () => {
    const [data, setData] = useState([])
    const { store, dispatch } = useGlobalReducer()
    const auth = useAuth()
    const token = sessionStorage.getItem('access_token')

    console.log(store);

    useEffect(() => {
        auth.getProfile()
    }, [auth?.store?.access_token])

    useEffect(() => {
        const admin = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/admin/profile`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                })

                const dataResponse = await response.json()

                if (response.ok) {
                    setData(dataResponse)
                }

            } catch (error) {
                console.log(error);
            }
        }

        admin()
    }, [])
    console.log(data);

    return (
        <div className="container py-4">
            <div className="row justify-content-center">
                <div className="col-12 col-md-6 col-lg-5 mb-4 mb-md-0 d-flex flex-column justify-content-center align-items-center">
                    <h2 className="mb-4 text-center fs-2">Welcome Administrador {data.first_name} {data.last_name}!</h2>
                    <p className="fs-5">Correo: {data.email} </p>
                </div>
            </div>
        </div>
    );
};