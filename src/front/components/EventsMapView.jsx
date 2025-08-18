import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export const EventsMapView = () => {
    const navigate = useNavigate();
    const mapRef = useRef(null);
    const markersRef = useRef([]);
    const infoWindowRef = useRef(null);

    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [mapLoaded, setMapLoaded] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [showEventsList, setShowEventsList] = useState(true);

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

    // Cargar Google Maps API
    useEffect(() => {
        if (!window.google && googleMapsApiKey) {
            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&libraries=places`;
            script.async = true;
            script.defer = true;
            script.onload = () => {
                setMapLoaded(true);
            };
            document.head.appendChild(script);
        } else if (window.google) {
            setMapLoaded(true);
        }
    }, [googleMapsApiKey]);

    // Cargar eventos
    useEffect(() => {
        fetchEvents();
    }, []);

    // Inicializar mapa cuando se cargan los datos
    useEffect(() => {
        if (mapLoaded && events.length > 0 && mapRef.current) {
            initializeMap();
        }
    }, [mapLoaded, events]);

    const fetchEvents = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${backendUrl}api/events`);
            const data = await response.json();

            if (response.ok) {
                // Filtrar solo eventos con coordenadas
                const eventsWithCoords = data.filter(event => event.lat && event.lng);
                setEvents(eventsWithCoords);
            } else {
                alert("Error al cargar eventos");
            }
        } catch (error) {
            console.error("Error al cargar eventos:", error);
            alert("Error de conexión al cargar eventos");
        } finally {
            setLoading(false);
        }
    };

    const initializeMap = () => {
        if (!window.google || !mapRef.current || events.length === 0) return;

        
        const bounds = new window.google.maps.LatLngBounds();
        events.forEach(event => {
            if (event.lat && event.lng) {
                bounds.extend(new window.google.maps.LatLng(event.lat, event.lng));
            }
        });

        const map = new window.google.maps.Map(mapRef.current, {
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: true,
            styles: [
                {
                    featureType: "poi",
                    elementType: "labels",
                    stylers: [{ visibility: "off" }]
                }
            ]
        });

        
        map.fitBounds(bounds);

        // Crear ventana de información
        infoWindowRef.current = new window.google.maps.InfoWindow();

        // Limpiar marcadores anteriores
        markersRef.current.forEach(marker => marker.setMap(null));
        markersRef.current = [];

        // Crear marcadores para cada evento
        events.forEach(event => {
            if (event.lat && event.lng) {
                const marker = new window.google.maps.Marker({
                    position: { lat: parseFloat(event.lat), lng: parseFloat(event.lng) },
                    map: map,
                    title: event.title,
                    icon: {
                        url: 'data:image/svg+xml;base64,' + btoa(`
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
                                <circle cx="20" cy="20" r="18" fill="#007bff" stroke="#ffffff" stroke-width="3"/>
                                <text x="20" y="26" font-family="Arial" font-size="14" fill="white" text-anchor="middle">🎵</text>
                            </svg>
                        `),
                        scaledSize: new window.google.maps.Size(40, 40),
                        anchor: new window.google.maps.Point(20, 20)
                    }
                });

                // Contenido del InfoWindow
                const infoContent = `
                    <div style="max-width: 300px;">
                        <h6 class="mb-2 text-primary">${event.title}</h6>
                        <p class="mb-1"><i class="fas fa-calendar"></i> ${formatDate(event.date)}</p>
                        <p class="mb-1"><i class="fas fa-map-marker-alt"></i> ${event.location}</p>
                        ${event.artist_name ? `<p class="mb-1"><i class="fas fa-user"></i> ${event.artist_name}</p>` : ''}
                        <p class="mb-2"><i class="fas fa-tag"></i> ${formatPrice(event.price)}</p>
                        ${event.description ? `<p class="small text-muted mb-2">${event.description.substring(0, 100)}${event.description.length > 100 ? '...' : ''}</p>` : ''}
                        <button class="btn btn-primary btn-sm" onclick="window.buyTicket(${event.id})">
                            <i class="fas fa-ticket-alt"></i> Comprar entrada
                        </button>
                    </div>
                `;

                // Evento click en marcador
                marker.addListener('click', () => {
                    infoWindowRef.current.setContent(infoContent);
                    infoWindowRef.current.open(map, marker);
                    setSelectedEvent(event);
                });

                markersRef.current.push(marker);
            }
        });

        // Función global para comprar tickets
        window.buyTicket = (eventId) => {
            navigate(`/events/${eventId}/purchase`);
        };
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('es-ES', {
            style: 'currency',
            currency: 'EUR'
        }).format(price);
    };

    const centerOnEvent = (event) => {
        if (mapRef.current && window.google) {
            const map = new window.google.maps.Map(mapRef.current);
            map.setCenter({ lat: parseFloat(event.lat), lng: parseFloat(event.lng) });
            map.setZoom(15);

            // Abrir info window del evento
            const marker = markersRef.current.find(m =>
                m.getPosition().lat() === parseFloat(event.lat) &&
                m.getPosition().lng() === parseFloat(event.lng)
            );

            if (marker) {
                window.google.maps.event.trigger(marker, 'click');
            }
        }
    };

    if (!googleMapsApiKey) {
        return (
            <div className="container mt-5">
                <div className="alert alert-warning" role="alert">
                    <h4>Google Maps no disponible</h4>
                    <p>Para usar esta vista de mapa, necesitas configurar la variable de entorno <code>VITE_GOOGLE_MAPS_API_KEY</code> con tu clave de API de Google Maps.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container-fluid mt-3">
            <div className="row">
                {/* Panel lateral con lista de eventos */}
                <div className={`col-md-4 ${showEventsList ? '' : 'd-none'}`}>
                    <div className="card h-100">
                        <div className="card-header">
                            <div className="d-flex justify-content-between align-items-center">
                                <h5 className="mb-0">Eventos en el Mapa</h5>
                                <button
                                    className="btn btn-sm btn-outline-secondary d-md-none"
                                    onClick={() => setShowEventsList(false)}
                                >
                                    <i className="fas fa-times"></i>
                                </button>
                            </div>
                        </div>
                        <div className="card-body p-0" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                            {loading ? (
                                <div className="text-center p-4">
                                    <div className="spinner-border" role="status">
                                        <span className="visually-hidden">Cargando...</span>
                                    </div>
                                </div>
                            ) : events.length === 0 ? (
                                <div className="text-center p-4 text-muted">
                                    <i className="fas fa-map-marker-slash fa-2x mb-2"></i>
                                    <p>No hay eventos con ubicación disponible</p>
                                </div>
                            ) : (
                                events.map((event) => (
                                    <div
                                        key={event.id}
                                        className={`border-bottom p-3 ${selectedEvent?.id === event.id ? 'bg-light' : ''}`}
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => centerOnEvent(event)}
                                    >
                                        <h6 className="mb-1 text-primary">{event.title}</h6>
                                        <div className="small text-muted mb-1">
                                            <i className="fas fa-calendar me-1"></i>
                                            {formatDate(event.date)}
                                        </div>
                                        <div className="small text-muted mb-1">
                                            <i className="fas fa-map-marker-alt me-1"></i>
                                            {event.location}
                                        </div>
                                        {event.artist_name && (
                                            <div className="small text-muted mb-1">
                                                <i className="fas fa-user me-1"></i>
                                                {event.artist_name}
                                            </div>
                                        )}
                                        <div className="d-flex justify-content-between align-items-center mt-2">
                                            <span className="fw-bold text-success">
                                                {formatPrice(event.price)}
                                            </span>
                                            <button
                                                className="btn btn-primary btn-sm"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    navigate(`/events/${event.id}/purchase`);
                                                }}
                                            >
                                                <i className="fas fa-ticket-alt"></i>
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                       
12:28
      </div>
                    </div>
                </div>

                {/* Mapa */}
                <div className={`${showEventsList ? 'col-md-8' : 'col-12'}`}>
                    <div className="card h-100">
                        <div className="card-header">
                            <div className="d-flex justify-content-between align-items-center">
                                <h5 className="mb-0">Mapa de Eventos</h5>
                                <div>
                                    <button
                                        className={`btn btn-sm btn-outline-primary d-md-none me-2 ${showEventsList ? 'd-none' : ''}`}
                                        onClick={() => setShowEventsList(true)}
                                    >
                                        <i className="fas fa-list"></i> Lista
                                    </button>
                                    <button
                                        className="btn btn-sm btn-outline-secondary"
                                        onClick={fetchEvents}
                                    >
                                        <i className="fas fa-sync-alt"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="card-body p-0">
                            {mapLoaded ? (
                                <div
                                    ref={mapRef}
                                    style={{ height: '70vh', width: '100%' }}
                                ></div>
                            ) : (
                                <div
                                    className="d-flex justify-content-center align-items-center"
                                    style={{ height: '70vh' }}
                                >
                                    <div className="text-center">
                                        <div className="spinner-border text-primary" role="status">
                                            <span className="visually-hidden">Cargando mapa...</span>
                                        </div>
                                        <p className="mt-2 text-muted">Cargando Google Maps...</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};