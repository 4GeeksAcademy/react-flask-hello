import React, { useEffect, useState } from "react";
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from "@react-google-maps/api";
import { Spinner, Container } from "react-bootstrap";

export const MapView = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [activities, setActivities] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  useEffect(() => {
    // Obtener la ubicación actual del usuario
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setUserLocation({ lat: latitude, lng: longitude });
      },
      (err) => console.error("Error getting location:", err),
      { enableHighAccuracy: true }
    );

    // Obtener las actividades del backend
    const fetchActivities = async () => {
      try {
        const resp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/activities`);
        if (resp.ok) {
          const data = await resp.json();
          setActivities(data);
        } else {
          console.error("Error fetching activities");
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchActivities();
  }, []);

  if (!isLoaded || !userLocation)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-dark text-light">
        <Spinner animation="border" variant="light" />
      </div>
    );

  return (
    <Container fluid className="p-0">
      <div style={{ width: "100%", height: "100vh" }}>
        <GoogleMap
          center={userLocation}
          zoom={13}
          mapContainerStyle={{ width: "100%", height: "100%" }}
          onClick={() => setSelectedActivity(null)} // Cierra popup al hacer clic fuera
        >
          {/* Marcador de ubicación del usuario */}
          <Marker
            position={userLocation}
            icon={{
              url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
            }}
            title="Tú estás aquí"
          />

          {/* Marcadores de actividades */}
          {activities.map((a) => (
            <Marker
              key={a.id}
              position={{ lat: a.latitude, lng: a.longitude }}
              title={a.title}
              onClick={() => setSelectedActivity(a)}
            />
          ))}

          {/* Popup de detalles */}
          {selectedActivity && (
            <InfoWindow
              position={{
                lat: selectedActivity.latitude,
                lng: selectedActivity.longitude,
              }}
              onCloseClick={() => setSelectedActivity(null)}
            >
              <div style={{ minWidth: "200px" }}>
                <h6 className="mb-1">{selectedActivity.title}</h6>
                <p className="mb-1">
                  <strong>Deporte:</strong> {selectedActivity.sport}
                </p>
                <p className="mb-1">
                  <strong>Fecha:</strong>{" "}
                  {new Date(selectedActivity.date).toLocaleDateString()}
                </p>
                {selectedActivity.description && (
                  <p className="small text-muted">{selectedActivity.description}</p>
                )}
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </div>
    </Container>
  );
};
