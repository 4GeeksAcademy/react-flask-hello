import React from "react";
import "./LandingPage.css";

const features = [
    { icon: "📅", title: "My Events", desc: "Create, view, and manage events." },
    { icon: "🗳️", title: "RSVP & Polling", desc: "Let guests RSVP and vote on event options." },
    { icon: "⭐", title: "Favorites", desc: "Save your favorite events and people." },
    { icon: "🔔", title: "Notifications", desc: "Stay updated with event changes." },
    { icon: "👤", title: "Profile", desc: "Customize your experience." },
];

const upcomingEvents = [
    { icon: "🎵", title: "Concert Night", date: "Sep 10, 2025", rsvp: 42 },
    { icon: "🍴", title: "Foodie Meetup", date: "Sep 15, 2025", rsvp: 28 },
    { icon: "💻", title: "Tech Hackathon", date: "Sep 20, 2025", rsvp: 65 },
];

const whyPanels = [
    { icon: "⚡", title: "Simple & Fast", desc: "Easy event planning." },
    { icon: "🌐", title: "Stay Connected", desc: "RSVP, follow, and interact." },
    { icon: "📸", title: "Memories That Last", desc: "Capture and revisit your events." },
];

export default function LandingPage() {
    return (
        <div className="ev-landing">
            {/* Navbar */}
            <nav className="ev-navbar">
                <div className="ev-logo">E-Venture</div>
                <div className="ev-navlinks">
                    <a href="#home">Home</a>
                    <a href="#features">Features</a>
                    <a href="#events">Events</a>
                    <a href="#why">Why E-Venture</a>
                    <a href="/signup" className="ev-signup">Sign Up</a>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="ev-hero" id="home">
                <video autoPlay loop muted className="ev-hero-video">
                    <source src="/videos/city-night.mp4" type="video/mp4" />
                </video>
                <div className="ev-hero-overlay">
                    <h1>Where Every Event Becomes a Story</h1>
                    <p>Plan, share, and remember your events.</p>
                    <div className="ev-hero-btns">
                        <a href="/signup" className="ev-btn ev-btn-primary">Get Started</a>
                        <a href="#features" className="ev-btn ev-btn-secondary">See How It Works</a>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="ev-features" id="features">
                <h2>Features</h2>
                <div className="ev-features-grid">
                    {features.map((f, i) => (
                        <div className="ev-feature-card" key={i}>
                            <span className="ev-feature-icon">{f.icon}</span>
                            <h3>{f.title}</h3>
                            <p>{f.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Upcoming Events Carousel */}
            <section className="ev-events" id="events">
                <h2>Upcoming Events</h2>
                <div className="ev-events-carousel">
                    {upcomingEvents.map((e, i) => (
                        <div className="ev-event-card" key={i}>
                            <span className="ev-event-icon">{e.icon}</span>
                            <h4>{e.title}</h4>
                            <p>{e.date} • {e.rsvp} RSVPs</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Why E-Venture Section */}
            <section className="ev-why" id="why">
                <h2>Why E-Venture?</h2>
                <div className="ev-why-panels">
                    {whyPanels.map((p, i) => (
                        <div className="ev-why-panel" key={i}>
                            <span className="ev-why-icon">{p.icon}</span>
                            <h3>{p.title}</h3>
                            <p>{p.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="ev-cta">
                <h2>Ready to start your next adventure?</h2>
                <a href="/signup" className="ev-btn ev-btn-primary ev-cta-btn">Sign Up Free</a>
            </section>

            {/* Footer */}
            <footer className="ev-footer">
                <div className="ev-footer-links">
                    <a href="/about">About</a>
                    <a href="/contact">Contact</a>
                    <a href="/terms">Terms</a>
                    <a href="/privacy">Privacy</a>
                </div>
                <div className="ev-footer-social">
                    <a href="#"><img src="/icons/facebook.svg" alt="Facebook" /></a>
                    <a href="#"><img src="/icons/twitter.svg" alt="Twitter" /></a>
                    <a href="#"><img src="/icons/instagram.svg" alt="Instagram" /></a>
                </div>
                <p>© 2025 E-Venture. All Rights Reserved.</p>
            </footer>
        </div>
    );
}