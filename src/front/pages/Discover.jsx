
import "./Discover.css";
import { Link } from "react-router-dom";

function Discover() {
  // Placeholder event data
  const events = [
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
    },
    {
      id: 3,
      title: "Tech Mixer",
      date: "2025-12-01",
      location: "San Francisco, CA",
      description: "Networking event for tech professionals.",
    },
  ];

  return (
    <div className="discover-container">
      <h1>Discover Events</h1>
      <div className="discover-events-list">
        {events.map(event => (
          <div className="discover-event-card" key={event.id}>
            <h2>{event.title}</h2>
            <p><strong>Date:</strong> {event.date}</p>
            <p><strong>Location:</strong> {event.location}</p>
            <p>{event.description}</p>
            <Link to={`/event/${event.id}`} className="discover-details-link">View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Discover;
