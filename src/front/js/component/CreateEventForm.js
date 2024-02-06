// CreateEventForm.js

import React, { useState } from 'react';

const CreateEventForm = ({ onFormSubmit }) => {
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventPrice, setEventPrice] = useState('');
  const [eventImage, setEventImage] = useState(null);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const newEvent = {
      name: eventName,
      description: eventDescription,
      location: eventLocation,
      date: eventDate,
      price: eventPrice,
      image: eventImage,
    };

    onFormSubmit(newEvent);

    setEventName('');
    setEventDescription('');
    setEventLocation('');
    setEventDate('');
    setEventPrice('');
    setEventImage(null);
  };

  return (
    <div className="container-full py-5 h-100 black-background">
      <div className="signup row d-flex justify-content-center align-items-center h-100">
        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
          <div className="card custom-card shadow-2-strong" style={{ borderRadius: '1rem' }}>
            <div className="card-body p-5">
              {/* Header */}
              <h2 className="mb-5">Create Your Event!</h2>

              {/* Event Form */}
              
              <form onSubmit={handleFormSubmit}>
                {/* Event Name */}
                <div className="mb-4">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Event Name"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                  />
                </div>

                {/* Event Description */}
                <div className="mb-4">
                  <textarea
                    className="form-control form-control-lg"
                    placeholder="Event Description"
                    value={eventDescription}
                    onChange={(e) => setEventDescription(e.target.value)}
                  />
                </div>

                {/* Event Location */}
                <div className="mb-4">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Event Location"
                    value={eventLocation}
                    onChange={(e) => setEventLocation(e.target.value)}
                  />
                </div>

                <div className='row'>

                {/* Event Date */}
                <div className="mb-4 col-6">
                  <input
                    type="date"
                    className="form-control form-control-lg"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                  />
                </div>

                {/* Event Price */}
                <div className="mb-4 col-6">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Event Price"
                    value={eventPrice}
                    onChange={(e) => setEventPrice(e.target.value)}
                  />
                </div>
                </div>
               

                {/* Event Image */}
                <div className="mb-4">
                  <input
                    type="file"
                    accept="image/*"
                    className="form-control-file"
                    onChange={(e) => setEventImage(e.target.files[0])}
                  />
                </div>

                {/* Submit Button */}
                <div className="d-flex flex-column align-items-center mb-4">
                  <button className="btn btn-primary custom-btn" type="submit">
                    Create Event
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEventForm;
