import React from "react";
import { Link } from "react-router-dom";
import "../pages/Dashboard.css";

const DashboardNavbar = () => (
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
);

export default DashboardNavbar;
