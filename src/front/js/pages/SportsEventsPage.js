import React, { useState, useEffect } from "react";
import EventCardSingle from "../component/EventCardSingle";
import Hero from "../component/Hero";

import EventsHeroImage from "../../img/pitch/overlay/events-hero-overlay.png";

const SportsEventsPage = () => {
    const [sportsEventIds, setSportsEventIds] = useState([]);

    useEffect(() => {
        const fetchSportsEventIdsFromDatabase = async () => {
            try {
                const response = await fetch(`${process.env.BACKEND_URL}/api/events/sports`);
                if (!response.ok) {
                    throw new Error("Failed to fetch sports events");
                }
                const data = await response.json();
                const fetchedSportsEventIds = data.sports_events.map(event => event.id);
                setSportsEventIds(fetchedSportsEventIds.slice(0, 12)); // Limiting to 12 events
            } catch (error) {
                console.error("Error fetching sports event IDs:", error);
            }
        };

        fetchSportsEventIdsFromDatabase();
    }, []);

    return (
        <div className="text-center">
            <div className="hero" style={{ backgroundImage: `url(${EventsHeroImage})`, backgroundSize: 'cover', backgroundPosition: 'center'  }}>
                <Hero
                    header="Discover Sports Events Near You"
                    text="Experience the thrill of sports events near you. From live matches and tournaments to fitness classes and outdoor adventures, find your next sporting activity below."
                />
            </div>

            <div className="container-fluid all-events d-flex align-items-center justify-content-center">
                <div className="container text-center">

                    <div className="row mb-4">
                        <div className="col">
                            <h2 className="section-header-white">View All Sports Events</h2>
                        </div>
                    </div>

                    <div className="row">
                        {sportsEventIds.map(eventId => (
                            <div className="col-md-3 mb-4" key={eventId}>
                                <EventCardSingle eventId={eventId} />
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default SportsEventsPage;
