import React, { useEffect, useState, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import useGlobalReducer from "../../hooks/useGlobalReducer";
import { Link } from "react-router-dom";
import "./CalendarComp.css"

const EventTooltip = ({ position, eventData, onClose }) => {
    const tooltipRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    if (!eventData) return null;

    const style = {
        left: `${position.x}px`,
        top: `${position.y}px`,
    };

    return (
        <div className="event-tooltip" style={style} ref={tooltipRef}>
            <div className="event-tooltip-header">
                <h3>{eventData.title}</h3>
                <button className="tooltip-close-button" onClick={onClose}>×</button>
            </div>
            <div className="event-tooltip-content">
                <p><strong>Start:</strong> {new Date(eventData.start).toLocaleString()}</p>
                <p><strong>End:</strong> {new Date(eventData.end).toLocaleString()}</p>
                {eventData.location && <p><strong>Location:</strong> {eventData.location}</p>}
                {eventData.description && (
                    <div className="event-description-fields">
                        <h4>Details:</h4>
                        {eventData.description.split('\n').map((line, index) => {
                            if (line.trim() === '') return null;

                            const parts = line.split(':');
                            if (parts.length > 1) {
                                const key = parts[0].trim();
                                const value = parts.slice(1).join(':').trim();
                                return (
                                    <p key={index} className="description-field">
                                        <strong>{key}:</strong> {value}
                                    </p>
                                );
                            } else {
                                return <p key={index} className="description-field">{line}</p>;
                            }
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export const CalendarComp = () => {
    const { store, dispatch } = useGlobalReducer();
    const {
        selectedBusiness,
        calendarEvents,
        calendarLoading,
        calendarError,
        syncStatus,
        token
    } = store;

    // Tooltip state
    const [tooltipVisible, setTooltipVisible] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

    const backendUrl = import.meta.env.VITE_BACKEND_URL || "";

    const fetchCalendarEvents = async () => {
        try {
            dispatch({ type: "load_calendar_events_start" });

            const options = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            };

            const businessFilter = selectedBusiness ? `?business_id=${selectedBusiness.id}` : '';
            const response = await fetch(`${backendUrl}calendar_api/calendar/events${businessFilter}`, options);

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
                    htmlLink: event.htmlLink,
                    businessId: event.extendedProperties?.private?.businessId || null
                }
            }));

            dispatch({
                type: "load_calendar_events_success",
                payload: formattedEvents
            });

        } catch (error) {
            console.error('Error fetching events:', error);
            dispatch({
                type: "load_calendar_event_error",
                payload: error.message
            });
        }
    };

    const syncGoogleCalendar = async () => {
        try {
            dispatch({ type: "sync_calendar_start" });

            const options = {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            };

            if (selectedBusiness) {
                options.body = JSON.stringify({
                    business_id: selectedBusiness.id
                });
            }

            const response = await fetch(`${backendUrl}calendar_api/calendar/sync`, options);

            if (!response.ok) {
                throw new Error("Error syncing with Google Calendar");
            }

            const data = await response.json();

            dispatch({
                type: "sync_calendar_success",
                payload: data
            });

            fetchCalendarEvents();

        } catch (error) {
            console.error("Error syncing calendar:", error);
            dispatch({
                type: "sync_calendar_error",
                payload: error.message
            });
        }
    };

    useEffect(() => {
        fetchCalendarEvents();
    }, [selectedBusiness]);

    const handleDateClick = (arg) => {
        console.log("Selected date:", arg.dateStr);
        setTooltipVisible(false);
    };

    const handleEventClick = (clickInfo) => {
        clickInfo.jsEvent.preventDefault();

        const x = clickInfo.jsEvent.pageX;
        const y = clickInfo.jsEvent.pageY;

        setSelectedEvent({
            id: clickInfo.event.id,
            title: clickInfo.event.title,
            start: clickInfo.event.start,
            end: clickInfo.event.end,
            description: clickInfo.event.extendedProps.description,
            location: clickInfo.event.extendedProps.location,
            extendedProps: clickInfo.event.extendedProps
        });

        setTooltipPosition({ x, y });
        setTooltipVisible(true);
    };

    const closeTooltip = () => {
        setTooltipVisible(false);
    };

    return (
        <div className="calendar-container">
            <div className="calendar-header">
                <h1>
                    {selectedBusiness
                        ? `Calendar for ${selectedBusiness.name}`
                        : "All Appointments Calendar"}
                </h1>

                <div className="calendar-actions">
                    <Link to="/appointment/create" className="create-appointment-button">
                        <i className="fas fa-plus"></i> New appointment
                    </Link>
                    <button
                        className="sync-button"
                        onClick={syncGoogleCalendar}
                        disabled={syncStatus?.loading}
                    >
                        {syncStatus?.loading ? 'Synchronizing...' : 'Sync with Google Calendar'}
                    </button>

                    <button
                        className="refresh-button"
                        onClick={fetchCalendarEvents}
                        disabled={calendarLoading}
                    >
                        Update
                    </button>
                </div>
            </div>

            {calendarLoading && <div className="loading-indicator">Loading events...</div>}
            {calendarError && <div className="error-message">{calendarError}</div>}

            {syncStatus && syncStatus.message && (
                <div className={`sync-status ${syncStatus.success ? 'success' : 'error'}`}>
                    {syncStatus.message}
                    {syncStatus.count && ` (${syncStatus.count} synchronized appointments)`}
                </div>
            )}
            <div className="calendar-wrapper">
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay'
                    }}
                    events={calendarEvents}
                    eventClick={handleEventClick}
                    dateClick={handleDateClick}
                    editable={false}
                    selectable={true}
                    selectMirror={true}
                    dayMaxEvents={true}
                    weekends={true}
                    height="auto"
                    locale="en"
                />
            </div>

            {tooltipVisible && (
                <EventTooltip
                    position={tooltipPosition}
                    eventData={selectedEvent}
                    onClose={closeTooltip}
                />
            )}
        </div>
    );
};