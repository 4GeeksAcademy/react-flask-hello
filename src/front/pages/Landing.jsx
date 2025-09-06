import React, { useEffect, useState } from "react";
import "./Landing.css";

// Example fetch for events (replace with your real API endpoint)
const EVENTS_API_URL = "http://localhost:3001/api/events";

export const Landing = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetch(EVENTS_API_URL)
            .then(res => res.json())
            .then(data => setEvents(data))
            .catch(() => setEvents([]));
    }, []);

    return (
        <div>
            {/* Background Music */}
            <audio autoPlay loop>
                <source src="/background-music.mp3" type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>

            {/* Navbar */}
            <nav className="navbar">
                <span className="logo">E-Venture</span>
                <div className="nav-links">
                    <a href="#home">Home</a>
                    <a href="#features">Features</a>
                    <a href="#why">Why E-Venture</a>
                    <a href="/signup" className="signup">Sign Up</a>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="hero" id="home">
                <video autoPlay loop muted className="hero-video">
                    <source src="https://assets.mixkit.co/videos/348/348-720.mp4" type="video/mp4" />
                </video>
                <div className="hero-overlay">
                    <h1>Where Every Event Becomes a Story</h1>
                    <p>Plan, share, and remember your events.</p>
                    <div className="cta-buttons">
                        <a href="/signup" className="btn btn-primary">Get Started</a>
                        <a href="#features" className="btn btn-secondary">See How It Works</a>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features" id="features">
                <h2>Features</h2>
                <div className="features-grid">
                    <div className="feature-card">
                        <span className="feature-icon">📅</span>
                        <h5>My Events</h5>
                        <p>Create, view, and manage events.</p>
                    </div>
                    <div className="feature-card">
                        <span className="feature-icon">🗳️</span>
                        <h5>RSVP & Polling</h5>
                        <p>Let guests RSVP and vote on event options.</p>
                    </div>
                    <div className="feature-card">
                        <span className="feature-icon">⭐</span>
                        <h5>Favorites</h5>
                        <p>Save your favorite events and people.</p>
                    </div>
                    <div className="feature-card">
                        <span className="feature-icon">🔔</span>
                        <h5>Notifications</h5>
                        <p>Stay updated with event changes.</p>
                    </div>
                    <div className="feature-card">
                        <span className="feature-icon">👤</span>
                        <h5>Profile</h5>
                        <p>Customize your experience.</p>
                    </div>
                </div>
            </section>

            {/* Upcoming Events Section */}
            <section className="events" id="events">
                <h2>Upcoming Events</h2>
                <div className="events-list">
                    {events.length === 0 ? (
                        <div className="event-card">No events found.</div>
                    ) : (
                        events.map((event, idx) => (
                            <EventCard event={event} key={idx} />
                        ))
                    )}
                </div>
            </section>

            {/* Why E-Venture Section */}
            <section className="why" id="why">
                <h2>Why E-Venture?</h2>
                <div className="why-panels">
                    <div className="why-panel">
                        <span className="why-icon">⚡</span>
                        <h5>Simple & Fast</h5>
                        <p>Easy event planning.</p>
                    </div>
                    <div className="why-panel">
                        <span className="why-icon">🌐</span>
                        <h5>Stay Connected</h5>
                        <p>RSVP, follow, and interact.</p>
                    </div>
                    <div className="why-panel">
                        <span className="why-icon">📸</span>
                        <h5>Memories That Last</h5>
                        <p>Capture and revisit your events.</p>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta">
                <h2>Ready to start your next adventure?</h2>
                <a href="/signup" className="btn btn-primary cta-btn">Sign Up Free</a>
            </section>

            {/* Footer */}
            <footer className="footer">
                <div className="footer-links">
                    <a href="/about">About</a>
                    <a href="/contact">Contact</a>
                    <a href="/terms">Terms</a>
                    <a href="/privacy">Privacy</a>
                </div>
                <p className="mb-0">© 2025 E-Venture. All Rights Reserved.</p>
            </footer>
        </div>
    );
};

const EventCard = ({ event }) => (
    <div className="event-card">
        <span className="event-icon">{event.icon || "🎉"}</span>
        <h4>{event.title}</h4>
        <p>{event.date} • {event.rsvp || "?"} RSVPs</p>
        {event.location && (
            <p><span role="img" aria-label="location">📍</span> {event.location}</p>
        )}
    </div>
);
