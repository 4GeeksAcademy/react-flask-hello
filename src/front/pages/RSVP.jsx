
import React, { useEffect, useState } from "react";
import "./RSVP.css";
import { Link } from "react-router-dom";

function RSVP() {
  const [rsvps, setRsvps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRSVPs = async () => {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("access_token");
        const res = await fetch("https://upgraded-system-7vgj4vjj6j52rx7j-3000.app.github.dev/api/my-rsvps", {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) throw new Error("Failed to fetch your RSVPs");
        setRsvps(await res.json());
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRSVPs();
  }, []);

  return (
    <div className="rsvp-container">
      <h1>My RSVPs</h1>
      {loading && <p>Loading your RSVPs...</p>}
      {error && <div className="rsvp-error">{error}</div>}
      <div className="rsvp-list">
        {rsvps.length === 0 && !loading && !error && (
          <p>You have not RSVPed to any events yet.</p>
        )}
        {rsvps.map(rsvp => (
          <div className="rsvp-card" key={rsvp.event_id}>
            <h2>{rsvp.event_title}</h2>
            <p><strong>Date:</strong> {rsvp.event_date}</p>
            <p><strong>Location:</strong> {rsvp.event_location}</p>
            <p><strong>Status:</strong> {rsvp.status}</p>
            <Link to={`/event/${rsvp.event_id}`} className="rsvp-details-link">View Event</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RSVP;
