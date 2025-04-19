import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import * as turf from '@turf/turf';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import './MapboxParcel.css';
import { useGlobalReducer } from "../../hooks/useGlobalReducer";

mapboxgl.accessToken = 'pk.eyJ1IjoiZXF1aXBvMiIsImEiOiJjbTk3Z3EyeWgwN2pzMnJzYWh0ejd0bHNuIn0.xV1fX4yZB6W1JhpxlJ0Dsg';

const MapboxParcel = ({ latitude, longitude, fields = [], onFieldClick, onDraw }) => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const draw = useRef(null);
    const polygonDrawn = useRef(false);
    const { dispatch, store } = useGlobalReducer();

    const truncate = (num, decimals = 2) => {
        const factor = Math.pow(10, decimals);
        return Math.floor(num * factor) / factor;
    };


    const isValidGeometry = (geometry) =>
        geometry && typeof geometry === 'object' && geometry.type && geometry.coordinates && Array.isArray(geometry.coordinates);

    const savePolygon = async (geometry, fieldId) => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/fields/${fieldId}/geometry`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ geometry })
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Error al guardar el polígono en el backend: ${errorText}`);
            }

            try {
                const data = await response.json();
                console.log("✅ Polígono guardado en backend:", data);
            } catch {
                console.log("✅ Polígono guardado en backend (sin respuesta JSON)");
            }
        } catch (error) {
            console.error("❌ Error al guardar el polígono:", error.message || error);
        }
    };

    const loadGeometryFromBackend = async (fieldId) => {
        try {
            const token = localStorage.getItem("token");
            const url = `${import.meta.env.VITE_BACKEND_URL}/fields/fields/${fieldId}`;
            console.log("📥 Cargando geometría desde:", url);
            const response = await fetch(url, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (!response.ok) throw new Error(`HTTP ${response.status}`);

            const data = await response.json();
            if (isValidGeometry(data.geometry)) {
                console.log("✅ Geometría recibida:", data);

                const turfPolygon = {
                    type: 'Feature',
                    properties: {},
                    geometry: data.geometry
                };
                const area = turf.area(turfPolygon);
                const areaHa = truncate(area / 10000);

                dispatch({
                    type: "SET_DRAWN_FIELD",
                    payload: {
                        fieldId,
                        geometry: data.geometry,
                        area: areaHa
                    }
                });

                // 👉 LLAMAMOS onDraw PARA REFLEJARLO ARRIBA
                if (onDraw) {
                    onDraw({
                        geometry: data.geometry,
                        area: areaHa
                    });
                }

                if (draw.current) {
                    draw.current.deleteAll();
                    draw.current.add({
                        type: 'Feature',
                        properties: {},
                        geometry: data.geometry
                    });
                    draw.current.changeMode('simple_select');
                    polygonDrawn.current = true;
                }
            } else {
                console.warn("⚠️ Geometría inválida desde backend:", data.geometry);
            }
        } catch (error) {
            console.error("⚠️ Error cargando geometría desde backend:", error.message);
        }
    };


    useEffect(() => {
        if (map.current) return;

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

        new mapboxgl.Marker({ color: 'red' })
            .setLngLat([longitude, latitude])
            .addTo(map.current);

        fields.forEach((field) => {
            if (!field.coordinates) return;
            const [lat, lon] = field.coordinates.split(',').map(coord => parseFloat(coord.trim()));
            const el = document.createElement('div');
            el.className = 'map-marker';

            new mapboxgl.Marker(el).setLngLat([lon, lat]).addTo(map.current);

            const popup = new mapboxgl.Popup({ closeButton: false, closeOnClick: false })
                .setHTML(`
                    <div class="popup-content">
                        <strong>${field.name}</strong><br/>
                        Cultivo: ${field.crop}<br/>
                        Área: ${field.area} ha
                    </div>
                `);

            el.addEventListener('mouseenter', () => popup.addTo(map.current).setLngLat([lon, lat]));
            el.addEventListener('mouseleave', () => popup.remove());
            el.addEventListener('click', async () => {
                if (onFieldClick) onFieldClick(field);
                await loadGeometryFromBackend(field.id);
            });
        });
    }, []);

    useEffect(() => {
        if (!map.current || !draw.current) return;

        draw.current.deleteAll();
        polygonDrawn.current = false;

        const existingGeometry = store.selectedField?.id && store.drawnFields[store.selectedField.id];
        if (isValidGeometry(existingGeometry)) {
            draw.current.add({
                type: 'Feature',
                properties: {},
                geometry: existingGeometry
            });
            polygonDrawn.current = true;
            draw.current.changeMode('simple_select');
        } else {
            console.warn("⚠️ Geometría inválida o vacía:", existingGeometry);
        }

        map.current.flyTo({
            center: [longitude, latitude],
            essential: true,
            zoom: 16
        });
    }, [latitude, longitude, store.selectedField]);

    useEffect(() => {
        if (!map.current || !draw.current) return;

        map.current.on('draw.create', async (e) => {
            const polygon = e.features?.[0];
            if (!polygon || !polygon.geometry?.type) {
                console.warn("❌ Polígono creado inválido:", polygon);
                return;
            }

            if (polygonDrawn.current) {
                alert("Solo puedes dibujar un polígono.");
                draw.current.deleteAll();
                return;
            }

            const area = turf.area(polygon);
            const areaHa = truncate(area / 10000);
            console.log(`✅ Área estimada: ${areaHa} ha`);


            dispatch({
                type: "SET_DRAWN_FIELD",
                payload: {
                    fieldId: store.selectedField?.id,
                    geometry: polygon.geometry,
                    area: area / 10000 // hectáreas
                }
            });

            // ✅ Nuevo callback para actualizar inmediatamente en el componente padre
            if (onDraw) {
                onDraw({
                    geometry: polygon.geometry,
                    area: area / 10000
                });
            }

            if (store.selectedField?.id) {
                await savePolygon(polygon.geometry, store.selectedField.id);
            }

            console.log(`✅ Área estimada: ${(area / 10000).toFixed(2)} ha`);
            draw.current.changeMode('simple_select');
            setTimeout(() => (polygonDrawn.current = true), 150);
        });


        map.current.on('draw.delete', () => {
            polygonDrawn.current = false;
            dispatch({ type: "SET_DRAWN_FIELD", payload: null });
            console.log("🗑️ Polígono eliminado");
        });
    }, [store.selectedField]);

    useEffect(() => {
        if (store.selectedField?.id) {
            loadGeometryFromBackend(store.selectedField.id);
        }
    }, [store.selectedField?.id]);

    return <div ref={mapContainer} className="mapbox-parcel" />;
};

export default MapboxParcel;
