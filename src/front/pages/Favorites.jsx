import React, { useState, useEffect } from "react";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");

  // Fetch favorites from the API
  const fetchFavorites = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token"); // Assuming a token is stored in localStorage after login
      const response = await fetch("/favorites", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch favorites");
      }

      const data = await response.json();
      setFavorites(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch username from the API or local storage
  const fetchUsername = () => {
    const storedUsername = localStorage.getItem("username"); // Assuming username is stored locally
    setUsername(storedUsername || "Guest"); // Default to "Guest" if no username is available
  };

  // Remove a favorite cocktail
  const removeFavorite = async (cocktailId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/favorites/${cocktailId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to remove favorite");
      }

      // Update the favorites list after removal
      setFavorites(favorites.filter((fav) => fav.id !== cocktailId));
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchFavorites();
    fetchUsername();
  }, []);

  return (
    <div className="favorites-container" style={{ padding: "20px" }}>
      {/* Logo Section */}
      <div className="logo-container" style={{ position: "absolute", top: "60px", left: "20px" }}>
        <img
          src="/path-to-your-logo.png" // Replace with the actual path to your logo
          alt="Logo"
          style={{ width: "100px", height: "auto" }}
        />
      </div>

      {/* User Info Section */}
      <div
        className="user-info"
        style={{
          position: "absolute",
          top: "60px",
          right: "20px",
          textAlign: "right",
          fontSize: "16px",
        }}
      >
        <p>
          Welcome, <strong>{username}</strong>!
        </p>
        <p style={{ color: "gray", fontStyle: "italic" }}>Enjoy your favorite cocktails and mocktails!</p>
      </div>

      <h1>My Favorite Cocktails</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="favorites-grid" style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {favorites.length > 0 ? (
          favorites.map((cocktail) => (
            <div
              className="card"
              key={cocktail.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "20px",
                width: "250px",
                textAlign: "center",
              }}
            >
              <img
                src={cocktail.image_url}
                alt={cocktail.name}
                style={{
                  width: "100%",
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />
              <h3>{cocktail.name}</h3>
              <p>
                <strong>Glass:</strong> {cocktail.glass_type}
              </p>
              <p>
                <strong>Alcoholic:</strong> {cocktail.alcoholic ? "Yes" : "No"}
              </p>
              <p>{cocktail.instructions}</p>
              <button
                onClick={() => removeFavorite(cocktail.id)}
                style={{
                  marginTop: "10px",
                  padding: "10px 20px",
                  backgroundColor: "#ff4d4d",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Remove Favorite
              </button>
            </div>
          ))
        ) : (
          <p>You have no favorite cocktails yet.</p>
        )}
      </div>
    </div>
  );
};

export default Favorites;
