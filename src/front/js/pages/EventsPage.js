import React, { useState, useEffect } from "react";
import EventCardSingle from "../component/EventCardSingle";
import Hero from "../component/Hero";
import SignUpNow from "../sections/SignUpNow";

import EventsHeroImage from "../../img/pitch/overlay/events-hero-overlay.png"

const EventsPage = () => {
    // Define a state to hold event IDs and current page
    const [eventIds, setEventIds] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const eventsPerPage = 8;

    // Fetch event IDs or use a predefined list
    useEffect(() => {
        const fetchEventIdsFromDatabase = async () => {
            try {
                const response = await fetch(`${process.env.BACKEND_URL}/api/events`);
                if (!response.ok) {
                    throw new Error("Failed to fetch events");
                }
                const data = await response.json();
                const fetchedEventIds = data.events.map(event => event.id);
                setEventIds(fetchedEventIds);
            } catch (error) {
                console.error("Error fetching event IDs:", error);
            }
        };

        fetchEventIdsFromDatabase();
    }, []);

    // Calculate indexes of events to display based on current page
    const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
    const currentEventIds = eventIds.slice(indexOfFirstEvent, indexOfLastEvent);

    // Function to handle pagination
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="text-center">
            {/* Events Page Hero */}
            <div className="hero" style={{ backgroundImage: `url(${EventsHeroImage})`, backgroundSize: 'cover', backgroundPosition: 'center'  }}>
                <Hero
                    header="Discover An Event Near You"
                    text="Explore a world of diverse events tailored to your interests. From exciting concerts and captivating art exhibitions to thrilling sports and enriching workshops, there’s something for everyone. Find your next unforgettable experience by browsing the events below."
                />
            </div>

            <div className="container-fluid all-events d-flex align-items-center justify-content-center">
                <div className="container text-center">

                    <div className="row mb-4">
                        <div className="col">
                            <h2 className="section-header-white">View All Events</h2>
                        </div>
                    </div>

                    <div className="row">
                        {currentEventIds.map(eventId => (
                            <div className="col-md-3 mb-4" key={eventId}>
                                <EventCardSingle eventId={eventId} />
                            </div>
                        ))}
                    </div>

                    {/* Pagination Component */}
                    <div className="row my-4">
                        <div className="col">
                            <Pagination
                                eventsPerPage={eventsPerPage}
                                totalEvents={eventIds.length}
                                paginate={paginate}
                            />
                        </div>
                    </div>

                </div>
            </div>

            <SignUpNow />

        </div>
    );
};

// Pagination Component
const Pagination = ({ eventsPerPage, totalEvents, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalEvents / eventsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul className="pagination justify-content-center">
                {pageNumbers.map(number => (
                    <li key={number} className="page-item px-3">
                        <button onClick={() => paginate(number)} className="page-link">
                            {number}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default EventsPage;
