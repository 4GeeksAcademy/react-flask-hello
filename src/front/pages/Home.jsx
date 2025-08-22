import imagenBack from "../assets/fondo-Rock.jpg";
import React, { useState, useEffect } from 'react';
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Home = () => {
    const { store, dispatch } = useGlobalReducer();
    const [events, setEvents] = useState([]);
    const [loadingEvents, setLoadingEvents] = useState(true);
    const [errorEvents, setErrorEvents] = useState(null);
    const [selectedCard, setSelectedCard] = useState(null);
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

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
        fetchEvents();
    }, [backendUrl, dispatch]);


    const cards2 = [
        {
            title: 'Dj Paco',
            text: 'Entrada desde: € 50',
            image: 'https://images.pexels.com/photos/668278/pexels-photo-668278.jpeg',
            description: 'https://images.pexels.com/photos/668278/pexels-photo-668278.jpeg',
        },
        {
            title: 'Conciertos',
            text: 'Entrada desde: 70€',
            image: 'https://images.pexels.com/photos/849/people-festival-party-dancing.jpg',
            description: 'https://images.pexels.com/photos/849/people-festival-party-dancing.jpg'
        },
        {
            title: 'Rock',
            text: 'Entrada desde: 70€',
            image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg',
            description: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg'
        },
        {
            title: 'Reggaeton Fest',
            text: 'Entrada desde: 70€',
            image: 'https://images.pexels.com/photos/1179581/pexels-photo-1179581.jpeg',
            description: 'https://images.pexels.com/photos/1179581/pexels-photo-1179581.jpeg'
        },
    ];


    return (
        <div className="home-page-container">
            <div className="imagen-background">
                <img src={imagenBack} alt="imagen fondo" />
            </div>
            <div className="container py-5 p-1">
                <h2 className="titulos display-4 text-center fw-bold">Proximos Eventos</h2>
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-4 mt-1 justify-content-center align-items-center">
                    {events.map((card, index) => (
                        <div className="col" key={`static-${index}`}>
                            <button type="button" className="btn border-0 bg-transparent w-100" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={() => setSelectedCard(card)}>
                                <div className="card text-white card-overlay h-100 border-0 position-relative overflow-hidden card-home">
                                    <div
                                        className="bg-img position-absolute w-100 h-100"
                                        style={{
                                            backgroundImage: `url(${card.description})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                        }}
                                    ></div>
                                    <div className="card-gradient position-absolute w-100 h-100"></div>
                                    <div className="card-body d-flex flex-column justify-content-end position-relative">
                                        <h5 className="card-title">{card.title}</h5>
                                        {/* <p className="card-text">{card.description}</p> */}
                                    </div>
                                </div>
                            </button>
                        </div>
                    ))}
                </div>

                <div id="carouselExampleFade" className="carousel slide carousel-fade py-4" data-bs-ride="carousel">
                    <h2 className="titulos display-4 text-center fw-bold mb-4">Experiencia</h2>
                    <div className="carousel-inner carouselB">
                        <div className="carousel-item active">
                            <img src="https://images.pexels.com/photos/2513607/pexels-photo-2513607.jpeg" className="d-block w-100" alt="Imagen 1" />
                        </div>
                        <div className="carousel-item">
                            <img src="https://images.pexels.com/photos/285598/pexels-photo-285598.jpeg" className="d-block w-100" alt="Imagen 2" />
                        </div>
                        <div className="carousel-item">
                            <img src="https://images.pexels.com/photos/2231755/pexels-photo-2231755.jpeg" className="d-block w-100" alt="Imagen 3" />
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
                    <p className="titulos text-center py-2">MIRA LAS EXPERIENCIAS VIVIDAS EN NUESTROS EVENTOS</p>
                </div>

                <div className="container">
                    <h2 className="titulos display-4 text-center fw-bold">Proximos Eventos 2026</h2>
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 mt-1">
                        {cards2.map((card, index) => (
                            <div className="d-flex justify-content-center" key={index}>
                                <button
                                    type="button" className="btn border-0 bg-transparent" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={() => setSelectedCard(card)}
                                >
                                    <div className="card text-white card-overlay h-100 border-0 position-relative overflow-hidden card-home">
                                        <div
                                            className="bg-img position-absolute w-100 h-100"
                                            style={{
                                                backgroundImage: `url(${card.image})`,
                                                backgroundSize: 'cover',
                                                backgroundPosition: 'center',
                                            }}
                                        ></div>
                                        <div className="card-gradient position-absolute w-100 h-100"></div>
                                        <div className="card-body d-flex flex-column justify-content-end position-relative">
                                            <h5 className="card-title">{card.title}</h5>
                                            <p className="card-text">{card.text}</p>
                                        </div>
                                    </div>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* MODAL DE LAS CARDS */}
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl">
                    <div className="modal-content position-relative overflow-hidden">
                        {selectedCard && (
                            <>
                                <div
                                    className="position-absolute w-100 h-100"
                                    style={{
                                        backgroundImage: `url(${selectedCard.description})`,
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                        opacity: 0.4,
                                        zIndex: 0
                                    }}
                                ></div>
                                <div
                                    className="position-absolute w-100 h-100"
                                    style={{
                                        backgroundColor: "black",
                                        opacity: 0.6,
                                        zIndex: 1
                                    }}
                                ></div>
                            </>
                        )}

                        {/* CONTENIDO DE LA MODAL */}

                        {
                            selectedCard && (
                                <>
                                    <div className="modal-header position-relative" style={{ zIndex: 2 }}>
                                        <h1 className="modal-title text-center w-100 title-modal" id="staticBackdropLabel">
                                            {selectedCard ? selectedCard.title : "TITULO DE LAS CARDS"}
                                        </h1>
                                    </div>
                                    <div className="modal-body d-flex justify-content-center align-items-center text-white vh-100" style={{ zIndex: 2 }}>
                                        <div className="text-center">
                                            <h1>{selectedCard.artist_name}</h1>
                                            <h3>Entrada desde: {selectedCard.price}€</h3>
                                            <h4>direccion: {selectedCard.location}</h4>
                                            <h4>Fecha: {selectedCard.date}</h4> 
                                        </div>
                                    </div>
                                    <div className="modal-footer position-relative" style={{ zIndex: 2 }}>
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                            Cerrar
                                        </button>
                                        <button type="button" className="btn btn-primary">
                                            Comprar
                                        </button>
                                    </div>
                                </>
                            )
                        }
                    </div>
                </div>
            </div>
            {/* FIN DE MODAL DE LAS CARDS */}
        </div>
    );
};