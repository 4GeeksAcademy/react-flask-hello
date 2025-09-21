import React, { useState, useEffect } from 'react';
import { useGeoLocation } from '../hooks/GeoLocation';

export const NearbyRestaurants = () => {
    const location = useGeoLocation(); // Your hook returns { latitude, longitude, error }
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState(null);

    useEffect(() => {
        // Only fetch when we have valid coordinates
        if (location.latitude && location.longitude && !location.error) {
            fetchNearbyRestaurants();
        }
    }, [location.latitude, location.longitude]);

    const fetchNearbyRestaurants = async () => {
        setLoading(true);
        setApiError(null);

        try {
            const response = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}api/restaurants/nearby?latitude=${location.latitude}&longitude=${location.longitude}&radius=5000`
            );

            if (response.ok) {
                const data = await response.json();
                setRestaurants(data.businesses || []);
            } else {
                setApiError('Failed to fetch restaurants');
            }
        } catch (err) {
            setApiError('Error fetching restaurants: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    // Show loading while getting location
    if (!location.latitude && !location.error) {
        return (
            <div className="text-center">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Getting your location...</span>
                </div>
                <p>Getting your location...</p>
            </div>
        );
    }

    // Show geolocation error
    if (location.error) {
        return (
            <div className="alert alert-warning">
                Location Error: {location.error}
            </div>
        );
    }

    return (
        <div className="container">
            <h2>Nearby Restaurants</h2>

            <p className="text-muted">
                Showing restaurants near: {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
            </p>

            {loading && (
                <div className="text-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading restaurants...</span>
                    </div>
                </div>
            )}

            {apiError && (
                <div className="alert alert-danger">
                    {apiError}
                </div>
            )}

            <div className="row">
                {restaurants.map((restaurant) => (
                    <div key={restaurant.id} className="col-md-6 col-lg-4 mb-3">
                        <div className="card">
                            {restaurant.image_url && (
                                <img
                                    src={restaurant.image_url}
                                    className="card-img-top"
                                    alt={restaurant.name}
                                    style={{ height: '200px', objectFit: 'cover' }}
                                />
                            )}
                            <div className="card-body">
                                <h5 className="card-title">{restaurant.name}</h5>
                                <p className="card-text">
                                    <small className="text-muted">
                                        {restaurant.categories?.map(cat => cat.title).join(', ')}
                                    </small>
                                </p>
                                <p className="card-text">
                                    <span className="badge bg-primary me-2">
                                        ⭐ {restaurant.rating}
                                    </span>
                                    <small className="text-muted">
                                        {(restaurant.distance / 1000).toFixed(1)}km away
                                    </small>
                                </p>
                                <p className="card-text">
                                    <small>{restaurant.location?.display_address?.join(', ')}</small>
                                </p>
                                {restaurant.phone && (
                                    <a href={`tel:${restaurant.phone}`} className="btn btn-outline-primary btn-sm">
                                        Call
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};