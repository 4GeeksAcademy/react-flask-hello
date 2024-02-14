import React from "react";

import EventsSingleImage from "../../img/pitch/overlay/event-single-background.png"


const EventSingle = ({ event }) => {
    return (
        <div className="container-full" style={{ backgroundImage: `url(${EventsSingleImage})`, backgroundSize: 'cover', backgroundPosition: 'center'  }}>

        <div className="container event-single d-flex justify-content-center align-items-center">
            {/* Left Column - Image */}
            <div className="col-md-5 image-container">
                <img src={event.image} className="img-fluid" alt="Event" style={{objectFit: 'cover', width: '100%', height: '100%'}} />
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
                    <i className="fas fa-calendar-alt me-2"></i>
                    <span className="event-single-date">{event.date}</span>
                </div>

                {/* Event Location */}
                <div className="d-flex align-items-center mb-3">
                    <i className="fas fa-map-marker-alt me-2"></i>
                    <span className="event-single-location">{event.venue}</span><span className="event-single-span">:</span><span className="event-single-span"> {event.city}</span>
                </div>

                {/* Event Category */}
                <div className="d-flex align-items-center mb-3">
                <i class="fa-solid fa-list me-2"></i>
                    <span className="event-single-category">{event.category}</span>
                </div>

                {/* Ticket Price */}
                <div className="d-flex align-items-center mb-4">
                    <i className="fas fa-ticket-alt me-2"></i>
                    <span className="event-single-ticket">Ticket Price</span><span className="event-single-span">:</span><span className="event-single-span">${event.price}</span>
                </div>

                {/* Buy Tickets Button */}
                <button className="btn btn-primary custom-btn mt-2">Buy Tickets Now</button>
            </div>
        </div>
        </div>
    );
};

export default EventSingle;
