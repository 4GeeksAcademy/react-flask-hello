import React, { useState, useEffect } from "react";

const handleFetch = (setDrinks) => {
    fetch("https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list")
        .then((res) => res.json())
        .then((data) => {
            if (data.drinks) {
                setDrinks(data.drinks);
            } else {
                setDrinks([]);
            }
        })
        .catch((err) => console.error(err));
};

export const Custom = () => {
    const [drinks, setDrinks] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [matches, setMatches] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        // Fetch cocktails on app load
        handleFetch(setDrinks);
        // Extract ingredients from fetched data
        const extractIngredients = (cocktails) => {
            const allIngredients = cocktails.reduce((acc, drink) => {
                [...Array(15).keys()].forEach((i) => {
                    const ingredient = drink[`strIngredient${i + 1}`];
                    if (ingredient && !acc.includes(ingredient)) {
                        acc.push(ingredient);
                    }
                });
                return acc;
            }, []);
            setIngredients(allIngredients);
        };
        handleFetch((cocktails) => {
            extractIngredients(cocktails);
        });
    }, []);

    const handleIngredientToggle = (ingredient) => {
        const newSelected = selectedIngredients.includes(ingredient)
            ? selectedIngredients.filter((ing) => ing !== ingredient)
            : [...selectedIngredients, ingredient];

        setSelectedIngredients(newSelected);

        // Calculate matches
        const matchCount = drinks.filter((drink) =>
            newSelected.every((ing) => {
                return [...Array(15).keys()]
                    .map((i) => drink[`strIngredient${i + 1}`])
                    .includes(ing);
            })
        ).length;
        setMatches(matchCount);
    };

    const saveCustomSet = () => {
        const customSet = {
            name: `Custom Set ${new Date().toISOString()}`,
            ingredients: selectedIngredients,
        };
        const savedSets = JSON.parse(localStorage.getItem("customSets")) || [];
        localStorage.setItem("customSets", JSON.stringify([...savedSets, customSet]));
        setIsModalOpen(false);
    };
    console.log("drinks!!!", drinks)
    return (
        <div className="app mt-auto py-3 text-center">
            <button onClick={() => setIsModalOpen(true)}>My Ingredients</button>

            {/* Cocktail list */}
            <div className="Cocktail">
                {drinks.length > 0 && drinks && drinks !== "no data found" ?
                    drinks.map((drink) => (
                        <div key={drink.strIngredient1} className="drink">
                            <h2>{drink.strIngredient1}</h2>
                            {/* <img src={drink.strDrinkThumb} alt={drink.strDrink} />
                            <p><strong>Glass:</strong> {drink.strGlass}</p>
                            <p><strong>Category:</strong> {drink.strCategory}</p>
                            <p><strong>Ingredients:</strong></p>
                            <ul>
                                {[...Array(15).keys()].map((i) => {
                                    const ingredient = drink[`strIngredient${i + 1}`];
                                    return ingredient && <li key={i}>{ingredient}</li>;
                                })}
                            </ul>
                            <p><strong>Instructions:</strong> {drink.strInstructions}</p> */}
                        </div>
                    )
                    )
                    :
                    "No Drinks availabale!!!"

                }
            </div>

            {/* Modal for My Ingredients */}
            {isModalOpen && (
                <div className="modal">
                    <h2>Select Your Ingredients</h2>
                    {ingredients.map((ingredient) => (
                        <div key={ingredient}>
                            <input
                                type="checkbox"
                                checked={selectedIngredients.includes(ingredient)}
                                onChange={() => handleIngredientToggle(ingredient)}
                            />
                            <label>{ingredient}</label>
                        </div>
                    ))}
                    <div>Matches: {matches} cocktails</div>
                    <button onClick={saveCustomSet}>Save</button>
                    <button onClick={() => setIsModalOpen(false)}>Close</button>
                </div>
            )}
        </div>
    );
};
