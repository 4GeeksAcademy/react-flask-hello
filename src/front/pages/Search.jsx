import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const handleSearch = (searchItem, setDrinks) => {
    if (!searchItem.trim()) {
        console.error("Search input is empty");
        return;
    }

    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchItem}`)
        .then(res => {
            if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
            return res.json();
        })
        .then(data => {
            if (data.drinks) {
                setDrinks(data.drinks);
            } else {
                setDrinks([]);
                console.error("No drinks found for this search");
            }
        })
        .catch(err => console.error("Fetch Error:", err));
};

export const Search = () => {
    const [search, setSearch] = useState("");
    const [drinks, setDrinks] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
        setFavorites(storedFavorites);
    }, []);

    const toggleFavorite = (drink) => {
        let updatedFavorites;
        if (favorites.some(fav => fav.idDrink === drink.idDrink)) {
            updatedFavorites = favorites.filter(fav => fav.idDrink !== drink.idDrink);
        } else {
            updatedFavorites = [...favorites, drink];
        }
        setFavorites(updatedFavorites);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    };

    const handleLogout = () => {
        localStorage.removeItem("token"); // Clear authentication token
        navigate("/logout"); // Redirect to logout page
    };

    return (
        <div className="search-page-container">
            {/* Button Container */}
            <div className="button-container">
                <button className="logout-action-button" onClick={handleLogout}>
                    Logout
                </button>
            </div>

            {/* Search Bar */}
            <div className="search-header">
                <input 
                    className="search-input-field"
                    placeholder="Search for a cocktail..." 
                    onChange={(e) => setSearch(e.target.value)} 
                    value={search} 
                />
                <button onClick={() => handleSearch(search, setDrinks)} className="search-action-button">
                    Search
                </button>
            </div>

            {/* Display Results */}
            <div className="results-container">
                {drinks.length > 0 ? (
                    drinks.map((drink) => (
                        <div key={drink.idDrink} className="cocktail-card-container">
                            <h2 className="cocktail-title-text">{drink.strDrink}</h2>
                            <img className="cocktail-thumbnail" src={drink.strDrinkThumb} alt={drink.strDrink} />
                            <p className="cocktail-glass-text"><strong>Glass:</strong> {drink.strGlass}</p>
                            <p className="cocktail-category-text"><strong>Category:</strong> {drink.strCategory}</p>
                            <p><strong>Ingredients:</strong></p>
                            <ul className="cocktail-ingredients-list">
                                {[...Array(15).keys()].map((i) => {
                                    const ingredient = drink[`strIngredient${i + 1}`];
                                    const measure = drink[`strMeasure${i + 1}`];
                                    return (
                                        ingredient && (
                                            <li key={i} className="cocktail-ingredient-item">
                                                {`${measure || ""} ${ingredient}`.trim()}
                                            </li>
                                        )
                                    );
                                })}
                            </ul>
                            <p className="cocktail-instructions-text"><strong>Instructions:</strong> {drink.strInstructions}</p>
                            
                            <button 
                                className="favorite-toggle-button"
                                onClick={() => toggleFavorite(drink)}
                            >
                                <img 
                                    src={favorites.some(fav => fav.idDrink === drink.idDrink) 
                                        ? "https://img.icons8.com/?size=48&id=LaLJUIEg4Miq&format=png" 
                                        : "https://img.icons8.com/?size=48&id=3294&format=png"} 
                                    alt="Favorite Icon" 
                                    className="favorite-icon-image"
                                />
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="no-results-message">No drinks found</p>
                )}
            </div>
        </div>
    );
};
