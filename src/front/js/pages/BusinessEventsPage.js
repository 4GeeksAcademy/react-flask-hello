import React, { useState, useEffect } from "react";
import EventCardSingle from "../component/EventCardSingle";
import Hero from "../component/Hero";

import EventsHeroImage from "../../img/pitch/overlay/events-hero-overlay.png";

const BusinessEventsPage = () => {
    const [businessEventIds, setBusinessEventIds] = useState([]);

    useEffect(() => {
        const fetchBusinessEventIdsFromDatabase = async () => {
            try {
                const response = await fetch(`${process.env.BACKEND_URL}/api/events/business`);
                if (!response.ok) {
                    throw new Error("Failed to fetch business events");
                }
                const data = await response.json();
                const fetchedBusinessEventIds = data.business_events.map(event => event.id);
                setBusinessEventIds(fetchedBusinessEventIds.slice(0, 12)); // Limiting to 12 events
            } catch (error) {
                console.error("Error fetching business event IDs:", error);
            }
        };

        fetchBusinessEventIdsFromDatabase();
    }, []);

    return (
        <div className="text-center">
            <div className="hero" style={{ backgroundImage: `url(${EventsHeroImage})`, backgroundSize: 'cover', backgroundPosition: 'center'  }}>
                <Hero
                    header="Discover Business Events Near You"
                    text="Explore a world of diverse business events tailored to your interests. From networking events and conferences to workshops and seminars, find your next business opportunity below."
                />
            </div>

            <div className="container-fluid all-events d-flex align-items-center justify-content-center">
                <div className="container text-center">

                    <div className="row mb-4">
                        <div className="col">
                            <h2 className="section-header-white">View All Business Events</h2>
                        </div>
                    </div>

                    <div className="row">
                        {businessEventIds.map(eventId => (
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

export default BusinessEventsPage;
