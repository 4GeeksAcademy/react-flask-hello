import React, { useEffect, useRef, useState } from "react";
import "./Landing.css";

export const Landing = () => {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const [events, setEvents] = useState([]);
    const [navOpen, setNavOpen] = useState(false);

    useEffect(() => {
        fetch("http://localhost:3001/api/events")
            .then(res => res.json())
            .then(data => setEvents(data))
            .catch(() => setEvents([]));
    }, []);

    const handleToggleMusic = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    // Navbar toggle for mobile
    const handleNavToggle = () => setNavOpen(!navOpen);

    return (
        <div>
            {/* Background Music with Play/Pause */}
            <audio ref={audioRef} autoPlay loop>
                <source src="/background-music.mp3" type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>

            {/* Navbar */}
            <nav className="navbar">
                <span className="logo">E-Venture</span>
                <button
                    className="navbar-toggle"
                    aria-label="Toggle navigation"
                    onClick={handleNavToggle}
                >
                    <span className="navbar-toggle-icon">&#9776;</span>
                </button>
                <div className={`nav-links${navOpen ? " open" : ""}`}>
                    <a href="#home" onClick={() => setNavOpen(false)}>Home</a>
                    <a href="#features" onClick={() => setNavOpen(false)}>Features</a>
                    <a href="#how-it-works" onClick={() => setNavOpen(false)}>How It Works</a>
                    <a href="#why" onClick={() => setNavOpen(false)}>Why E-Venture</a>
                    <a href="#testimonials" onClick={() => setNavOpen(false)}>Testimonials</a>
                    <a href="/signup" className="signup" onClick={() => setNavOpen(false)}>Sign Up</a>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="hero" id="home" style={{ position: "relative" }}>
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
                <button
                    onClick={handleToggleMusic}
                    className="music-toggle-btn"
                    aria-label={isPlaying ? "Pause music" : "Play music"}
                >
                    {isPlaying ? <span>&#10073;&#10073;</span> : <span>&#9654;</span>}
                </button>
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

            {/* Upcoming Events Section (Styled) */}
            <section className="events" id="events">
                <h2>Upcoming Events</h2>
                <div className="events-list">
                    {events.length === 0 ? (
                        <div className="event-card">No events found.</div>
                    ) : (
                        events.map((event) => (
                            <EventCard event={event} key={event.id} />
                        ))
                    )}
                </div>
            </section>

            {/* How It Works Section */}
            <section className="how-it-works" id="how-it-works">
                <h2 className="how-it-works-title">How It Works</h2>
                <div className="how-it-works-steps">
                    <div className="feature-card how-it-works-step">
                        <span className="how-it-works-icon feature-icon">📝</span>
                        <h5 className="how-it-works-step-title">Create an Event</h5>
                        <p className="how-it-works-step-desc">Set up your event in just a few clicks.</p>
                    </div>
                    <div className="feature-card how-it-works-step">
                        <span className="how-it-works-icon feature-icon">📢</span>
                        <h5 className="how-it-works-step-title">Invite & Share</h5>
                        <p className="how-it-works-step-desc">Send invites and share your event link.</p>
                    </div>
                    <div className="feature-card how-it-works-step">
                        <span className="how-it-works-icon feature-icon">🎉</span>
                        <h5 className="how-it-works-step-title">Enjoy Together</h5>
                        <p className="how-it-works-step-desc">Track RSVPs and enjoy your event!</p>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="testimonials" id="testimonials">
                <h2 className="testimonials-title">What Our Users Say</h2>
                <div className="testimonials-list">
                    <div className="event-card testimonial-card">
                        <p className="testimonial-text">"E-Venture made planning my birthday party a breeze!"</p>
                        <span className="testimonial-author">- Alex P.</span>
                    </div>
                    <div className="event-card testimonial-card">
                        <p className="testimonial-text">"I love how easy it is to RSVP and keep track of events."</p>
                        <span className="testimonial-author">- Jamie L.</span>
                    </div>
                    <div className="event-card testimonial-card">
                        <p className="testimonial-text">"The notifications keep me updated on all my favorite events."</p>
                        <span className="testimonial-author">- Morgan S.</span>
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
        <p>
            {event.date} • {event.rsvp || "?"} RSVPs
        </p>
        {event.location && (
            <p>
                <span role="img" aria-label="location">📍</span> {event.location}
            </p>
        )}
        {event.description && (
            <p className="event-description">
                {event.description}
            </p>
        )}
    </div>
);


