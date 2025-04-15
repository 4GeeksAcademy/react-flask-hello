import React, { useState, useEffect }from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../../hooks/useGlobalReducer";
import "./CalendarComp.css"

export const CalendarComp = () => {
    const [store, dispatch] = useGlobalReducer();
    const [events, setEvents] = useState([])
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [syncStatus, setSyncStatus] = useState(null);


    const fetchCalendarEvents = async () => {

        try {

            setLoading(true);
            setError(null);

            const backendUrl = import.meta.env.VITE_BACKEND_URL || "";

            const options = {
                headers: {
                    'Autorization': `Bearer ${store.token}`
                }
            };

            const response = await fetch(`${backendUrl}api/calendar/events`, options);

            if (!response.ok) {
                throw new Error('Error loading calendar events');
            }

            const data = await response.json();

            const formattedEvents = data.map(event => ({
                id: event.id,
                title: event.summary,
                start: event.start.dateTime || event.start.date,
                end: event.end.dateTime || event.end.date,
                description: event.description,
                location: event.location,
                extendedProps: {
                    googleEventId: event.id,
                    htmlLink: event.htmlLink
                }
            }));

            setEvents(formattedEvents);

        } catch (error){
            console.error('Error fetching events:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };










    return (
        <>

        </>
    )
}