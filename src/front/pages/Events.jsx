import React, { useState, useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { Link } from "react-router-dom";

export const Events = () => {
    const { store } = useGlobalReducer();
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        const fetchEvents = async () => {
            setLoading(true);
            setError(null);
            if (!backendUrl) {
                setError("Error: La URL del backend no está configurada.");
                setLoading(false);
                return;
            }
            try {
                const response = await fetch(`${backendUrl}/api/events`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    }
                });
                const data = await response.json();
                if (response.ok) {
                    setEvents(data);
                } else {
                    setError(`Error al cargar eventos: ${data.message || response.statusText}`);
                }
            } catch (err) {
                console.error("Error de conexión al cargar eventos:", err);
                setError("Hubo un problema al conectar con el servidor.");
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, [backendUrl]);

    if (loading) {
        return <div className="text-center mt-5 text-white">Cargando eventos...</div>;
    }

    if (error) {
        return <div className="alert alert-danger text-center mt-5">{error}</div>;
    }

    if (events.length === 0) {
        return <div className="text-center mt-5 text-white">No hay eventos disponibles.</div>;
    }

    return (
        <div className="container py-5 p-1">
            <h2 className="titulos display-4 text-center fw-bold text-white mb-5">Eventos</h2>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                {events.map((event, index) => (
                    <div className="col" key={event.id || index}>
                        <Link to={`/events/${event.id}`} className="text-decoration-none">
                            <div
                                className="card h-100 card-link card-bg"
                                style={{ backgroundImage: `url('https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')` }}
                            >
                                <div className="card-body d-flex flex-column justify-content-end">
                                    <h5 className="card-title fw-bold">{event.title}</h5>
                                    <p className="card-text small text-white-50">{event.date} - {event.location}</p>
                                    <p className="card-text small">{event.description ? event.description.substring(0, 100) + '...' : ''}</p>
                                    {event.artist_id && <p className="card-text small">Artista ID: {event.artist_id}</p>}
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};