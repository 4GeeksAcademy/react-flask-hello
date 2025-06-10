import React, { useState } from "react";
import { GoogleMap, InfoWindow, Marker ,useJsApiLoader} from "@react-google-maps/api";

const markers = [
  {
    id: 1,
    name: "Amatista",
    position: { lat: -33.54800186126676, lng:-71.47708491654643 }
  },
  {
    id: 2,
    name: "Antonia II",
    position: { lat: -30.96377966236699, lng: -70.96770441768842 }
  },
 
];

function Mapa() {

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "xxx",
  });
  const [activeMarker, setActiveMarker] = useState(null);

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };
  const handleOnLoad = (map) => {
    const bounds = new google.maps.LatLngBounds();
    markers.forEach(({ position }) => bounds.extend(position));
    map.fitBounds(bounds);
  };

  return isLoaded ? (
    <GoogleMap
      onLoad={handleOnLoad}
      onClick={() => setActiveMarker(null)}
      mapContainerStyle={{ width: "90vw", height: "90vh" }}
    >
      {markers.map(({ id, name, position }) => (
        <Marker
          key={id}
          position={position}
          onClick={() => handleActiveMarker(id)}
        >
          {activeMarker === id ? (
            <InfoWindow onCloseClick={() => setActiveMarker(null)}>
              <div>{name}</div>
            </InfoWindow>
          ) : null}
        </Marker>
      ))}
    </GoogleMap>
  ) : (
    <></>
  );
}
export default Mapa;