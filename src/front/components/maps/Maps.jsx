import { APIProvider, Map, useApiIsLoaded } from "@vis.gl/react-google-maps";

const API_KEY = import.meta.env.VITE_API_KEY_MAPS;

function MapInner() {
  const isLoaded = useApiIsLoaded();
  if (!isLoaded) return <div style={{padding: 12}}>Valencia</div>;
  return (
    <Map
      style={{ width: "100%", height: "100%" }}
      defaultCenter={{ lat: 22.54992, lng: 0 }}
      defaultZoom={3}
      gestureHandling="greedy"
      disableDefaultUI={false}
    />
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
