import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import imagenBack from "../assets/fondo-Rock.jpg";

export const EventForm = () => {
    const { store } = useGlobalReducer();
    const navigate = useNavigate();
    const mapRef = useRef(null);
    const autocompleteRef = useRef(null);
    const markerRef = useRef(null);

    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editingEvent, setEditingEvent] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [mapLoaded, setMapLoaded] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        date: "",
        description: "",
        location: "",
        lat: "",
        lng: "",
        artist_name: "",
        price: "",
        image: "",
    });

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

    // Cargar eventos al montar el componente
    useEffect(() => {
        fetchEvents();
    }, []);

    // Inicializar mapa cuando se carga y se muestra el formulario
    useEffect(() => {
        if (mapLoaded && showForm && mapRef.current) {
            initializeMap();
        }
    }, [mapLoaded, showForm]);

    const fetchEvents = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${backendUrl}api/events`);
            const data = await response.json();

            if (response.ok) {
                setEvents(data);
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

    console.log(formData)

    const initializeMap = () => {
        if (!window.google || !mapRef.current) return;

        // Coordenadas por defecto (Madrid)
        const defaultCenter = { lat: 40.4168, lng: -3.7038 };
        const center = formData.lat && formData.lng
            ? { lat: parseFloat(formData.lat), lng: parseFloat(formData.lng) }
            : defaultCenter;

        const map = new window.google.maps.Map(mapRef.current, {
            zoom: 13,
            center: center,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: false,
        });

        // Añadir marcador si hay coordenadas
        if (formData.lat && formData.lng) {
            markerRef.current = new window.google.maps.Marker({
                position: center,
                map: map,
                draggable: true,
                title: formData.title || "Ubicación del evento"
            });

            // Listener para cuando se arrastra el marcador
            markerRef.current.addListener('dragend', (event) => {
                const newLat = event.latLng.lat();
                const newLng = event.latLng.lng();
                setFormData(prev => ({
                    ...prev,
                    lat: newLat.toString(),
                    lng: newLng.toString()
                }));

                // Geocoding inverso para obtener la dirección
                reverseGeocode(newLat, newLng);
            });
        }

        // Listener para clicks en el mapa
        map.addListener('click', (event) => {
            const clickedLat = event.latLng.lat();
            const clickedLng = event.latLng.lng();

            // Remover marcador anterior si existe
            if (markerRef.current) {
                markerRef.current.setMap(null);
            }

            // Crear nuevo marcador
            markerRef.current = new window.google.maps.Marker({
                position: { lat: clickedLat, lng: clickedLng },
                map: map,
                draggable: true,
                title: formData.title || "Ubicación del evento"
            });

            // Actualizar coordenadas en el formulario
            setFormData(prev => ({
                ...prev,
                lat: clickedLat.toString(),
                lng: clickedLng.toString()
            }));

            // Geocoding inverso para obtener la dirección
            reverseGeocode(clickedLat, clickedLng);

            // Listener para cuando se arrastra el nuevo marcador
            markerRef.current.addListener('dragend', (event) => {
                const newLat = event.latLng.lat();
                const newLng = event.latLng.lng();
                setFormData(prev => ({
                    ...prev,
                    lat: newLat.toString(),
                    lng: newLng.toString()
                }));
                reverseGeocode(newLat, newLng);
            });
        });

        // Autocompletado para el campo de ubicación
        if (autocompleteRef.current) {
            const autocomplete = new window.google.maps.places.Autocomplete(
                autocompleteRef.current,
                {
                    types: ['establishment', 'geocode'],
                    componentRestrictions: { country: 'es' } // Restringir a España
                }
            );

            autocomplete.addListener('place_changed', () => {
                const place = autocomplete.getPlace();
                if (place.geometry) {
                    const lat = place.geometry.location.lat();
                    const lng = place.geometry.location.lng();

                    // Actualizar formulario
                    setFormData(prev => ({
                        ...prev,
                        location: place.formatted_address || place.name,
                        lat: lat.toString(),
                        lng: lng.toString()
                    }));

                    // Centrar mapa y añadir marcador
                    map.setCenter({ lat, lng });

                    if (markerRef.current) {
                        markerRef.current.setMap(null);
                    }

                    markerRef.current = new window.google.maps.Marker({
                        position: { lat, lng },
                        map: map,
                        draggable: true,
                        title: place.name || "Ubicación del evento"
                    });

                    markerRef.current.addListener('dragend', (event) => {
                        const newLat = event.latLng.lat();
                        const newLng = event.latLng.lng();
                        setFormData(prev => ({
                            ...prev,
                            lat: newLat.toString(),
                            lng: newLng.toString()
                        }));
                        reverseGeocode(newLat, newLng);
                    });
                }
            });
        }
    };

    const reverseGeocode = (lat, lng) => {
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode(
            { location: { lat, lng } },
            (results, status) => {
                if (status === 'OK' && results[0]) {
                    setFormData(prev => ({
                        ...prev,
                        location: results[0].formatted_address
                    }));
                }
            }
        );
    };

    const resetForm = () => {
        setFormData({
            title: "",
            date: "",
            description: "",
            location: "",
            lat: "",
            lng: "",
            artist_name: "",
            price: ""
        });
        setEditingEvent(null);
        setShowForm(false);

        // Limpiar marcador
        if (markerRef.current) {
            markerRef.current.setMap(null);
            markerRef.current = null;
        }
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!store.token) {
            alert("Debes iniciar sesión para gestionar eventos.");
            navigate("/login");
            return;
        }

        // Validar que se haya seleccionado una ubicación
        if (!formData.lat || !formData.lng) {
            alert("Por favor, selecciona una ubicación en el mapa o usa el buscador.");
            return;
        }

        try {
            const url = editingEvent
                ? `${backendUrl}api/events/${editingEvent.id}`
                : `${backendUrl}api/events`;

            const method = editingEvent ? "PUT" : "POST";

            const response = await fetch(url, {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${store.token}`
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message);

                resetForm();
                fetchEvents();
            } else {
                alert(`Error: ${data.error || data.message || response.statusText}`);
            }
        } catch (error) {
            console.error("Error al guardar evento:", error);
            alert("Hubo un problema al conectar con el servidor.");
        }
    };

    const handleEdit = (event) => {
        setFormData({
            title: event.title,
            date: event.date,
            description: event.description || "",
            location: event.location || "",
            lat: event.lat ? event.lat.toString() : "",
            lng: event.lng ? event.lng.toString() : "",
            artist_name: event.artist_name || "",
            price: event.price ? event.price.toString() : ""
        });
        setEditingEvent(event);
        setShowForm(true);
    };

    const handleDelete = async (eventId) => {
        if (!window.confirm("¿Estás seguro de que quieres eliminar este evento?")) {
            return;
        }

        if (!store.token) {
            alert("Debes iniciar sesión para eliminar eventos.");
            navigate("/login");
            return;
        }

        try {
            const response = await fetch(`${backendUrl}api/events/${eventId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${store.token}`
                }
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message);
                fetchEvents();
            } else {
                alert(`Error al eliminar: ${data.error || data.message}`);

            }
        } catch (error) {
            console.error("Error al eliminar evento:", error);
            alert("Error de conexión al eliminar evento");
        }
    };




    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('es-ES');
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('es-ES', {
            style: 'currency',
            currency: 'EUR'
        }).format(price);
    };

    const openInGoogleMaps = (lat, lng, title) => {
        const url = `https://www.google.com/maps?q=${lat},${lng}&t=m&z=15`;
        window.open(url, '_blank');
    };

    return (
        <div className="home-page-container">
            <div className="imagen-background">
                <img src={imagenBack} alt="imagen fondo" />
            </div>
            <div className="container py-5">
                <div className="row">
                    <div className="col-12">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h2>Gestión de Eventos</h2>
                            <button
                                className="btn btn-primary"
                                onClick={() => {
                                    resetForm();
                                    setShowForm(true);
                                }}
                            >
                                <i className="fas fa-plus me-2"></i>
                                Nuevo Evento
                            </button>
                        </div>

                        {!googleMapsApiKey && (
                            <div className="alert alert-warning" role="alert">
                                <i className="fas fa-exclamation-triangle me-2"></i>
                                <strong>Atención:</strong> Para usar la funcionalidad de mapas, configura la variable de entorno VITE_GOOGLE_MAPS_API_KEY
                            </div>
                        )}

                        {/* Formulario */}
                        {showForm && (
                            <div className="card mb-4 form-evet">
                                <div className="card-header">
                                    <h5 className="mb-0">
                                        {editingEvent ? "Editar Evento" : "Crear Nuevo Evento"}
                                    </h5>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={handleSubmit}>
                                        <div className="row">
                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="title" className="form-label label-event">Título del Evento *</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="title"
                                                    name="title"
                                                    value={formData.title}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="date" className="form-label label-event">Fecha del Evento *</label>
                                                <input
                                                    type="date"
                                                    className="form-control"
                                                    id="date"
                                                    name="date"
                                                    value={formData.date}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="artist_name" className="form-label label-event">Artista/Banda</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="artist_name"
                                                    name="artist_name"
                                                    value={formData.artist_name}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="price" className="form-label label-event">Precio (€) *</label>
                                                <input
                                                    type="number"
                                                    step="0.01"
                                                    min="0"
                                                    className="form-control"
                                                    id="price"
                                                    name="price"
                                                    value={formData.price}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>

                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="image" className="form-label label-event">Imagen del Evento (URL)</label>
                                            <input
                                                type="url"
                                                className="form-control"
                                                id="image"
                                                name="image"
                                                value={formData.image || ""}
                                                onChange={handleChange}
                                                placeholder="Ej: https://example.com/imagen.jpg"
                                            />
                                        </div>
                        
                                        {/* Sección de localización */}
                                        <div className="mb-3">
                                            <label htmlFor="location" className="form-label label-event">
                                                Ubicación *
                                                {mapLoaded && <small className="text-muted ms-2">(Busca o haz clic en el mapa)</small>}
                                            </label>
                                            <input
                                                ref={autocompleteRef}
                                                type="text"
                                                className="form-control"
                                                id="location"
                                                name="location"
                                                value={formData.location}
                                                onChange={handleChange}
                                                placeholder="Escribe una dirección o nombre del lugar..."
                                                required
                                            />
                                        </div>

                                        {/* Mapa */}
                                        {mapLoaded ? (
                                            <div className="mb-3">
                                                <label className="form-label label-event">Seleccionar ubicación en el mapa</label>
                                                <div
                                                    ref={mapRef}
                                                    style={{ height: '300px', width: '100%' }}
                                                    className="border rounded"
                                                ></div>
                                                <small className="text-muted">
                                                    Haz clic en el mapa para seleccionar la ubicación exacta del evento
                                                </small>
                                            </div>
                                        ) : googleMapsApiKey ? (
                                            <div className="mb-3 text-center">
                                                <div className="spinner-border" role="status">
                                                    <span className="visually-hidden">Cargando mapa...</span>
                                                </div>
                                                <p className="mt-2 text-muted">Cargando Google Maps...</p>
                                            </div>
                                        ) : (
                                            <div className="row mb-3">
                                                <div className="col-md-6">
                                                    <label htmlFor="lat" className="form-label label-event">Latitud</label>
                                                    <input
                                                        type="number"
                                                        step="any"
                                                        className="form-control"
                                                        id="lat"
                                                        name="lat"
                                                        value={formData.lat}
                                                        onChange={handleChange}
                                                        placeholder="Ej: 40.4168"
                                                    />
                                                </div>
                                                <div className="col-md-6">
                                                    <label htmlFor="lng" className="form-label label-event">Longitud</label>
                                                    <input
                                                        type="number"
                                                        step="any"
                                                        className="form-control"
                                                        id="lng"
                                                        name="lng"
                                                        value={formData.lng}
                                                        onChange={handleChange}
                                                        placeholder="Ej: -3.7038"
                                                    />
                                                </div>
                                            </div>
                                        )}

                                        {/* Mostrar coordenadas actuales */}
                                        {formData.lat && formData.lng && (
                                            <div className="mb-3">
                                                <small className="text-muted">
                                                    <i className="fas fa-map-marker-alt me-1"></i>
                                                    Coordenadas: {parseFloat(formData.lat).toFixed(6)}, {parseFloat(formData.lng).toFixed(6)}
                                                </small>
                                            </div>
                                        )}

                                        <div className="d-flex gap-2">
                                            <button type="submit" className="btn btn-success">
                                                <i className="fas fa-save me-2"></i>
                                                {editingEvent ? "Actualizar" : "Crear"} Evento
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-secondary"
                                                onClick={resetForm}
                                            >
                                                <i className="fas fa-times me-2"></i>
                                                Cancelar
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}

                        {/* Lista de eventos */}
                        <div className="card form-evet">
                            <div className="card-header">
                                <h5 className="mb-0">Lista de Eventos</h5>
                            </div>
                            <div className="card-body">
                                {loading ? (
                                    <div className="text-center">
                                        <div className="spinner-border" role="status">
                                            <span className="visually-hidden">Cargando...</span>
                                        </div>
                                    </div>
                                ) : events.length === 0 ? (
                                    <div className="text-center">
                                        <p>No hay eventos disponibles</p>
                                    </div>
                                ) : (
                                    <div className="table-responsive">
                                        <table className="table table-hover">
                                            <thead>
                                                <tr>
                                                    <th>Título</th>
                                                    <th>Fecha</th>
                                                    <th>Ubicación</th>
                                                    <th>Artista</th>
                                                    <th>Precio</th>
                                                    <th>Acciones</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {events.map((event) => (
                                                    <tr key={event.id}>
                                                        <td>
                                                            <strong>{event.title}</strong>
                                                            {event.description && (
                                                                <div className="text-muted small">
                                                                    {event.description.substring(0, 50)}
                                                                    {event.description.length > 50 && "..."}
                                                                </div>
                                                            )}
                                                        </td>
                                                        <td>{formatDate(event.date)}</td>
                                                        <td>
                                                            <div>{event.location}</div>
                                                            {event.lat && event.lng && (
                                                                <button
                                                                    className="btn btn-link btn-sm p-0 text-decoration-none"
                                                                    onClick={() => openInGoogleMaps(event.lat, event.lng, event.title)}
                                                                    title="Ver en Google Maps"
                                                                >
                                                                    <i className="fas fa-external-link-alt"></i>
                                                                    <small> Ver en mapa</small>
                                                                </button>
                                                            )}
                                                        </td>
                                                        <td>{event.artist_name || "-"}</td>
                                                        <td>{formatPrice(event.price || 0)}</td>
                                                        <td>
                                                            <div className="btn-group" role="group">
                                                                <button
                                                                    className="btn btn-sm btn-outline-primary"
                                                                    onClick={() => handleEdit(event)}
                                                                    title="Editar"
                                                                >
                                                                    <i className="fas fa-edit"></i>
                                                                </button>
                                                                <button
                                                                    className="btn btn-sm btn-outline-danger"
                                                                    onClick={() => handleDelete(event.id)}
                                                                    title="Eliminar"
                                                                >
                                                                    <i className="fas fa-trash"></i>
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};