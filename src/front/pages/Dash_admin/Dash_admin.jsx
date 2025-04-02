import React, { useEffect, useState } from "react";
import axios from "axios";

const Dash_admin = () => {
    const [adminData, setAdminData] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchAdmin = async () => {
            const token = localStorage.getItem("token");
            const userId = localStorage.getItem("user_id");

            if (!token || !userId) {
                setError("No autenticado");
                return;
            }

            try {
                const res = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}/user/user/${userId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setAdminData(res.data);
            } catch (err) {
                console.error("Error al obtener datos del admin:", err);
                setError("No se pudo cargar la información del administrador.");
            }
        };

        fetchAdmin();
    }, []);

    if (error) return <div className="p-4 text-red-600">{error}</div>;
    if (!adminData) return <div className="p-4">Cargando datos del administrador...</div>;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Panel de Administrador</h2>
            <div className="space-y-2">
                <p><strong>ID:</strong> {adminData.id}</p>
                <p><strong>Nombre:</strong> {adminData.name}</p>
                <p><strong>Email:</strong> {adminData.email}</p>
                <p><strong>Rol:</strong> {adminData.rolId === 1 ? "Administrador" : "Otro"}</p>
            </div>
        </div>
    );
};

export default Dash_admin;
