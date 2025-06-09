// src/components/MapWithMarkers.jsx
import React from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const center = {
  lat: -34.6037,
  lng: -58.3816,
};

// Ejemplo de marcadores
const lugares = [
  { id: 1, posicion: { lat: -34.6037, lng: -58.3816 }, titulo: "Obelisco" },
  { id: 2, posicion: { lat: -34.6091, lng: -58.3925 }, titulo: "Teatro Colón" },
  { id: 3, posicion: { lat: -34.6158, lng: -58.4333 }, titulo: "Parque Centenario" },
];

function MapWithMarkers() {
  const [selectedMarker, setSelectedMarker] = React.useState(null);

  return (
    <LoadScript googleMapsApiKey="TU_API_KEY_AQUI">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={13}>
        {lugares.map((lugar) => (
          <Marker
            key={lugar.id}
            position={lugar.posicion}
            onClick={() => setSelectedMarker(lugar)}
          />
        ))}

        {selectedMarker && (
          <InfoWindow
            position={selectedMarker.posicion}
            onCloseClick={() => setSelectedMarker(null)}
          >
            <div>
              <h3>{selectedMarker.titulo}</h3>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
}

export default MapWithMarkers;
