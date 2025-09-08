import React, { useState, useEffect } from "react";

const handleSearch = (searchItem, setDrinks) => {
    fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + searchItem, {
        method: "GET",
        mode: "cors"
    })
        .then(res => res.json())
        .then(data => {
            if (data.drinks) {
                setDrinks(data.drinks);
            } else {
                setDrinks([]);
            }
        })
        .catch(err => console.error(err));
};

export const Search = () => {
    const [search, setSearch] = useState("");
    const [drinks, setDrinks] = useState([]);

    useEffect(() => {
        if (search) {
            handleSearch(search, setDrinks);
        }
    }, [search]);

    return (
        <div className="search mt-auto py-3 text-center">
            <div className="cocktail">
                <input
                    placeholder="Search for a cocktail"
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <div className="Cocktail">
                {drinks.map((drink) => (
                    <div key={drink.idDrink} className="drink">
                        <h2>{drink.strDrink}</h2>
                        <img src={drink.strDrinkThumb} alt={drink.strDrink} />
                        <p><strong>Glass:</strong> {drink.strGlass}</p>
                        <p><strong>Category:</strong> {drink.strCategory}</p>
                        <p><strong>Ingredients:</strong></p>
                        <ul>
                            {[...Array(15).keys()].map((i) => {
                                const ingredient = drink[`strIngredient${i + 1}`];
                                const measure = drink[`strMeasure${i + 1}`];
                                return (
                                    ingredient && (
                                        <li key={i}>{`${measure || ""} ${ingredient}`.trim()}</li>
                                    )
                                );
                            })}
                        </ul>
                        <p><strong>Instructions:</strong> {drink.strInstructions}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};
