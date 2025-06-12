import React, { useRef, useEffect, useState } from "react";
import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
const containerStyle = {
  width: "90%",
  height: "400px",
};
function Mapa({ markers = [], isLoaded }) {
  const mapRef = useRef(null);
  const [selectedMarker, setSelectedMarker] = useState(null);

  useEffect(() => {
    if (!mapRef.current || markers.length === 0) return;
    if (markers.length === 1) {
      // Zoom fijo en eventos
      mapRef.current.setZoom(17);
      mapRef.current.panTo(markers[0].position);
    } else {
      // Mostrar todo el país en partners
      const bounds = new window.google.maps.LatLngBounds();
      markers.forEach((marker) => bounds.extend(marker.position));
      mapRef.current.fitBounds(bounds);
    }
  }, [markers]);
  if (!isLoaded) return <p>Cargando mapa...</p>;
  
  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={markers[0]?.position || { lat: 40.4168, lng: -3.7038 }}
      zoom={14}
      onLoad={(map) => (mapRef.current = map)}
    >
      {markers.map((marker, index) => (
        <Marker
          key={marker.id || index}
          position={marker.position}
          onClick={() => setSelectedMarker(marker)}
        />
      ))}
      {selectedMarker && (
        <InfoWindow
          position={selectedMarker.position}
          onCloseClick={() => setSelectedMarker(null)}
        >
          <div>{selectedMarker.name || selectedMarker.descripcion}</div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}
export default Mapa;