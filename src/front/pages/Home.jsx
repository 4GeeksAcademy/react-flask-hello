import imagenBack from "../assets/fondo-Rock.jpg";
import React, { useState, useEffect } from 'react';
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Home = () => {
    const { store, dispatch } = useGlobalReducer();
    const [events, setEvents] = useState([]);
    const [loadingEvents, setLoadingEvents] = useState(true);
    const [errorEvents, setErrorEvents] = useState(null);
    const [loadingMessage, setLoadingMessage] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const loadMessage = async () => {
        setLoadingMessage(true);
        setErrorMessage(null);
        if (!backendUrl) {
            setErrorMessage("Error: La URL del backend no está configurada.");
            setLoadingMessage(false);
            return;
        }
        try {
            const response = await fetch(`${backendUrl}/api/hello`, {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            });
            const data = await response.json();
            if (response.ok) {
                dispatch({ type: "set_hello", payload: data.message });
            } else {
                setErrorMessage(`Error al cargar el mensaje: ${data.message || response.statusText}`);
            }
        } catch (error) {
            console.error("Error de conexión al cargar mensaje:", error);
            setErrorMessage("Hubo un problema al conectar con el backend para el mensaje.");
        } finally {
            setLoadingMessage(false);
        }
    };

    const fetchEvents = async () => {
        setLoadingEvents(true);
        setErrorEvents(null);
        if (!backendUrl) {
            setErrorEvents("Error: La URL del backend no está configurada.");
            setLoadingEvents(false);
            return;
        }
        try {
            const response = await fetch(`${backendUrl}/api/events`, {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            });
            const data = await response.json();
            if (response.ok) {
                setEvents(data);
            } else {
                setErrorEvents(`Error al cargar eventos: ${data.message || response.statusText}`);
            }
        } catch (err) {
            console.error("Error de conexión al cargar eventos:", err);
            setErrorEvents("Hubo un problema al conectar con el backend para los eventos.");
        } finally {
            setLoadingEvents(false);
        }
    };

    useEffect(() => {
        loadMessage();
        fetchEvents();
    }, [backendUrl, dispatch]);

    const cards = [
        {
            title: 'Card 1',
            text: 'Imagen de fondo #1',
            image: 'https://images.pexels.com/photos/1694908/pexels-photo-1694908.jpeg',
            link: '#',
        },
        {
            title: 'Card 2',
            text: 'Imagen de fondo #2',
            image: 'https://images.pexels.com/photos/1649691/pexels-photo-1649691.jpeg',
            link: '#',
        },
        {
            title: 'Card 3',
            text: 'Imagen de fondo #3',
            image: 'https://images.pexels.com/photos/743715/pexels-photo-743715.jpeg',
            link: '#',
        },
        {
            title: 'Card 4',
            text: 'Imagen de fondo #4',
            image: 'https://images.pexels.com/photos/2240763/pexels-photo-2240763.jpeg',
            link: '#',
        },
        {
            title: 'Card 5',
            text: 'Imagen de fondo #5',
            image: 'https://images.pexels.com/photos/3682820/pexels-photo-3682820.jpeg',
            link: '#',
        },

    ];


    return (
        <div className="home-page-container">
            <div className="imagen-background">
                <img src={imagenBack} alt="imagen fondo" />
            </div>
            <div className="container py-5 p-1">
                <h2 className="titulos display-4 text-center fw-bold text-white mb-3">Festquila Dashboard</h2>
                <div className="alert alert-info text-center">
                    {loadingMessage ? (
                        <span>Cargando mensaje del backend...</span>
                    ) : errorMessage ? (
                        <span className="text-danger">Error: {errorMessage}</span>
                    ) : store.message ? (
                        <span>{store.message}</span>
                    ) : (
                        <span>No hay mensaje del backend.</span>
                    )}
                </div>

                <h2 className="titulos display-4 text-center fw-bold text-white mt-5 mb-5">Próximos Eventos</h2>
                {loadingEvents ? (
                    <div className="text-center text-white">Cargando eventos...</div>
                ) : errorEvents ? (
                    <div className="alert alert-danger text-center mt-5">{errorEvents}</div>
                ) : events.length === 0 ? (
                    <div className="text-center text-white">No hay eventos disponibles. ¡Crea uno!</div>
                ) : (
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                        {events.map((event, index) => (
                            <div className="col" key={event.id || index}>
                                <a href={`/events/${event.id}`} className="text-decoration-none">
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
                                </a>
                            </div>
                        ))}
                    </div>
                )}

                <h2 className="titulos display-4 text-center fw-bold text-white mt-5 mb-5">Nuestra Galería</h2>
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-4">
                    {cards.map((card, index) => (
                        <div className="col" key={`static-${index}`}>
                            <a href={card.link} className="text-decoration-none">
                                <div
                                    className="card h-100 card-link card-bg"
                                    style={{ backgroundImage: `url(${card.image})` }}
                                >
                                    <div className="card-body">
                                        <h5 className="card-title">{card.title}</h5>
                                        <p className="card-text">{card.text}</p>
                                    </div>
                                </div>
                            </a>
                        </div>
                    ))}
                </div>

                <div id="carouselExampleFade" className="carousel slide carousel-fade py-4" data-bs-ride="carousel">
                    <h2 className="titulos display-4 text-center fw-bold text-white">Momentos Destacados</h2>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src="https://images.pexels.com/photos/7502588/pexels-photo-7502588.jpeg" className="d-block w-100" alt="Imagen 1" />
                        </div>
                        <div className="carousel-item">
                            <img src="https://images.pexels.com/photos/167638/pexels-photo-167638.jpeg" className="d-block w-100" alt="Imagen 2" />
                        </div>
                        <div className="carousel-item">
                            <img src="https://images.pexels.com/photos/2263436/pexels-photo-2263436.jpeg" className="d-block w-100" alt="Imagen 3" />
                        </div>
                    </div>

                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Anterior</span>
                    </button>

                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Siguiente</span>
                    </button>
                    <p className="titulos text-center py-2 text-white">MIRA LAS EXPERIENCIAS VIVIDAS EN NUESTROS EVENTOS</p>
                </div>
            </div>
        </div>
    );
};