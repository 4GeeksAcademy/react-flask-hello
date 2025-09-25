import React, { useEffect, useState } from "react";
import "./MyEvents.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

function MyEvents() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchMyEvents = async () => {
            setLoading(true);
            setError("");
            try {
                const token = localStorage.getItem("access_token");
                const res = await fetch("https://upgraded-system-7vgj4vjj6j52rx7j-3000.app.github.dev/api/my-events", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (!res.ok) throw new Error("Failed to fetch your events");
                const data = await res.json();
                if (Array.isArray(data) && data.length > 0) {
                    setEvents(data);
                } else {
                    // Fallback demo events if API returns empty
                    setEvents([
                        {
                            id: 1,
                            title: "React Summit 2025",
                            date: "2025-10-10",
                            location: "Online",
                            description: "A global conference for React enthusiasts.",
                        },
                        {
                            id: 2,
                            title: "FlaskCon",
                            date: "2025-11-05",
                            location: "New York, NY",
                            description: "Annual gathering for Flask developers.",
                        }
                    ]);
                }
            } catch (err) {
                setError(err.message);
                // Fallback demo events if API fails
                setEvents([
                    {
                        id: 1,
                        title: "React Summit 2025",
                        date: "2025-10-10",
                        location: "Online",
                        description: "A global conference for React enthusiasts.",
                    },
                    {
                        id: 2,
                        title: "FlaskCon",
                        date: "2025-11-05",
                        location: "New York, NY",
                        description: "Annual gathering for Flask developers.",
                    }
                ]);
            } finally {
                setLoading(false);
            }
        };
        fetchMyEvents();
    }, []);

    return (
        <div className="myevents-container" style={{ background: '#f8f9fa', minHeight: '100vh' }}>
            {/* Dashboard Navbar */}
            <nav className="dashboard-navbar" style={{ background: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px #23234a11', marginBottom: '2rem', padding: '1rem 2rem', display: 'flex', justifyContent: 'center' }}>
                <ul style={{ display: 'flex', gap: '2rem', listStyle: 'none', margin: 0, padding: 0, alignItems: 'center' }}>
                    <li><Link to="/dashboard" style={{ color: '#23234a', fontWeight: 600, textDecoration: 'none', fontSize: '1.1rem' }}>Dashboard</Link></li>
                    <li><Link to="/discover" style={{ color: '#ff7c2d', fontWeight: 600, textDecoration: 'none', fontSize: '1.1rem' }}>Discover</Link></li>
                    <li><Link to="/myevents" style={{ color: '#ff7c2d', fontWeight: 600, textDecoration: 'none', fontSize: '1.1rem' }}>My Events</Link></li>
                    <li><Link to="/rsvp" style={{ color: '#ff7c2d', fontWeight: 600, textDecoration: 'none', fontSize: '1.1rem' }}>RSVP</Link></li>
                    <li><Link to="/fav" style={{ color: '#ff7c2d', fontWeight: 600, textDecoration: 'none', fontSize: '1.1rem' }}>Favorites</Link></li>
                    <li><Link to="/profile" style={{ color: '#23234a', fontWeight: 600, textDecoration: 'none', fontSize: '1.1rem' }}>Profile</Link></li>
                    <li><Link to="/" style={{ color: '#007bff', fontWeight: 600, textDecoration: 'none', fontSize: '1.1rem' }}>Logout</Link></li>
                </ul>
            </nav>
            {/* Hero-style header */}
            <section className="myevents-hero" style={{ background: '#23234a', color: '#fff', borderRadius: '0 0 32px 32px', padding: '2.5rem 2rem 2rem 2rem', marginBottom: '2rem', textAlign: 'center', boxShadow: '0 2px 16px #23234a22' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '0.5rem', letterSpacing: '2px' }}>My Events</h1>
                <p style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>Manage and view your created events.</p>
            </section>
            {loading && <p style={{ color: '#23234a', fontSize: '1.1rem', textAlign: 'center' }}>Loading your events...</p>}
            {error && <div className="my-events-error" style={{ color: '#ff2d75', textAlign: 'center', marginBottom: '1rem' }}>{error}</div>}
            <div className="myevents-list" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', justifyItems: 'stretch', alignItems: 'stretch' }}>
                {events.length === 0 && !loading && !error && (
                    <p style={{ color: '#23234a', fontSize: '1.2rem', textAlign: 'center' }}>You haven't created any events yet.</p>
                )}
                {events.map(event => (
                    <div className="myevents-card" key={event.id} style={{ background: '#fff', borderRadius: '16px', boxShadow: '0 2px 8px #23234a11', padding: '2rem 1.5rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <span className="feature-icon" style={{ fontSize: '2.2rem', color: '#ff7c2d', marginBottom: '0.5rem' }}><FontAwesomeIcon icon={faCalendarAlt} /></span>
                        <h2 style={{ color: '#23234a', marginBottom: '0.5rem' }}>{event.title}</h2>
                        <p style={{ color: '#007bff', marginBottom: '0.5rem' }}><FontAwesomeIcon icon={faMapMarkerAlt} /> {event.location}</p>
                        <p style={{ color: '#23234a', marginBottom: '0.5rem' }}><strong>Date:</strong> {event.date}</p>
                        <p style={{ color: '#555', marginBottom: '1rem' }}>{event.description}</p>
                        <Link to={`/event/${event.id}`} className="myevents-details-link" style={{ background: '#ff7c2d', color: '#fff', borderRadius: '25px', padding: '0.5rem 1.5rem', fontWeight: 600, textDecoration: 'none', marginTop: '0.5rem' }}>View Details</Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MyEvents;
