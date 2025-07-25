import React, { useState } from "react";

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

    return (
        <div className="search-container">
            <div className="search-bar">
                <input 
                    className="search-input"
                    placeholder="Search for a cocktail..." 
                    onChange={(e) => setSearch(e.target.value)} 
                    value={search} 
                />
                <button onClick={() => handleSearch(search, setDrinks)} className="search-button">
                    Search
                </button>
            </div>

            {/* Display the fetched drinks */}
            <div className="cocktail-list">
                {drinks.length > 0 ? (
                    drinks.map((drink) => (
                        <div key={drink.idDrink} className="cocktail-card">
                            <h2 className="cocktail-title">{drink.strDrink}</h2>
                            <img className="cocktail-image" src={drink.strDrinkThumb} alt={drink.strDrink} />
                            <p className="cocktail-glass"><strong>Glass:</strong> {drink.strGlass}</p>
                            <p className="cocktail-category"><strong>Category:</strong> {drink.strCategory}</p>
                            <p><strong>Ingredients:</strong></p>
                            <ul className="ingredient-list">
                                {[...Array(15).keys()].map((i) => {
                                    const ingredient = drink[`strIngredient${i + 1}`];
                                    const measure = drink[`strMeasure${i + 1}`];
                                    return (
                                        ingredient && (
                                            <li key={i} className="ingredient-item">
                                                {`${measure || ""} ${ingredient}`.trim()}
                                            </li>
                                        )
                                    );
                                })}
                            </ul>
                            <p className="cocktail-instructions"><strong>Instructions:</strong> {drink.strInstructions}</p>
                        </div>
                    ))
                ) : (
                    <p className="no-results">No drinks found</p>
                )}
            </div>
        </div>
    );
};
