import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import './MapboxParcel.css';

mapboxgl.accessToken = 'pk.eyJ1IjoiZXF1aXBvMiIsImEiOiJjbTk3Z3EyeWgwN2pzMnJzYWh0ejd0bHNuIn0.xV1fX4yZB6W1JhpxlJ0Dsg';

if (mapboxgl.setTelemetryEnabled) {
    mapboxgl.setTelemetryEnabled(false);
}

const MapboxParcel = ({ latitude, longitude }) => {
    const mapContainer = useRef(null);
    const map = useRef(null);

    useEffect(() => {
        if (map.current) return;

        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/satellite-streets-v12',
            center: [longitude, latitude],
            zoom: 17
        });

        // 📍 Marcador central
        new mapboxgl.Marker()
            .setLngLat([longitude, latitude])
            .addTo(map.current);

        // 🖥️ Botón de pantalla completa
        map.current.addControl(new mapboxgl.FullscreenControl());
    }, [latitude, longitude]);

    return (
        <div ref={mapContainer} className="mapbox-parcel" />
    );
};

export default MapboxParcel;
