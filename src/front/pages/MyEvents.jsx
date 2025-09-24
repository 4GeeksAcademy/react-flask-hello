import React, { useEffect, useState } from "react";
import "./MyEvents.css";
import { Link } from "react-router-dom";

function MyEvents() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchMyEvents = async () => {
            setLoading(true);
            setError("");
            try {
                // Replace with your real API endpoint
                const token = localStorage.getItem("access_token");
                const res = await fetch("https://upgraded-system-7vgj4vjj6j52rx7j-3000.app.github.dev/api/my-events", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (!res.ok) throw new Error("Failed to fetch your events");
                setEvents(await res.json());
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchMyEvents();
    }, []);

    return (
        <div className="my-events-container">
            <h1>My Events</h1>
            {loading && <p>Loading your events...</p>}
            {error && <div className="my-events-error">{error}</div>}
            <div className="my-events-list">
                {events.length === 0 && !loading && !error && (
                    <p>You have not created or joined any events yet.</p>
                )}
                {events.map(event => (
                    <div className="my-event-card" key={event.id}>
                        <h2>{event.title}</h2>
                        <p><strong>Date:</strong> {event.date}</p>
                        <p><strong>Location:</strong> {event.location}</p>
                        <p>{event.description}</p>
                        <Link to={`/event/${event.id}`} className="my-event-details-link">View Details</Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MyEvents;
