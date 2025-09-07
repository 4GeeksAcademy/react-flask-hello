import { APIProvider, Map, useApiIsLoaded, AdvancedMarker } from "@vis.gl/react-google-maps";

const API_KEY = import.meta.env.VITE_API_KEY_MAPS;

function MapInner() {

  const isLoaded = useApiIsLoaded();
  const position = { lat: 39.47391, lng: -0.37966 }
  if (!isLoaded) return <div style={{ padding: 12 }}>Valencia</div>;
  return (
    <Map
      style={{ width: "100%", height: "100%" }}
      defaultCenter={position}
      defaultZoom={16}
      gestureHandling="greedy"
      disableDefaultUI={false}
      mapId={API_KEY}




    >

      <AdvancedMarker position={position} ></AdvancedMarker>



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
