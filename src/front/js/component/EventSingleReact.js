import React, { useState, useEffect } from 'react';
import AboutImage from '/workspaces/europe-fs-pt-14-ryandornan-mariahurtado/src/front/img/music/crowd-02.png';

const EventSingle = ({ eventId }) => {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`${process.env.BACKEND_URL}/api/event/${eventId}`);
        const data = await response.json();

        if (response.ok) {
          setEvent(data.event);
        } else {
          setError(data.message || 'Failed to fetch event');
        }
      } catch (error) {
        setError('An error occurred while fetching event');
        console.error('Error fetching event:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!event) {
    return <div>Event not found</div>;
  }

  return (
    <div className="container-full black-background">
      <div className="container event-single d-flex justify-content-center align-items-center">
        {/* Left Column - Image */}
        <div className="col-md-5 image-container">
          <img
            src={AboutImage}
            className="img-fluid"
            alt="About Image"
          />
        </div>

        {/* Right Column - Event Details */}
        
        <div className="col-md-6">
          <div className="mb-4">
            {/* Event Title */}
            <h3 className="mb-4">{event.name}</h3>

            {/* Event Description */}
            <p>{event.description}</p>
          </div>

          {/* Event Date */}
          <div className="d-flex align-items-center mb-3">
            <i className="fas fa-calendar-alt"></i>
            <span>{event.date}</span>
          </div>

          {/* Event Location */}
          <div className="d-flex align-items-center mb-3">
            <i className="fa-solid fa-location-dot"></i>
            <span>{event.location}</span>
          </div>

          {/* Ticket Price */}
          <div className="d-flex align-items-center mb-4">
            <i className="fa-solid fa-ticket"></i>
            <span>Ticket Price: £{event.price}</span>
          </div>

          {/* Buy Tickets Button */}
          <button className="btn btn-primary custom-btn mt-2">Buy Tickets Now</button>
        </div>
      </div>
    </div>
  );
};

export default EventSingle;
