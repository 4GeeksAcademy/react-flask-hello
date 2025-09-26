import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import DashboardNavbar from "../components/DashboardNavbar";

function RSVP() {
  const [rsvps, setRsvps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRSVPs = async () => {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("access_token");
        const res = await fetch("https://upgraded-system-7vgj4vjj6j52rx7j-3000.app.github.dev/api/my-rsvps", {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) throw new Error("Failed to fetch your RSVPs");
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setRsvps(data);
        } else {
          // Fallback demo RSVPs if API returns empty
          setRsvps([
            {
              event_id: 1,
              event_title: "React Summit 2025",
              event_date: "2025-10-10",
              event_location: "Online",
              status: "Going"
            },
            {
              event_id: 2,
              event_title: "FlaskCon",
              event_date: "2025-11-05",
              event_location: "New York, NY",
              status: "Interested"
            }
          ]);
        }
      } catch (err) {
        setError(err.message);
        // Fallback demo RSVPs if API fails
        setRsvps([
          {
            event_id: 1,
            event_title: "React Summit 2025",
            event_date: "2025-10-10",
            event_location: "Online",
            status: "Going"
          },
          {
            event_id: 2,
            event_title: "FlaskCon",
            event_date: "2025-11-05",
            event_location: "New York, NY",
            status: "Interested"
          }
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchRSVPs();
  }, []);

  return (
    <div className="rsvp-container" style={{ background: '#f8f9fa', minHeight: '100vh' }}>
      <DashboardNavbar />
      {/* Hero-style header */}
      <section className="rsvp-hero" style={{ background: '#23234a', color: '#fff', borderRadius: '0 0 32px 32px', padding: '2.5rem 2rem 2rem 2rem', marginBottom: '2rem', textAlign: 'center', boxShadow: '0 2px 16px #23234a22' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '0.5rem', letterSpacing: '2px' }}>My RSVPs</h1>
        <p style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>See all events you've responded to.</p>
      </section>
      {loading && <p style={{ color: '#23234a', fontSize: '1.1rem', textAlign: 'center' }}>Loading your RSVPs...</p>}
      {error && <div className="rsvp-error" style={{ color: '#ff2d75', textAlign: 'center', marginBottom: '1rem' }}>{error}</div>}
      <div className="rsvp-list" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', justifyItems: 'stretch', alignItems: 'stretch' }}>
        {rsvps.length === 0 && !loading && !error && (
          <p style={{ color: '#23234a', fontSize: '1.2rem', textAlign: 'center' }}>You have not RSVPed to any events yet.</p>
        )}
        {rsvps.map(rsvp => (
          <div className="rsvp-card" key={rsvp.event_id} style={{ background: '#fff', borderRadius: '16px', boxShadow: '0 2px 8px #23234a11', padding: '2rem 1.5rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span className="feature-icon" style={{ fontSize: '2.2rem', color: '#ff7c2d', marginBottom: '0.5rem' }}><FontAwesomeIcon icon={faCheckCircle} /></span>
            <h2 style={{ color: '#23234a', marginBottom: '0.5rem' }}>{rsvp.event_title}</h2>
            <p style={{ color: '#007bff', marginBottom: '0.5rem' }}><FontAwesomeIcon icon={faMapMarkerAlt} /> {rsvp.event_location}</p>
            <p style={{ color: '#23234a', marginBottom: '0.5rem' }}><strong>Date:</strong> {rsvp.event_date}</p>
            <p style={{ color: '#28a745', marginBottom: '1rem', fontWeight: 600 }}><strong>Status:</strong> {rsvp.status}</p>
            <Link to={`/event/${rsvp.event_id}`} className="rsvp-details-link" style={{ background: '#ff7c2d', color: '#fff', borderRadius: '25px', padding: '0.5rem 1.5rem', fontWeight: 600, textDecoration: 'none', marginTop: '0.5rem' }}>View Event</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RSVP;
