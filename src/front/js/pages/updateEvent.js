import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import UpdateEventForm from "../component/UpdateEventForm";
import PopularEventsTwo from "../sections/PopularEventsTwo";

const UpdateEvent = () => {
    const { actions } = useContext(Context);
    const params = useParams();
    const [event, setEvent] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const eventData = await actions.fetchEvent(params.id);
                setEvent(eventData);
            } catch (error) {
                console.error("Error fetching event data:", error);
            }
        };

        fetchData();
    }, [actions, params.id]);

    return (
        <div>
            <div className="container-full black-background">
                {event && <UpdateEventForm event={event} />}
            </div>
            <PopularEventsTwo />
        </div>
    );
};

export default UpdateEvent;
