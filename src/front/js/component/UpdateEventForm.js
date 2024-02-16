import React, { useState, useEffect } from 'react';
import { storage } from './firebaseConfig';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import UpdateEventImage from "../../img/pitch/sections/update-event-background.png";
import { useNavigate } from 'react-router-dom';

const UpdateEventForm = ({ event }) => {
  const [eventName, setEventName] = useState(event.name);
  const [eventDescription, setEventDescription] = useState(event.description);
  const [eventVenue, setEventVenue] = useState(event.venue);
  const [eventCity, setEventCity] = useState(event.city);
  const [eventCategory, setEventCategory] = useState(event.category);
  const [eventDate, setEventDate] = useState(event.date);
  const [eventPrice, setEventPrice] = useState(event.price);
  const [eventImage, setEventImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [percent, setPercent] = useState(0);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const navigate = useNavigate();

  const locations = ['London', 'New York', 'Paris', 'Berlin'];
  const categories = ['Music', 'Comedy', 'Business', 'Sport', 'Other'];

  useEffect(() => {
    // Adjust textarea height when component mounts
    adjustTextareaHeight(document.getElementById('event-description'));
  }, []);

  const handleChange = (event) => {
    setEventImage(event.target.files[0]);
  };

  const handleUpdateEvent = async (e) => {
    e.preventDefault();
  
    setLoading(true);
  
    try {
      let imageUrl = event.image; // Default to existing image
  
      if (eventImage) {
        // If a new image is selected, upload it
        const storageRef = ref(storage, `/event_images/${eventImage.name}`);
        const uploadTask = uploadBytesResumable(storageRef, eventImage);
  
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const percent = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setPercent(percent);
          },
          (error) => {
            console.error(error);
            setError('An error occurred while uploading the image.');
            setLoading(false);
          }
        );
  
        uploadTask.then((snapshot) => {
          getDownloadURL(snapshot.ref)
            .then((downloadURL) => {
              imageUrl = downloadURL;
              // Update event with new image
              updateEvent(imageUrl);
            })
            .catch((error) => {
              console.error(error);
              setError('An error occurred while getting download URL.');
              setLoading(false);
            });
        });
      } else {
        // If no new image selected, update event with existing image
        updateEvent(imageUrl);
      }
    } catch (error) {
      console.error(error);
      setError('An error occurred while updating the event.');
      setLoading(false);
    }
  };

  const updateEvent = async (imageUrl) => {
    try {
      const eventData = {
        name: eventName,
        description: eventDescription,
        venue: eventVenue,
        city: eventCity,
        category: eventCategory,
        date: eventDate,
        price: eventPrice,
        image: imageUrl,
      };

      const response = await fetch(`${process.env.BACKEND_URL}/api/edit-event/${event.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      });

      if (!response.ok) {
        throw new Error('Failed to update event');
      }

      console.log('Event updated successfully');
      setUpdateSuccess(true);
      setTimeout(() => {
        setUpdateSuccess(false);
        navigate(`/event/${event.id}`);
      }, 3000);
    } catch (error) {
      setError('An error occurred while updating the event');
      console.error('Error updating event:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEvent = async () => {
    if (!deleteConfirm) {
      const confirmDelete = window.confirm('Are you sure you want to delete this event? This action cannot be undone.');
      if (confirmDelete) {
        setDeleteConfirm(true);
      }
    } else {
      try {
        const response = await fetch(`${process.env.BACKEND_URL}/api/delete-event/${event.id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete event');
        }

        console.log('Event deleted successfully');
        setDeleteSuccess(true);
        setTimeout(() => {
          navigate("/");
        }, 4000);
      } catch (error) {
        setError('An error occurred while deleting the event');
        console.error('Error deleting event:', error);
      }
    }
  };

  const adjustTextareaHeight = (textarea) => {
    textarea.style.height = 'auto'; // Reset height to auto to adjust it
    textarea.style.height = `${textarea.scrollHeight}px`; // Set the height to match the scroll height
  };

  return (
    <div className="container-full py-5 h-100 black-background" style={{ backgroundImage: `url(${UpdateEventImage})`, backgroundSize: 'cover', backgroundPosition: 'center'  }}>
      <div className="signup row d-flex justify-content-center align-items-center h-100">
        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
          <div className="card custom-card shadow-2-strong" style={{ borderRadius: '1rem' }}>
            <div className="card-body p-5">
              <h2 className="mb-5">Update Your Event!</h2>
              <form onSubmit={handleUpdateEvent}>
                {/* Form fields */}
                <div className="mb-4">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Event Name"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <textarea
                    id="event-description" // Add an ID for referencing
                    className="form-control form-control-lg"
                    placeholder="Event Description"
                    value={eventDescription}
                    onChange={(e) => {
                      setEventDescription(e.target.value);
                      adjustTextareaHeight(e.target);
                    }}
                    ref={(textarea) => textarea && adjustTextareaHeight(textarea)} // Set initial height
                    style={{ resize: 'vertical' }}
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Event Venue"
                    value={eventVenue}
                    onChange={(e) => setEventVenue(e.target.value)}
                  />
                </div>
                <div className="row mb-4">
                  <div className="col-6">
                    <select
                      className={`form-select form-select-lg ${eventCity ? 'custom-select-selected' : 'custom-select-placeholder'}`}
                      value={eventCity}
                      onChange={(e) => setEventCity(e.target.value)}
                    >
                      <option value="" disabled hidden>Select City</option>
                      {locations.map((location, index) => (
                        <option key={index} value={location}>
                          {location}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-6">
                    <select
                      className={`form-select form-select-lg ${eventCategory ? 'custom-select-selected' : 'custom-select-placeholder'}`}
                      value={eventCategory}
                      onChange={(e) => setEventCategory(e.target.value)}
                    >
                      <option value="" disabled hidden>Select Category</option>
                      {categories.map((category, index) => (
                        <option key={index} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                    <input
                      type="date"
                      className="form-control form-control-lg"
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                    />
                  </div>
                  <div className="col-6">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Event Price"
                      value={eventPrice}
                      onChange={(e) => setEventPrice(e.target.value)}
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className='mb-3 mt-3'>Upload Your Image Here</label>
                  <input
                    type="file"
                    accept="image/*"
                    className="form-control-file"
                    onChange={handleChange}
                  />
                </div>
                {percent > 0 && <p>{percent}% done</p>}
                {error && <p className="text-danger">{error}</p>}
                {updateSuccess && (
                  <p className="text-white mt-3">Your event has been updated successfully.</p>
                )}
                <div className="d-flex justify-content-between align-items-center">
                  <button className="btn btn-primary custom-btn" type="submit" disabled={loading}>
                    {loading ? 'Updating Event...' : 'Update Event'}
                  </button>
                  <button
                    className="btn btn-danger custom-btn"
                    onClick={(e) => {
                      e.preventDefault(); // Prevent default form submission action
                      handleDeleteEvent();
                    }}
                    disabled={loading}
                  >
                    {deleteConfirm ? 'Confirm Delete' : 'Delete Event'}
                  </button>
                </div>
                {deleteSuccess && (
                  <p className="text-white mt-3">Your event has now been deleted.</p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateEventForm;
