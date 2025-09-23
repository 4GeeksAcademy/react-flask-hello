
import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import { Link } from 'react-router-dom';

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

    return (
        <div className="dashboard-container">
            {/* Dashboard Navbar */}
            <nav className="dashboard-navbar">
                <ul>
                    <li><Link to="/dashboard">Home</Link></li>
                    <li><Link to="/discover">Discover</Link></li>
                    <li><Link to="/dashboard#my-events">My Events</Link></li>
                    <li><Link to="/dashboard#rsvp">RSVP</Link></li>
                    <li><Link to="/dashboard#fav">Fav</Link></li>
                </ul>
            </nav>
            <h1>Welcome to Your Dashboard</h1>
            {error && <div className="dashboard-error">{error}</div>}
            <div className="dashboard-widgets">
                <div className="dashboard-card">
                    <h2>Profile</h2>
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
                                <ul>
                                    <li><strong>Email:</strong> {profile.email}</li>
                                    <li><strong>Name:</strong> {profile.first_name} {profile.last_name}</li>
                                </ul>
                                <button className="dashboard-button" onClick={() => setEditMode(true)}>Edit Profile</button>
                                {updateMsg && <div className="dashboard-update-msg">{updateMsg}</div>}
                            </>
                        )
                    ) : (
                        <p>Loading profile...</p>
                    )}
                </div>
                <div className="dashboard-card" id="my-events">
                    <h2>My Events</h2>
                    {events.length > 0 ? (
                        <ul>
                            {events.map(event => (
                                <li key={event.id} className="dashboard-event">
                                    <div className="dashboard-event-details">
                                        <div><strong>Name:</strong> {event.title}</div>
                                        <div><strong>Location:</strong> {event.location}</div>
                                        <div><strong>Time:</strong> {event.time}</div>
                                        <div><strong>Description:</strong> {event.description}</div>
                                        <div><strong>Cost:</strong> {event.cost ? event.cost : 'Free'}</div>
                                    </div>
                                    <div className="dashboard-event-rsvp">
                                        <button className="dashboard-button" onClick={() => handleRSVP(event.id, 'yes')}>Yes</button>
                                        <button className="dashboard-button" onClick={() => handleRSVP(event.id, 'maybe')}>Maybe</button>
                                        <button className="dashboard-button" onClick={() => handleRSVP(event.id, 'no')}>No</button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No events found.</p>
                    )}
                    {rsvpMsg && <div className="dashboard-update-msg">{rsvpMsg}</div>}
                </div>
                <div className="dashboard-card">
                    <h2>Favorites</h2>
                    {favorites.length > 0 ? (
                        <ul>
                            {favorites.map(fav => (
                                <li key={fav.id}>
                                    Event #{fav.event_id}
                                    <button className="dashboard-button" style={{ marginLeft: '1rem' }} onClick={() => handleRemoveFavorite(fav.event_id)}>Remove</button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No favorites found.</p>
                    )}
                    {favMsg && <div className="dashboard-update-msg">{favMsg}</div>}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
