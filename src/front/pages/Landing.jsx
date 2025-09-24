import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faPoll, faStar, faBell, faUser, faBolt, faGlobe, faCamera, faLock, faMusic, faLaptop, faPalette, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import "./Landing.css";

export const Landing = () => {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const [events, setEvents] = useState([
        {
            id: 1,
            title: "Mock Music Festival",
            date: "2025-09-15",
            location: "Central Park",
            description: "A fun outdoor music festival for all ages.",
            rsvp: 42,
            icon: "🎵"
        },
        {
            id: 2,
            title: "Tech Conference",
            date: "2025-10-01",
            location: "Convention Center",
            description: "Join the latest in tech and innovation.",
            rsvp: 87,
            icon: "💻"
        },
        {
            id: 3,
            title: "Art Expo",
            date: "2025-11-05",
            location: "Art Gallery",
            description: "Explore modern art from local artists.",
            rsvp: 30,
            icon: "🎨"
        }
    ]);
    const [navOpen, setNavOpen] = useState(false);

    useEffect(() => {
        fetch("http://localhost:3001/api/events")
            .then(res => res.json())
            .then(data => setEvents(data))
            .catch(() => setEvents([]));
    }, []);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = 0.2; // 40%
        }
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
                    <Link to="/login" className="login" onClick={() => setNavOpen(false)}>Login</Link>
                    <Link to="/signup" className="signup" onClick={() => setNavOpen(false)}>Sign Up</Link>
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
                        <span className="feature-icon"><FontAwesomeIcon icon={faCalendarAlt} /></span>
                        <h5>My Events</h5>
                        <p>Create, view, and manage events.</p>
                    </div>
                    <div className="feature-card">
                        <span className="feature-icon"><FontAwesomeIcon icon={faPoll} /></span>
                        <h5>RSVP & Polling</h5>
                        <p>Let guests RSVP and vote on event options.</p>
                    </div>
                    <div className="feature-card">
                        <span className="feature-icon"><FontAwesomeIcon icon={faStar} /></span>
                        <h5>Favorites</h5>
                        <p>Save your favorite events and people.</p>
                    </div>
                    <div className="feature-card">
                        <span className="feature-icon"><FontAwesomeIcon icon={faBell} /></span>
                        <h5>Notifications</h5>
                        <p>Stay updated with event changes.</p>
                    </div>
                    <div className="feature-card">
                        <span className="feature-icon"><FontAwesomeIcon icon={faUser} /></span>
                        <h5>Profile</h5>
                        <p>Customize your experience.</p>
                    </div>
                </div>
            </section>


            {/* How It Works Section */}
            <section className="how-it-works" id="how-it-works">
                <h2 className="how-it-works-title">How It Works</h2>
                <div className="how-it-works-steps">
                    <div className="feature-card how-it-works-step">
                        <span className="how-it-works-icon feature-icon"><FontAwesomeIcon icon={faCalendarAlt} /></span>
                        <h5 className="how-it-works-step-title">Create an Event</h5>
                        <p className="how-it-works-step-desc">Set up your event in just a few clicks.</p>
                    </div>
                    <div className="feature-card how-it-works-step">
                        <span className="how-it-works-icon feature-icon"><FontAwesomeIcon icon={faBell} /></span>
                        <h5 className="how-it-works-step-title">Invite & Share</h5>
                        <p className="how-it-works-step-desc">Send invites and share your event link.</p>
                    </div>
                    <div className="feature-card how-it-works-step">
                        <span className="how-it-works-icon feature-icon"><FontAwesomeIcon icon={faStar} /></span>
                        <h5 className="how-it-works-step-title">Enjoy Together</h5>
                        <p className="how-it-works-step-desc">Track RSVPs and enjoy your event!</p>
                    </div>
                </div>
            </section>

            {/* Why E-Venture Section */}
            <section className="why" id="why">
                <h2>Why E-Venture?</h2>
                <div className="why-panels">
                    <div className="why-panel">
                        <span className="why-icon"><FontAwesomeIcon icon={faBolt} /></span>
                        <h5>Simple & Fast</h5>
                        <p>
                            Create and manage events in seconds with our intuitive interface. No tech skills required—just pure convenience!
                        </p>
                    </div>
                    <div className="why-panel">
                        <span className="why-icon"><FontAwesomeIcon icon={faGlobe} /></span>
                        <h5>Stay Connected</h5>
                        <p>
                            Effortlessly invite friends, family, or colleagues. Get instant updates and never miss an important event again.
                        </p>
                    </div>
                    <div className="why-panel">
                        <span className="why-icon"><FontAwesomeIcon icon={faCamera} /></span>
                        <h5>Memories That Last</h5>
                        <p>
                            Share photos, stories, and highlights. Relive your favorite moments and keep your event memories forever.
                        </p>
                    </div>
                    <div className="why-panel">
                        <span className="why-icon"><FontAwesomeIcon icon={faLock} /></span>
                        <h5>Private & Secure</h5>
                        <p>
                            Your data and events are protected with industry-standard security. You control who sees your events.
                        </p>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <TestimonialsCarousel />

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
const EventCard = ({ event }) => {
    let icon;
    switch (event.icon) {
        case "🎵": icon = faMusic; break;
        case "💻": icon = faLaptop; break;
        case "🎨": icon = faPalette; break;
        default: icon = faCalendarAlt;
    }
    return (
        <div className="event-card">
            <span className="event-icon"><FontAwesomeIcon icon={icon} /></span>
            <h4>{event.title}</h4>
            <p>
                {event.date} • {event.rsvp || "?"} RSVPs
            </p>
            {event.location && (
                <p>
                    <FontAwesomeIcon icon={faMapMarkerAlt} /> {event.location}
                </p>
            )}
            {event.description && (
                <p className="event-description">
                    {event.description}
                </p>
            )}
        </div>
    );
};

