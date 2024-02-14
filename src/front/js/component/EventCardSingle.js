import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

const EventCardSingle = ({ eventId }) => {
    const { actions } = useContext(Context);
    const [event, setEvent] = useState(null);
    const [favorited, setFavorited] = useState(false);

    useEffect(() => {
        const fetchEventData = async () => {
            try {
                const eventData = await actions.fetchEvent(eventId);
                setEvent(eventData);
            } catch (error) {
                console.error("Error fetching event data:", error);
            }
        };

        fetchEventData();
    }, [actions, eventId]);

    if (!event) return null;

    const toggleFavorite = () => {
        setFavorited(!favorited);
    };

    return (
        <div className="card event-card" style={{ width: "18rem" }}>
            <img
                src={event.image}
                className="card-img-top"
                alt="Event Image"
                style={{ height: "200px", objectFit: "cover" }} // Adjust the height as needed
            />
            <div className="event-card-body">
                <h5>{event.name}</h5>
                <p className="event-card-venue">{event.venue}, {event.city} </p>
                <p className="event-card-category">Category: {event.category}</p>
                <div className="d-flex justify-content-between event-card-info"> 
                    <p className="event-card-info">Tickets: £{event.price}</p>
                    <p className="event-card-info">Date: {event.date}</p>
                </div>
                <div className="d-flex justify-content-between align-items-center"> 
                    <Link to={`/event/${eventId}`} className="btn btn-primary custom-btn">More info.</Link>
                    <button className="btn" onClick={toggleFavorite}>
                        <i className={`fa-solid fa-heart ${favorited ? 'pink-heart' : ''}`}></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

EventCardSingle.propTypes = {
    eventId: PropTypes.number.isRequired
};

export default EventCardSingle;
