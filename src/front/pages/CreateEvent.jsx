import React, { useState } from 'react';
import "./Landing.css";
import "./CreateEvent.css";

function CreateEvent() {
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventPhoto, setEventPhoto] = useState(null);
  const [message, setMessage] = useState('');

  function handlePhotoChange(e) {
    setEventPhoto(e.target.files[0]);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (eventName && eventDate && eventLocation && eventTime && eventDescription && eventPhoto) {
      setMessage("Event created!");
      setEventName('');
      setEventDate('');
      setEventLocation('');
      setEventTime('');
      setEventDescription('');
      setEventPhoto(null);
      e.target.reset();
    } else {
      setMessage("Please complete all fields.");
    }
  }

  return (
    <div className="signup-container">
      <h1 className="signup-title">Create Event</h1>
      <div className="signup-box">
        <form onSubmit={handleSubmit} className="signup-form">
          <input
            type="text"
            placeholder="Event Name"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            className="signup-input"
          />
          <input
            type="date"
            placeholder="Event Date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            className="signup-input"
          />
          <input
            type="text"
            placeholder="Event Location"
            value={eventLocation}
            onChange={(e) => setEventLocation(e.target.value)}
            className="signup-input"
          />
          <input
            type="time"
            placeholder="Event Time"
            value={eventTime}
            onChange={(e) => setEventTime(e.target.value)}
            className="signup-input"
          />
          <textarea
            placeholder="Event Description"
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}
            className="signup-input"
            style={{ minHeight: "80px" }}
          />
          <div className="photo-upload-wrapper">
            {eventPhoto ? (
              <div className="photo-preview-container">
                <img
                  src={URL.createObjectURL(eventPhoto)}
                  alt="Preview"
                  className="photo-preview"
                  onLoad={e => URL.revokeObjectURL(e.target.src)}
                />
                <label
                  htmlFor="file-upload"
                  className="change-photo-label"
                  tabIndex={0}
                >
                  Change Photo
                </label>
              </div>
            ) : (
              <label htmlFor="file-upload" className="file-upload-label">
                <span className="plus-sign">+</span>
              </label>
            )}
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="file-upload-input"
            />
          </div>
          <button type="submit" className="signup-button">Create Event</button>
          {message && <div style={{ color: "white", marginTop: 10 }}>{message}</div>}
        </form>
      </div>
    </div>
  );
}

export default CreateEvent;
