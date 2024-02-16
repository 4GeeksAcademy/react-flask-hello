import React, { useState, useEffect } from "react";
import EventCardSingle from "../component/EventCardSingle";
import Hero from "../component/Hero";
import PopularEventsTwo from "../sections/PopularEventsTwo";


import EventsHeroImage from "../../img/pitch/overlay/events-hero-overlay.png";

const MusicEventsPage = () => {
    const [musicEventIds, setMusicEventIds] = useState([]);

    useEffect(() => {
        const fetchMusicEventIdsFromDatabase = async () => {
            try {
                const response = await fetch(`${process.env.BACKEND_URL}/api/events/music`);
                if (!response.ok) {
                    throw new Error("Failed to fetch music events");
                }
                const data = await response.json();
                const fetchedMusicEventIds = data.music_events.map(event => event.id);
                setMusicEventIds(fetchedMusicEventIds.slice(0, 12)); // Limiting to 12 events
            } catch (error) {
                console.error("Error fetching music event IDs:", error);
            }
        };

        fetchMusicEventIdsFromDatabase();
    }, []);

    return (
        <div className="text-center">
            <div className="hero" style={{ backgroundImage: `url(${EventsHeroImage})`, backgroundSize: 'cover', backgroundPosition: 'center'  }}>
                <Hero
                    header="Discover Music Events Near You"
                    text="Explore a world of diverse music events tailored to your interests. From exciting concerts and captivating performances to music festivals and DJ sets, find your next unforgettable music experience below."
                />
            </div>

            <div className="container-fluid category-events d-flex align-items-center justify-content-center">
                <div className="container text-center">

                    <div className="row mb-4">
                        <div className="col">
                            <h2 className="section-header-white">View All Music Events</h2>
                        </div>
                    </div>

                    <div className="row">
                        {musicEventIds.map(eventId => (
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

export default MusicEventsPage;
