import React, { useState, useEffect } from "react";
import EventCardSingle from "../component/EventCardSingle";
import Hero from "../component/Hero";
import PopularEventsTwo from "../sections/PopularEventsTwo";


import EventsHeroImage from "../../img/pitch/overlay/events-hero-overlay.png";

const ComedyEventsPage = () => {
    const [comedyEventIds, setComedyEventIds] = useState([]);

    useEffect(() => {
        const fetchComedyEventIdsFromDatabase = async () => {
            try {
                const response = await fetch(`${process.env.BACKEND_URL}/api/events/comedy`);
                if (!response.ok) {
                    throw new Error("Failed to fetch comedy events");
                }
                const data = await response.json();
                const fetchedComedyEventIds = data.comedy_events.map(event => event.id);
                setComedyEventIds(fetchedComedyEventIds.slice(0, 12)); // Limiting to 12 events
            } catch (error) {
                console.error("Error fetching comedy event IDs:", error);
            }
        };

        fetchComedyEventIdsFromDatabase();
    }, []);

    return (
        <div className="text-center">
            <div className="hero" style={{ backgroundImage: `url(${EventsHeroImage})`, backgroundSize: 'cover', backgroundPosition: 'center'  }}>
                <Hero
                    header="Discover Comedy Events Near You"
                    text="Explore a world of laughter with hilarious comedy events tailored to your sense of humor. From stand-up comedy shows to comedy festivals and improv performances, find your next laugh-out-loud experience below."
                />
            </div>

            <div className="container-fluid category-events d-flex align-items-center justify-content-center">
                <div className="container text-center">

                    <div className="row mb-4">
                        <div className="col">
                            <h2 className="section-header-white">View All Comedy Events</h2>
                        </div>
                    </div>

                    <div className="row">
                        {comedyEventIds.map(eventId => (
                            <div className="col-md-3 mb-4" key={eventId}>
                                <EventCardSingle eventId={eventId} />
                            </div>
                        ))}
                    </div>

                </div>
            </div>
            <PopularEventsTwo className="grey-background" />
        </div>
    );
};

export default ComedyEventsPage;
