import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import EventCardSingle from "../component/EventCardSingle";

const PopularEventsTwo = () => {
    const { store } = useContext(Context);
    const [eventIds, setEventIds] = useState([]);

    useEffect(() => {
        // Fetch the list of event IDs from your database here
        // For demonstration, let's assume you have a function fetchEventIdsFromDatabase() to do this
        const fetchEventIdsFromDatabase = async () => {
            try {
                // Perform your fetch operation to get event IDs from your database
                // Replace this with your actual fetch operation
                const response = await fetch(`${process.env.BACKEND_URL}/api/events`);
                if (!response.ok) {
                    throw new Error("Failed to fetch events");
                }
                const data = await response.json();
                // Extract event IDs from the data
                const fetchedEventIds = data.events.map(event => event.id);
                // Ensure you have at least 3 event IDs
                if (fetchedEventIds.length < 3) {
                    throw new Error("Insufficient events in the database");
                }
                // Slice the first 3 event IDs to display
                const slicedEventIds = fetchedEventIds.slice(0, 3);
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
                    <h2 className="text-center mt-4">Popular Events Near You</h2>
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

export default PopularEventsTwo;
