import React from 'react';
import { useParams } from 'react-router-dom'; // Assuming you're using React Router for routing
import EventSingleReact from './EventSingleReact'; // 

const EventPage = () => {
  const { eventId } = useParams(); // Get the eventId from the URL params

  return (
    <div>
      <h1>Event Details</h1>
      <EventSingleReact eventId={eventId} />
    </div>
  );
};

export default EventPage;