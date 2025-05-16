import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


export const MainPage = () => {
    const [drinks, setDrinks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail")
            .then(res => res.json())
            .then(data => {
                if (data.drinks) {
                    setDrinks(data.drinks);
                }
            })
            .catch(err => console.error("Error fetching drinks:", err));
    }, []);

    return (
        <div className="main-page-container">
            {/* Button Container */}
            <div className="button-container">
                <button className="nav-button" onClick={() => navigate("/custom")}>Custom</button>
                <button className="nav-button" onClick={() => navigate("/search")}>Search</button>
                <button className="nav-button" onClick={() => navigate("/find-spots")}>Find Spots</button>
                <button className="nav-button" onClick={() => navigate("/favorites")}>Favorites</button>
            </div>

            {/* Floating Drinks */}
            {drinks.map((drink, index) => (
                <img 
                    key={drink.idDrink} 
                    src={drink.strDrinkThumb} 
                    alt={drink.strDrink} 
                    className="floating-drink"
                    style={{
                        top: `${Math.random() * 80}vh`, /* Restrict drinks from going over buttons */
                        left: `${Math.random() * 100}vw`,
                        animationDelay: `${index * 2}s`
                    }}
                />
            ))}
        </div>
    );
};

export default MainPage;
