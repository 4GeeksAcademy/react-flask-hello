// filepath: /workspaces/PatitasClub/src/front/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";

export const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        // Intenta obtener el token del localStorage (ajusta según tu lógica)
        const token = localStorage.getItem("token");
        if (!token) {
            setError("No se encontró el token de autenticación.");
            return;
        }

        // Llama al backend para obtener la info del usuario
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
        <div>
            <h1>Bienvenido al Dashboard</h1>
            <p>Este es tu panel de control donde puedes ver tus datos y administrar tu cuenta.</p>
            {error && <div className="alert alert-danger">{error}</div>}
            {user ? (
                <div>
                    <h3>Información personal:</h3>
                    <ul>
                        <li><strong>Nombre:</strong> {user.name}</li>
                        <li><strong>Email:</strong> {user.email}</li>
                        {/* Agrega más campos si tu modelo de usuario los tiene */}
                    </ul>
                </div>
            ) : (
                !error && <p>Cargando información...</p>
            )}
        </div>
    );
}