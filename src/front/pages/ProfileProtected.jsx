import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const API_URL = import.meta.env.VITE_BACKEND_URL; // ✅ URL del backend desde .env

const ProfileProtected = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }

        // TODO: Activar este bloque cuando el backend tenga JWT y rutas protegidas
        /*
        const fetchUserData = async () => {
            try {
                const response = await fetch(`${API_URL}/api/user-data`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setUserData(data);
                } else {
                    console.error("Token inválido o expirado");
                    navigate("/login");
                }
            } catch (err) {
                console.error("Error al conectar con backend:", err.message);
            }
        };

        fetchUserData();
        */
    }, []);

    return (
        <div>
            <Navbar />
            <h2>Perfil protegido</h2>
            {userData ? (
                <pre>{JSON.stringify(userData, null, 2)}</pre>
            ) : (
                <p>Cargando datos del usuario...</p>
            )}
        </div>
    );
};

export default ProfileProtected;
