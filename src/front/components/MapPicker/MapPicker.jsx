import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "./MapPicker.css";

mapboxgl.accessToken = "pk.eyJ1IjoiZXF1aXBvMiIsImEiOiJjbTk3Z3EyeWgwN2pzMnJzYWh0ejd0bHNuIn0.xV1fX4yZB6W1JhpxlJ0Dsg";


const MapPicker = ({ initialCoordinates, onCoordinatesChange }) => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const markerRef = useRef(null);

    // Crear el mapa solo una vez
    useEffect(() => {
        const [defaultLat, defaultLon] = initialCoordinates && /^-?\d+\.\d+,-?\d+\.\d+$/.test(initialCoordinates)
            ? initialCoordinates.split(",").map(coord => parseFloat(coord.trim()))
            : [40.4168, -3.7038]; // 📍 Madrid como fallback

        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: "mapbox://styles/mapbox/satellite-streets-v12",
            center: [defaultLon, defaultLat],
            zoom: 15
        });

        // ❌ Bloquear telemetría de Mapbox
        map.current._requestManager._transformRequest = (url, type) => {
            if (url.includes("events.mapbox.com")) {
                return { url: "about:blank" };
            }
            return { url };
        };

        const marker = new mapboxgl.Marker({ draggable: true })
            .setLngLat([defaultLon, defaultLat])
            .addTo(map.current);

        markerRef.current = marker;

        const updateCoords = () => {
            const { lng, lat } = marker.getLngLat();
            onCoordinatesChange(`${lat.toFixed(6)}, ${lng.toFixed(6)}`);
        };

        marker.on("dragend", updateCoords);

        map.current.on("click", (e) => {
            marker.setLngLat(e.lngLat);
            updateCoords();
        });

        return () => {
            map.current.remove();
        };
    }, []);


    // ⬅️ Escuchar cambios en `initialCoordinates` y actualizar el mapa
    useEffect(() => {
        if (!map.current || !initialCoordinates || !/^[-\d.]+,\s*[-\d.]+$/.test(initialCoordinates)) return;

        const [lat, lon] = initialCoordinates.split(",").map(coord => parseFloat(coord.trim()));
        const lngLat = [lon, lat];

        map.current.flyTo({ center: lngLat, essential: true });

        if (markerRef.current) {
            markerRef.current.setLngLat(lngLat);
        }
    }, [initialCoordinates]);

    return <div className="map-picker-container" ref={mapContainer} />;
};

export default MapPicker;
