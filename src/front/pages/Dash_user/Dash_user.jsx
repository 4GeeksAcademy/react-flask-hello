import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dash_user = () => {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('user_id');

            if (!token || !userId) {
                setError("Usuario no autenticado");
                return;
            }

            try {
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/user/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setUserData(res.data);
            } catch (err) {
                console.error('Error fetching user:', err);
                setError("No se pudo obtener el usuario");
            }
        };

        fetchUser();
    }, []);

    if (error) return <div className="text-red-600 p-4">{error}</div>;
    if (!userData) return <div className="p-4">Cargando usuario...</div>;

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Dashboard de Usuario</h2>
            <p><strong>ID:</strong> {userData.id}</p>
            <p><strong>Nombre:</strong> {userData.name}</p>
            <p><strong>Email:</strong> {userData.email}</p>
        </div>
    );
};

export default Dash_user;
