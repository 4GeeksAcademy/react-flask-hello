import React, { useState, useEffect } from "react";

export const Favorites = () => {
    const [favorites, setFavorites] = useState([]);

    // Load favorites from local storage on mount
    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
        setFavorites(storedFavorites);
    }, []);

    // Remove favorite and update local storage
    const removeFavorite = (drinkId) => {
        const updatedFavorites = favorites.filter(fav => fav.idDrink !== drinkId);
        setFavorites(updatedFavorites);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    };

    return (
        <div className="favorites-container">
            <h2>My Favorite Cocktails</h2>
            {favorites.length > 0 ? (
                <div className="cocktail-list">
                    {favorites.map((drink) => (
                        <div key={drink.idDrink} className="cocktail-card">
                            <h2 className="cocktail-title">{drink.strDrink}</h2>
                            <img className="cocktail-image" src={drink.strDrinkThumb} alt={drink.strDrink} />
                            <p className="cocktail-glass"><strong>Glass:</strong> {drink.strGlass}</p>
                            <p className="cocktail-category"><strong>Category:</strong> {drink.strCategory}</p>
                            
                            {/* Remove Favorite Button */}
                            <button 
                                className="remove-favorite-button"
                                onClick={() => removeFavorite(drink.idDrink)}
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
    );
};
