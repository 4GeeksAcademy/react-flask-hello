import { APIProvider, Map, useApiIsLoaded, Marker } from "@vis.gl/react-google-maps";

const API_KEY = import.meta.env.VITE_API_KEY_MAPS;

function MapInner() {
  const isLoaded = useApiIsLoaded();
  const position = { lat:39.47,lng:-0.37}
  if (!isLoaded) return <div style={{padding: 12}}>Valencia</div>;
  return (
    <Map
      style={{ width: "100%", height: "100%" }}
      defaultCenter={position}
      defaultZoom={13}
      gestureHandling="greedy"
      disableDefaultUI={false}
    ><Marker position={position}></Marker>
    </Map>
  );
}

export const Maps = () => {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <APIProvider apiKey={API_KEY}>
        <MapInner />
      </APIProvider>
    </div>
  );
};
