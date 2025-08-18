import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

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
        price: ""
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
            alert("Debes iniciar sesión para crear un evento.");
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
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card p-4 shadow">
                        <h2 className="text-center mb-4">Crear Nuevo Evento</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">Título del Evento</label>
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
                            <div className="mb-3">
                                <label htmlFor="date" className="form-label">Fecha del Evento</label>
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
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">Descripción</label>
                                <textarea
                                    className="form-control"
                                    id="description"
                                    name="description"
                                    rows="3"
                                    value={formData.description}
                                    onChange={handleChange}
                                ></textarea>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="location" className="form-label">Ubicación</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="location"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="artist_name" className="form-label">Nombre del Artista/Banda</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="artist_name"
                                    name="artist_name"
                                    value={formData.artist_name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="lat" className="form-label">Latitud (Opcional)</label>
                                    <input
                                        type="number"
                                        step="any"
                                        className="form-control"
                                        id="lat"
                                        name="lat"
                                        value={formData.lat}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="lng" className="form-label">Longitud (Opcional)</label>
                                    <input
                                        type="number"
                                        step="any"
                                        className="form-control"
                                        id="lng"
                                        name="lng"
                                        value={formData.lng}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="d-grid gap-2">
                                <button type="submit" className="btn btn-primary btn-lg">
                                    Crear Evento
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};