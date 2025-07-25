import React, { useEffect, useState } from "react";

export const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            setError("No se encontró el token de autenticación.");
            return;
        }
        fetch(`${import.meta.env.VITE_BACKEND_URL}api/private-hello`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
            .then(resp => resp.json())
            .then(data => {
                if (data.user) {
                    setUser(data.user);
                } else {
                    setError(data.message || "No se pudo obtener la información del usuario.");
                }
            })
            .catch(() => setError("Error al conectar con el servidor."));
    }, []);

    return (
        <div className="container1 d-flex justify-content-start align-items-center flex-column">
            <h1 className="title2 mt-1">Bienvenido al Dashboard</h1>
            {error && <div className="alert alert-danger">{error}</div>}
            {user ? (
                <div>
                    
                    <h3 className="title2 mt-3">Información personal:</h3>
                    <ul>
                        <li className="fs-5"><strong>Nombre:</strong> {user.name}</li>
                        <li className="fs-5"><strong>Email:</strong> {user.email}</li>
                    </ul>
                </div>
            ) : (
                !error && <p>Cargando información...</p>
            )}
        </div>
    );
}