const TESTIMONIALS = [
    {
        text: "E-Venture made planning my birthday party a breeze!",
        author: "- Alex P."
    },
    {
        text: "I love how easy it is to RSVP and keep track of events.",
        author: "- Jamie L."
    },
    {
        text: "The notifications keep me updated on all my favorite events.",
        author: "- Morgan S."
    },
    {
        text: "The interface is so intuitive and fast.",
        author: "- Priya K."
    },
    {
        text: "I was able to organize a charity event in minutes.",
        author: "- Chris D."
    },
    {
        text: "My friends and I never miss an event now!",
        author: "- Taylor R."
    },
    {
        text: "The best event platform I've used.",
        author: "- Jordan M."
    },
    {
        text: "Love the privacy controls and reminders.",
        author: "- Sam W."
    },
    {
        text: "Sharing photos after the event is a great touch.",
        author: "- Riley F."
    }
];

const TESTIMONIALS_PER_PAGE = 3;
const FADE_DURATION = 500; // ms

function TestimonialsCarousel() {
    const [page, setPage] = useState(0);
    const [fade, setFade] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setFade(true);
            setTimeout(() => {
                setPage((prev) => (prev + 1) % Math.ceil(TESTIMONIALS.length / TESTIMONIALS_PER_PAGE));
                setFade(false);
            }, FADE_DURATION);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    const start = page * TESTIMONIALS_PER_PAGE;
    const current = TESTIMONIALS.slice(start, start + TESTIMONIALS_PER_PAGE);

    return (
        <section className="testimonials" id="testimonials">
            <h2 className="testimonials-title">What Our Users Say</h2>
            <div className={`testimonials-list fade-carousel${fade ? " fade-out" : " fade-in"}`}>
                {current.map((t, idx) => (
                    <div className="event-card testimonial-card" key={start + idx}>
                        <p className="testimonial-text">{t.text}</p>
                        <span className="testimonial-author">{t.author}</span>
                    </div>
                ))}
            </div>
        </section>
    );
}
export default Landing;