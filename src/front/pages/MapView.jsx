import React, { useEffect, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { Spinner, Container } from "react-bootstrap";

export const MapView = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [activities, setActivities] = useState([]);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY, // 🔑 guarda tu key en .env
  });