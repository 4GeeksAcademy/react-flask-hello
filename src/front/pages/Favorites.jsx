import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserInfo = () => {
    const [user, setUser] = useState({ name: "", email: "" });
    const navigate = useNavigate();

    useEffect(() => {
        fetchUserData();
    }, []);

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

    const handleLogout = () => {
        localStorage.removeItem("token"); // Clear authentication token
        navigate("/logout"); // Redirect to logout page
    };

    return (
        <div className="user-info">
            <h3>{user.name}</h3>
            <p>{user.email}</p>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
    );
};

export const Favorites = () => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        fetchFavorites();
    }, []);

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

    const removeFavorite = async (drinkId) => {
        try {
            await fetch(`${import.meta.env.VITE_BACKEND_URL}/favorites/${drinkId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });

            setFavorites(favorites.filter(fav => fav.drinkId !== drinkId));
        } catch (error) {
            console.error("Error removing favorite:", error);
        }
    };

    return (
        <div className="favorites-container">
            {/* Sidebar for User Info */}
            <UserInfo />

            {/* Favorites List */}
            <div className="favorites-content">
                <h2>My Favorite Cocktails</h2>
                {favorites.length > 0 ? (
                    <div className="cocktail-list">
                        {favorites.map((drink) => (
                            <div key={drink.drinkId} className="cocktail-card">
                                <h2 className="cocktail-title">{drink.drinkName}</h2>
                                <img className="cocktail-image" src={drink.drinkImage} alt={drink.drinkName} />
                                <p className="cocktail-glass"><strong>Glass:</strong> {drink.glass || "N/A"}</p>
                                <p className="cocktail-category"><strong>Category:</strong> {drink.category || "N/A"}</p>
                                
                                {/* Remove Favorite Button */}
                                <button 
                                    className="remove-favorite-button"
                                    onClick={() => removeFavorite(drink.drinkId)}
                                >
                                    Remove Favorite
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="no-favorites">You haven't added any favorites yet.</p>
                )}
            </div>
        </div>
    );
};
