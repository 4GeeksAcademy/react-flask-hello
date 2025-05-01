import React, { useState, useEffect } from "react";

const handleFetch = (setIngredients) => {
    fetch("https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list")
        .then((res) => res.json())
        .then((data) => {
            if (data.drinks) {
                // Add placeholder images for each ingredient
                const ingredientsWithImages = data.drinks.map((drink) => ({
                    ...drink,
                    image: `https://www.thecocktaildb.com/images/ingredients/${drink.strIngredient1}-Medium.png`,
                }));
                setIngredients(ingredientsWithImages);
            } else {
                setIngredients([]);
            }
        })
        .catch((err) => console.error(err));
};

export const Custom = () => {
    const [ingredients, setIngredients] = useState([]);
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [matches, setMatches] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        // Fetch ingredients with images when the component mounts
        handleFetch(setIngredients);
    }, []);

    const handleIngredientToggle = (ingredient) => {
        const newSelected = selectedIngredients.includes(ingredient)
            ? selectedIngredients.filter((ing) => ing !== ingredient)
            : [...selectedIngredients, ingredient];

        setSelectedIngredients(newSelected);
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

    return (
        <div className="app mt-auto py-3 text-center">
            <button onClick={() => setIsModalOpen(true)}>My Ingredients</button>

            {/* Ingredient list (cards for each ingredient) */}
            <div className="Cocktail">
                {ingredients.length > 0
                    ? ingredients.map((drink) => (
                        <div key={drink.strIngredient1} className="drink">
                            <h2>{drink.strIngredient1}</h2>
                            <img
                                src={drink.image}
                                alt={drink.strIngredient1}
                                style={{ width: "100px", height: "100px", objectFit: "cover" }}
                            />
                            <div>
                                <input
                                    type="checkbox"
                                    checked={selectedIngredients.includes(drink.strIngredient1)}
                                    onChange={() => handleIngredientToggle(drink.strIngredient1)}
                                />
                                <label>Select</label>
                            </div>
                        </div>
                    ))
                    : "No Ingredients Available!"
                }
            </div>

            {/* Modal for selecting ingredients */}
            {isModalOpen && (
                <div className="modal">
                    <h2>Select Your Ingredients</h2>
                    {ingredients.map((drink) => (
                        <div key={drink.strIngredient1} className="ingredient-card">
                            <input
                                type="checkbox"
                                checked={selectedIngredients.includes(drink.strIngredient1)}
                                onChange={() => handleIngredientToggle(drink.strIngredient1)}
                            />
                            <label>{drink.strIngredient1}</label>
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