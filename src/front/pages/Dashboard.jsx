import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faStar, faBell, faUser, faBolt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import DashboardNavbar from '../components/DashboardNavbar';
import Favorites from "./Favorites.jsx";

function Dashboard() {
    const [profile, setProfile] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [editProfile, setEditProfile] = useState({ first_name: '', last_name: '', email: '' });
    const [updateMsg, setUpdateMsg] = useState('');
    const [events, setEvents] = useState([]);
    const [rsvpMsg, setRsvpMsg] = useState('');
    // RSVP to event
    const handleRSVP = async (eventId, response) => {
        setRsvpMsg('');
        try {
            const res = await fetch(`https://upgraded-system-7vgj4vjj6j52rx7j-3000.app.github.dev/api/events/${eventId}/rsvp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ response })
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || data.msg || 'Failed to RSVP');
            setRsvpMsg(`RSVP updated for event #${eventId}`);
        } catch (err) {
            setRsvpMsg(err.message);
        }
    };
    const [favorites, setFavorites] = useState([]);
    const [favMsg, setFavMsg] = useState('');
    // Remove favorite event
    const handleRemoveFavorite = async (eventId) => {
        setFavMsg('');
        try {
            const res = await fetch(`https://upgraded-system-7vgj4vjj6j52rx7j-3000.app.github.dev/api/favorites/${eventId}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || data.msg || 'Failed to remove favorite');
            setFavorites(favorites.filter(fav => fav.event_id !== eventId));
            setFavMsg('Favorite removed!');
        } catch (err) {
            setFavMsg(err.message);
        }
    };
    const [error, setError] = useState('');

    // Get token from localStorage (if you store it after login)
    const token = localStorage.getItem('access_token');

    useEffect(() => {
        // Fetch user profile
        const fetchProfile = async () => {
            try {
                const res = await fetch('https://upgraded-system-7vgj4vjj6j52rx7j-3000.app.github.dev/api/profile', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (!res.ok) throw new Error('Failed to fetch profile');
                const data = await res.json();
                setProfile(data);
                setEditProfile({
                    first_name: data.first_name || '',
                    last_name: data.last_name || '',
                    email: data.email || ''
                });
            } catch (err) {
                setError(err.message);
            }
        };
        // Fetch events
        const fetchEvents = async () => {
            try {
                const res = await fetch('https://upgraded-system-7vgj4vjj6j52rx7j-3000.app.github.dev/api/events');
                if (!res.ok) throw new Error('Failed to fetch events');
                setEvents(await res.json());
            } catch (err) {
                setError(err.message);
            }
        };
        // Fetch favorites
        const fetchFavorites = async () => {
            try {
                const res = await fetch('https://upgraded-system-7vgj4vjj6j52rx7j-3000.app.github.dev/api/favorites', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (!res.ok) throw new Error('Failed to fetch favorites');
                setFavorites(await res.json());
            } catch (err) {
                setError(err.message);
            }
        };
        if (token) {
            fetchProfile();
            fetchFavorites();
        }
        fetchEvents();
    }, [token]);

    // Handle profile edit form
    const handleEditChange = e => {
        setEditProfile({ ...editProfile, [e.target.name]: e.target.value });
    };

    const handleEditSubmit = async e => {
        e.preventDefault();
        setUpdateMsg('');
        try {
            const res = await fetch('https://upgraded-system-7vgj4vjj6j52rx7j-3000.app.github.dev/api/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(editProfile)
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.msg || 'Failed to update profile');
            setUpdateMsg('Profile updated!');
            setEditMode(false);
            setProfile({ ...profile, ...editProfile });
        } catch (err) {
            setUpdateMsg(err.message);
        }
    };

    // Placeholder data for widgets
    const stats = {
        eventsAttended: 5,
        rsvps: 3,
        favorites: 2
    };
    const notifications = [
        { id: 1, message: "You have a new event invitation!" },
        { id: 2, message: "Event 'React Summit' starts tomorrow." }
    ];
    const upcomingEvent = {
        title: "React Summit",
        date: "2025-09-30",
        location: "Online"
    };

    return (
        <div className="dashboard-container" style={{ background: '#f8f9fa', minHeight: '100vh' }}>
            <DashboardNavbar />
            {/* Hero-style header */}
            <section className="dashboard-hero" style={{ background: '#23234a', color: '#fff', borderRadius: '0 0 32px 32px', padding: '2.5rem 2rem 2rem 2rem', marginBottom: '2rem', textAlign: 'center', boxShadow: '0 2px 16px #23234a22' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '0.5rem', letterSpacing: '2px' }}>Welcome, {profile ? profile.first_name : 'User'}!</h1>
                <p style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>Your event adventure starts here.</p>
                <div className="dashboard-cta-buttons" style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <Link to="/discover" className="btn btn-primary" style={{ background: '#ff7c2d', color: '#fff', borderRadius: '25px', padding: '0.7rem 2rem', fontWeight: 600, fontSize: '1rem', textDecoration: 'none' }}>Find Events</Link>
                    <Link to="/createevent" className="btn btn-secondary" style={{ background: '#fff', color: '#23234a', border: '1px solid #ff7c2d', borderRadius: '25px', padding: '0.7rem 2rem', fontWeight: 600, fontSize: '1rem', textDecoration: 'none' }}>Create Event</Link>
                </div>
            </section>
            {error && <div className="dashboard-error">{error}</div>}
            <div className="dashboard-widgets" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', justifyItems: 'stretch', alignItems: 'stretch' }}>
                {/* Profile Widget */}
                <div className="dashboard-card dashboard-profile" style={{ background: '#fff', borderRadius: '16px', boxShadow: '0 2px 8px #23234a11', padding: '2rem 1.5rem', textAlign: 'center' }}>
                    <span className="feature-icon" style={{ fontSize: '2.2rem', color: '#ff7c2d' }}><FontAwesomeIcon icon={faUser} /></span>
                    <h2 style={{ color: '#23234a', marginBottom: '0.5rem' }}>Profile</h2>
                    {profile ? (
                        editMode ? (
                            <form onSubmit={handleEditSubmit} className="dashboard-edit-form">
                                <input
                                    type="text"
                                    name="first_name"
                                    value={editProfile.first_name}
                                    onChange={handleEditChange}
                                    placeholder="First Name"
                                    className="dashboard-input"
                                />
                                <input
                                    type="text"
                                    name="last_name"
                                    value={editProfile.last_name}
                                    onChange={handleEditChange}
                                    placeholder="Last Name"
                                    className="dashboard-input"
                                />
                                <input
                                    type="email"
                                    name="email"
                                    value={editProfile.email}
                                    onChange={handleEditChange}
                                    placeholder="Email"
                                    className="dashboard-input"
                                />
                                <button type="submit" className="dashboard-button">Save</button>
                                <button type="button" className="dashboard-button" onClick={() => setEditMode(false)}>Cancel</button>
                                {updateMsg && <div className="dashboard-update-msg">{updateMsg}</div>}
                            </form>
                        ) : (
                            <>
                                <ul style={{ textAlign: 'left', margin: '0 auto 1rem auto', display: 'inline-block' }}>
                                    <li><strong>Email:</strong> {profile.email}</li>
                                    <li><strong>Name:</strong> {profile.first_name} {profile.last_name}</li>
                                </ul>
                                <button className="dashboard-button" onClick={() => setEditMode(true)} style={{ background: '#ff7c2d', color: '#fff', borderRadius: '25px', padding: '0.5rem 1.5rem', fontWeight: 600, border: 'none', marginTop: '0.5rem' }}>Edit Profile</button>
                                {updateMsg && <div className="dashboard-update-msg">{updateMsg}</div>}
                            </>
                        )
                    ) : (
                        <p>Loading profile...</p>
                    )}
                </div>
                {/* My Events Widget */}
                <div className="dashboard-card dashboard-events" style={{ background: '#f4f6fb', borderRadius: '16px', boxShadow: '0 2px 8px #23234a11', padding: '2rem 1.5rem', textAlign: 'center' }}>
                    <span className="feature-icon" style={{ fontSize: '2.2rem', color: '#ff7c2d' }}><FontAwesomeIcon icon={faCalendarAlt} /></span>
                    <h2 style={{ color: '#23234a', marginBottom: '0.5rem' }}>My Events</h2>
                    {events.length > 0 ? (
                        <ul style={{ textAlign: 'left', margin: '0 auto', display: 'inline-block' }}>
                            {events.map(event => (
                                <li key={event.id}>
                                    <strong>{event.title}</strong> — {event.date} @ {event.location}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No events found.</p>
                    )}
                </div>
                {/* Favorites Widget */}
                <div className="dashboard-card dashboard-favorites" style={{ background: '#fff', borderRadius: '16px', boxShadow: '0 2px 8px #23234a11', padding: '2rem 1.5rem', textAlign: 'center' }}>
                    <span className="feature-icon" style={{ fontSize: '2.2rem', color: '#ff7c2d' }}><FontAwesomeIcon icon={faStar} /></span>
                    <h2 style={{ color: '#23234a', marginBottom: '0.5rem' }}>Favorites</h2>
                    {favorites.length > 0 ? (
                        <ul style={{ textAlign: 'left', margin: '0 auto', display: 'inline-block' }}>
                            {favorites.map(fav => (
                                <li key={fav.event_id || fav.id}>
                                    Event #{fav.event_id || fav.id}
                                    <button className="dashboard-button" style={{ marginLeft: '1rem', background: '#ff7c2d', color: '#fff', borderRadius: '25px', padding: '0.3rem 1rem', fontWeight: 600, border: 'none' }} onClick={() => handleRemoveFavorite(fav.event_id || fav.id)}>Remove</button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No favorites found.</p>
                    )}
                    {favMsg && <div className="dashboard-update-msg">{favMsg}</div>}
                </div>
                {/* Quick Stats Widget */}
                <div className="dashboard-card dashboard-stats" style={{ background: '#eaf4ff', borderRadius: '16px', boxShadow: '0 2px 8px #23234a11', padding: '2rem 1.5rem', textAlign: 'center', borderLeft: '5px solid #007bff' }}>
                    <span className="feature-icon" style={{ fontSize: '2.2rem', color: '#007bff' }}><FontAwesomeIcon icon={faBolt} /></span>
                    <h2 style={{ color: '#23234a', marginBottom: '0.5rem' }}>Quick Stats</h2>
                    <ul className="dashboard-stats-list" style={{ textAlign: 'left', margin: '0 auto', display: 'inline-block' }}>
                        <li><strong>Events Attended:</strong> {stats.eventsAttended}</li>
                        <li><strong>RSVPs:</strong> {stats.rsvps}</li>
                        <li><strong>Favorites:</strong> {stats.favorites}</li>
                    </ul>
                </div>
                {/* Notifications Widget */}
                <div className="dashboard-card dashboard-notifications" style={{ background: '#f9f9f9', borderRadius: '16px', boxShadow: '0 2px 8px #23234a11', padding: '2rem 1.5rem', textAlign: 'center' }}>
                    <span className="feature-icon" style={{ fontSize: '2.2rem', color: '#ff7c2d' }}><FontAwesomeIcon icon={faBell} /></span>
                    <h2 style={{ color: '#23234a', marginBottom: '0.5rem' }}>Notifications</h2>
                    <ul style={{ textAlign: 'left', margin: '0 auto', display: 'inline-block' }}>
                        {notifications.map(note => (
                            <li key={note.id}>{note.message}</li>
                        ))}
                    </ul>
                </div>
                {/* Upcoming Event Widget */}
                <div className="dashboard-card dashboard-upcoming" style={{ background: '#eafaf1', borderRadius: '16px', boxShadow: '0 2px 8px #23234a11', padding: '2rem 1.5rem', textAlign: 'center', borderLeft: '5px solid #28a745' }}>
                    <span className="feature-icon" style={{ fontSize: '2.2rem', color: '#28a745' }}><FontAwesomeIcon icon={faCalendarAlt} /></span>
                    <h2 style={{ color: '#23234a', marginBottom: '0.5rem' }}>Upcoming Event</h2>
                    <div>
                        <strong style={{ color: '#28a745', fontSize: '1.1rem' }}>{upcomingEvent.title}</strong><br />
                        {upcomingEvent.date} @ {upcomingEvent.location}
                    </div>
                </div>
                {/* Quick Links Widget */}
                <div className="dashboard-card dashboard-quicklinks" style={{ background: '#f9f9f9', borderRadius: '16px', boxShadow: '0 2px 8px #23234a11', padding: '2rem 1.5rem', textAlign: 'center' }}>
                    <h2 style={{ color: '#23234a', marginBottom: '0.5rem' }}>Quick Links</h2>
                    <ul className="dashboard-quicklinks-list" style={{ textAlign: 'left', margin: '0 auto', display: 'inline-block' }}>
                        <li><Link to="/discover" style={{ color: '#ff7c2d', fontWeight: 500, textDecoration: 'none' }}>Find Events</Link></li>
                        <li><Link to="/createevent" style={{ color: '#ff7c2d', fontWeight: 500, textDecoration: 'none' }}>Create Event</Link></li>
                        <li><Link to="/profile" style={{ color: '#ff7c2d', fontWeight: 500, textDecoration: 'none' }}>Edit Profile</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
