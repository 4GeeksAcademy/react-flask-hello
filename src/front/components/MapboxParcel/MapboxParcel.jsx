import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import * as turf from '@turf/turf';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import './MapboxParcel.css';
import { useGlobalReducer } from "../../hooks/useGlobalReducer";

mapboxgl.accessToken = 'pk.eyJ1IjoiZXF1aXBvMiIsImEiOiJjbTk3Z3EyeWgwN2pzMnJzYWh0ejd0bHNuIn0.xV1fX4yZB6W1JhpxlJ0Dsg';

const MapboxParcel = ({ latitude, longitude, fields = [], onFieldClick }) => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const draw = useRef(null);
    const polygonDrawn = useRef(false);
    const { dispatch, store } = useGlobalReducer();

    // Inicialización del mapa
    useEffect(() => {
        if (map.current) return;

        console.log("🗺️ Inicializando mapa...");

        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/satellite-streets-v12',
            center: [longitude, latitude],
            zoom: 16
        });

        map.current.addControl(new mapboxgl.FullscreenControl());

        draw.current = new MapboxDraw({
            displayControlsDefault: false,
            controls: {
                polygon: true,
                trash: true
            },
            defaultMode: 'draw_polygon'
        });

        map.current.addControl(draw.current);

        // Restaurar si hay polígono
        if (store.drawnField && store.selectedField?.id === store.drawnField.fieldId) {
            console.log("🔁 Restaurando polígono desde el store...");
            draw.current.add({
                type: 'Feature',
                properties: {},
                geometry: store.drawnField.geometry
            });
            polygonDrawn.current = true;
            draw.current.changeMode('simple_select');
        }

        // Evento al crear
        map.current.on('draw.create', (e) => {
            if (polygonDrawn.current) {
                alert("Solo puedes dibujar un polígono.");
                draw.current.deleteAll();
                return;
            }

            const polygon = e.features[0];
            const coords = polygon.geometry.coordinates[0];
            const area = turf.area(polygon);

            console.log("🟩 Coordenadas:", coords);
            console.log("📐 Área:", area);

            dispatch({
                type: "SET_DRAWN_FIELD",
                payload: {
                    fieldId: store.selectedField?.id,
                    geometry: polygon.geometry
                }
            });

            alert(`Área estimada: ${(area / 10000).toFixed(2)} hectáreas`);

            draw.current.changeMode('simple_select');

            setTimeout(() => {
                polygonDrawn.current = true;
            }, 150);
        });

        // Evento al borrar
        map.current.on('draw.delete', () => {
            polygonDrawn.current = false;
            dispatch({ type: "SET_DRAWN_FIELD", payload: null });
            console.log("🗑️ Polígono eliminado");
        });

        // Marcador central
        new mapboxgl.Marker({ color: 'red' })
            .setLngLat([longitude, latitude])
            .addTo(map.current);

        // Otros campos
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
                popup.addTo(map.current).setLngLat([lon, lat]);
            });
            el.addEventListener('mouseleave', () => popup.remove());
            el.addEventListener('click', () => onFieldClick?.(field));
        });
    }, []);

    // Cambio de parcela
    useEffect(() => {
        if (!map.current || !draw.current) return;

        console.log("🔄 Cambio de parcela detectado. Reiniciando polígono...");

        draw.current.deleteAll();
        polygonDrawn.current = false;

        if (store.drawnField && store.selectedField?.id === store.drawnField.fieldId) {
            draw.current.add({
                type: 'Feature',
                properties: {},
                geometry: store.drawnField.geometry
            });
            polygonDrawn.current = true;
            draw.current.changeMode('simple_select');
        }

        map.current.flyTo({
            center: [longitude, latitude],
            essential: true,
            zoom: 16
        });
    }, [latitude, longitude, store.selectedField]);

    return <div ref={mapContainer} className="mapbox-parcel" />;
};

export default MapboxParcel;
