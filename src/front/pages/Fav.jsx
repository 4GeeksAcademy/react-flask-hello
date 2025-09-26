import React, { useEffect, useState } from "react";
import "./Fav.css";
import { Link } from "react-router-dom";
import DashboardNavbar from "../components/DashboardNavbar";

function Fav() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFavorites = async () => {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("access_token");
        const res = await fetch("https://upgraded-system-7vgj4vjj6j52rx7j-3000.app.github.dev/api/favorites", {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) throw new Error("Failed to fetch your favorites");
        setFavorites(await res.json());
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchFavorites();
  }, []);

  return (
    <div className="fav-container">
      <DashboardNavbar />
      <h1>Favorites</h1>
      {loading && <p>Loading your favorite events...</p>}
      {error && <div className="fav-error">{error}</div>}
      <div className="fav-list">
        {favorites.length === 0 && !loading && !error && (
          <p>You have not added any favorite events yet.</p>
        )}
        {favorites.map(fav => (
          <div className="fav-card" key={fav.event_id || fav.id}>
            <h2>{fav.event_title || fav.title || `Event #${fav.event_id || fav.id}`}</h2>
            {fav.event_date && <p><strong>Date:</strong> {fav.event_date}</p>}
            {fav.event_location && <p><strong>Location:</strong> {fav.event_location}</p>}
            {fav.description && <p>{fav.description}</p>}
            <Link to={`/event/${fav.event_id || fav.id}`} className="fav-details-link">View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Fav;
