import React, { useState } from "react";
import "./favorites.css";
const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  return (
    <div className="favorites-container">
      <h2>My Favorite Recipes</h2>
      <div className="favorites-list">
        {favorites.length > 0 ? (
          favorites.map((recipe) => (
            <div key={recipe.id} className="favorite-item">
              <h3>{recipe.title}</h3>
              {/* Add more details or an option to remove from favorites */}
            </div>
          ))
        ) : (
          <p>No favorite recipes added yet!</p>
        )}
      </div>
    </div>
  );
};

export default Favorites;
