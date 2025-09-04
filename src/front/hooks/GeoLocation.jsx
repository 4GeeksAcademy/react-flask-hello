import React, { useState, useEffect } from "react";

export const useGeoLocation = () => {
    const [location, setLocation] = useState({ latitude: null, longitude: null, error: null });

    useEffect(() => {
        if (!navigator.geolocation) {
            setLocation(loc => ({ ...loc, error: "Geolocation is not supported by your browser" }));
        } else {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation(loc => ({
                        ...loc,
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        error: null
                    }));
                    console.log("Latitude:", position.coords.latitude);
                    console.log("Longitude:", position.coords.longitude);
                },
                (error) => {
                    setLocation(loc => ({ ...loc, error: error.message }));
                    console.error("Error Code = " + error.code + " - " + error.message);
                }
            );
        }
    }, []);

    return location;
};