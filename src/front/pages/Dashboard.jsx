
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
                {/* Quick Stats Widget */}
                <div className="dashboard-card dashboard-stats">
                    <h2>Quick Stats</h2>
                    <ul className="dashboard-stats-list">
                        <li><strong>Events Attended:</strong> {stats.eventsAttended}</li>
                        <li><strong>RSVPs:</strong> {stats.rsvps}</li>
                        <li><strong>Favorites:</strong> {stats.favorites}</li>
                    </ul>
                </div>
                {/* Notifications Widget */}
                <div className="dashboard-card dashboard-notifications">
                    <h2>Notifications</h2>
                    <ul>
                        {notifications.map(note => (
                            <li key={note.id}>{note.message}</li>
                        ))}
                    </ul>
                </div>
                {/* Upcoming Event Widget */}
                <div className="dashboard-card dashboard-upcoming">
                    <h2>Upcoming Event</h2>
                    <div>
                        <strong>{upcomingEvent.title}</strong><br />
                        {upcomingEvent.date} @ {upcomingEvent.location}
                    </div>
                </div>
                {/* Quick Links Widget */}
                <div className="dashboard-card dashboard-quicklinks">
                    <h2>Quick Links</h2>
                    <ul className="dashboard-quicklinks-list">
                        <li><Link to="/discover">Find Events</Link></li>
                        <li><Link to="/create-event">Create Event</Link></li>
                        <li><Link to="/profile">Edit Profile</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
