import React, { useState, useEffect } from "react";

export const Favorites = () => {
    const [favorites, setFavorites] = useState([]);
    const [user, setUser] = useState({ name: "", email: "" });

    useEffect(() => {
        fetchUserData();
        fetchFavorites();
    }, []);

    // Fetch user data from backend
    const fetchUserData = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });
            const data = await response.json();
            setUser({ name: data.name, email: data.email });
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    // Fetch favorites from backend
    const fetchFavorites = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/favorites`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });
            const data = await response.json();
            setFavorites(data);
        } catch (error) {
            console.error("Error fetching favorites:", error);
        }
    };

    // Remove favorite from backend
    const removeFavorite = async (item) => {
        try {
            await fetch(`${import.meta.env.VITE_BACKEND_URL}/favorites/${item.drinkId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });

            setFavorites(favorites.filter((fav) => fav.drinkId !== item.drinkId));
        } catch (error) {
            console.error("Error removing favorite:", error);
        }
    };

    return (
        <div className="favorites-app">
            {/* User Info Section */}
            <div className="user-info">
                <h3>{user.name}</h3>
                <p>{user.email}</p>
            </div>

            <h1>My Favorites</h1>

            <div className="favorites-list">
                {favorites.length > 0 ? (
                    favorites.map((item) => (
                        <div key={item.drinkId} className="favorite-card">
                            <h2>{item.drinkName}</h2>
                            <img src={item.drinkImage} alt={item.drinkName} />
                            <button className="remove-favorite-btn" onClick={() => removeFavorite(item)}>
                                Remove from Favorites
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No favorites added yet!</p>
                )}
            </div>
        </div>
    );
};
