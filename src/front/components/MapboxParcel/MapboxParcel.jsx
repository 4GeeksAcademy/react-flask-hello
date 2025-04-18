import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import './MapboxParcel.css';

mapboxgl.accessToken = 'pk.eyJ1IjoiZXF1aXBvMiIsImEiOiJjbTk3Z3EyeWgwN2pzMnJzYWh0ejd0bHNuIn0.xV1fX4yZB6W1JhpxlJ0Dsg';

if (mapboxgl.setTelemetryEnabled) {
    mapboxgl.setTelemetryEnabled(false);
}

const MapboxParcel = ({ latitude, longitude, fields = [], onFieldClick }) => {
    const mapContainer = useRef(null);
    const map = useRef(null);

    useEffect(() => {
        if (map.current) return;

        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/satellite-streets-v12',
            center: [longitude, latitude],
            zoom: 16
        });

        new mapboxgl.Marker({ color: 'red' })
            .setLngLat([longitude, latitude])
            .addTo(map.current);

        fields.forEach((field) => {
            if (!field.coordinates) return;

            const [lat, lon] = field.coordinates.split(',').map(coord => parseFloat(coord.trim()));
            const el = document.createElement('div');
            el.className = 'map-marker';

            const marker = new mapboxgl.Marker(el).setLngLat([lon, lat]).addTo(map.current);

            const popup = new mapboxgl.Popup({
                closeButton: false,
                closeOnClick: false
            }).setHTML(`
          <div class="popup-content">
            <strong>${field.name}</strong><br/>
            Cultivo: ${field.crop}<br/>
            Área: ${field.area} ha
          </div>
        `);

            el.addEventListener('mouseenter', () => {
                popup.addTo(map.current);
                popup.setLngLat([lon, lat]);
            });

            el.addEventListener('mouseleave', () => {
                popup.remove();
            });

            // 🖱️ CLICK para seleccionar campo
            el.addEventListener('click', () => {
                if (onFieldClick) onFieldClick(field);
            });
        });

        map.current.addControl(new mapboxgl.FullscreenControl());
    }, [latitude, longitude, fields, onFieldClick]);

    return <div ref={mapContainer} className="mapbox-parcel" />;
};


export default MapboxParcel;
