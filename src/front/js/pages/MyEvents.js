import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import EventCardSingle from "../component/EventCardSingle";

const MyEvents = () => {
    const { store } = useContext(Context);
    const [eventIds, setEventIds] = useState([]);

    useEffect(() => {
        // Fetch the list of event IDs from database 
      
        const fetchEventIdsFromDatabase = async () => {
            try {
                // Perform  fetch operation to get event IDs from  database
                const response = await fetch(`${process.env.BACKEND_URL}/api/events`);
                if (!response.ok) {
                    throw new Error("Failed to fetch events");
                }
                const data = await response.json();
                // Extract event IDs from the data
                const fetchedEventIds = data.events.map(event => event.id);
                // Display 3 events
                if (fetchedEventIds.length < 3) {
                    throw new Error("Insufficient events in the database");
                }
                // Slice the first 3 event IDs to display
                const slicedEventIds = fetchedEventIds.slice(13, 17);
                setEventIds(slicedEventIds);
            } catch (error) {
                console.error("Error fetching event IDs:", error);
            }
        };

        fetchEventIdsFromDatabase();
    }, []);

    return (
        <div className="container-fluid popular-events d-flex align-items-center justify-content-center">
            <div className="container text-center section-header">
                <div className="section-header">
                    <h2 className="text-center mt-4">Your Events</h2>
                </div>
                <div className="d-flex justify-content-center">
                    {eventIds.map(eventId => (
                        <EventCardSingle key={eventId} eventId={eventId} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MyEvents;
