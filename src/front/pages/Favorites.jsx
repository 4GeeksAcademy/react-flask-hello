import React, { useState, useEffect } from "react";


export const Favorites = () => {
    const [favorites, setFavorites] = useState([]);
    const [user, setUser] = useState({ name: "John Doe", email: "john@example.com" });

    useEffect(() => {
        // Load favorites from localStorage or API
        const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
        setFavorites(savedFavorites);
    }, []);

    const removeFavorite = (item) => {
        const updatedFavorites = favorites.filter((fav) => fav.id !== item.id);
        setFavorites(updatedFavorites);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
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
                        <div key={item.id} className="favorite-card">
                            <h2>{item.name}</h2>
                            <img src={item.image} alt={item.name} />
                            <p><strong>Category:</strong> {item.category || "N/A"}</p>
                            <p><strong>Description:</strong> {item.description || "No description available."}</p>
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
