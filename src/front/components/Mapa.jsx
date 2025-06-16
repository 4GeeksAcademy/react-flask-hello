import React, { useCallback, useState, memo } from "react";
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "90%",
  height: "400px",
};

function Mapa({ markers = [], center }) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  const [selected, setSelected] = useState(null);

  // Si no hay center, usa el primer marcador o un valor por defecto
  const mapCenter =
    center ||
    (markers.length > 0
      ? markers[0].position
      : { lat: 40.416775, lng: -3.70379 });

const onLoad = useCallback((map) => {
  if (markers.length > 1) {
    const bounds = new window.google.maps.LatLngBounds();
    markers.forEach((m) => bounds.extend(m.position));
    map.fitBounds(bounds, { padding: 100 });
  }
}, [markers]);


  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={mapCenter}
      zoom={15}
      onLoad={onLoad}
    >
      {markers.map((marker) => (
        <Marker
          key={marker.id || marker.name}
          position={marker.position}
          onClick={() => setSelected(marker)}
        />
      ))}
      {selected && (
        <InfoWindow
          position={selected.position}
          onCloseClick={() => setSelected(null)}
        >
          <div>
            <h4>{selected.name}</h4>
            {selected.descripcion && <p>{selected.descripcion}</p>}
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  ) : null;
}

export default memo(Mapa);