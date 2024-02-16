import React, { useState } from 'react';
import { storage } from './firebaseConfig';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import CreateEventImage from "../../img/pitch/sections/create-event-background.png";
import { useNavigate } from 'react-router-dom';

const CreateEventForm = () => {
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventVenue, setEventVenue] = useState('');
  const [eventCity, setEventCity] = useState('');
  const [eventCategory, setEventCategory] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventPrice, setEventPrice] = useState('');
  const [eventImage, setEventImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [percent, setPercent] = useState(0);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (event) => {
    setEventImage(event.target.files[0]);
  };

  const handleUploadAndCreateEvent = async (e) => {
    e.preventDefault();

    if (!eventImage) {
      alert('Please upload an image first!');
      return;
    }

    setLoading(true);

    try {
      const storageRef = ref(storage, `/event_images/${eventImage.name}`);
      const uploadTask = uploadBytesResumable(storageRef, eventImage);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          setPercent(percent);
        },
        (error) => {
          console.error(error);
          setError('An error occurred while uploading the image.');
          setLoading(false);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              setEventImage(downloadURL);
              // Create event with uploaded image
              createEvent(downloadURL);
            })
            .catch((error) => {
              console.error(error);
              setError('An error occurred while getting download URL.');
              setLoading(false);
            });
        }
      );
    } catch (error) {
      console.error(error);
      setError('An error occurred while uploading the image.');
      setLoading(false);
    }
  };

  const createEvent = async (imageUrl) => {
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

      const response = await fetch(`${process.env.BACKEND_URL}/api/create-event`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      });

      if (!response.ok) {
        throw new Error('Failed to create event');
      }

      console.log('Event created successfully');
      // Display success message
      setSuccessMessage('Your event has been created successfully!');
      // Redirect to the events page after 3 seconds
      setTimeout(() => {
        navigate("/my-events");
      }, 3000);
    } catch (error) {
      setError('An error occurred while creating event');
      console.error('Error creating event:', error);
    } finally {
      setLoading(false);
    }

    // Reset form fields after submission
    setEventName('');
    setEventDescription('');
    setEventVenue('');
    setEventCity('');
    setEventCategory('');
    setEventDate('');
    setEventPrice('');
    setEventImage(null);
  };

  return (
    <div className="container-full py-5 h-100 black-background" style={{ backgroundImage: `url(${CreateEventImage})`, backgroundSize: 'cover', backgroundPosition: 'center'  }}>
      <div className="signup row d-flex justify-content-center align-items-center h-100">
        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
          <div className="card custom-card shadow-2-strong" style={{ borderRadius: '1rem' }}>
            <div className="card-body p-5">
              <h2 className="mb-5 text-center">Create Your Event!</h2>
              <form onSubmit={handleUploadAndCreateEvent}>
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
                    className="form-control form-control-lg"
                    placeholder="Event Description"
                    value={eventDescription}
                    onChange={(e) => setEventDescription(e.target.value)}
                    style={{ resize: 'vertical' }} // Add this style
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
                <div className='row'> 
                  <div className="mb-4 col-6">
                      <select
                          className={`form-select form-select-lg ${eventCity ? 'custom-select-selected' : 'custom-select-placeholder'}`}
                          value={eventCity}
                          onChange={(e) => setEventCity(e.target.value)}
                      >
                          <option value="" disabled hidden>Select City</option>
                          <option value="London">London</option>
                          <option value="New York">New York</option>
                          <option value="Paris">Paris</option>
                          <option value="Berlin">Berlin</option>
                      </select>
                  </div>

                  <div className="mb-4 col-6">
                      <select
                          className={`form-select form-select-lg ${eventCategory ? 'custom-select-selected' : 'custom-select-placeholder'}`}
                          value={eventCategory}
                          onChange={(e) => setEventCategory(e.target.value)}
                      >
                          <option value="" disabled hidden>Select Category</option>
                          <option value="Music">Music</option>
                          <option value="Comedy">Comedy</option>
                          <option value="Business">Business</option>
                          <option value="Sport">Sport</option>
                          <option value="Other">Other</option>
                      </select>
                  </div>
                </div>
                
                <div className="row">
                  <div className="mb-4 col-6">
                    <input
                      type="date"
                      className="form-control form-control-lg"
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                    />
                  </div>
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
                <div className="mb-4">
                  <label className='mb-3'>Upload Your Image Here</label>
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      className="form-control-file"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                {percent > 0 && <p>{percent}% done</p>}
                {error && <p className="text-danger">{error}</p>}
                {successMessage && <p className="text-white mb-4">{successMessage}</p>}
                <div className="d-flex flex-column align-items-center mb-4">
                  <button className="btn btn-primary custom-btn create-event-button" type="submit" disabled={loading}>
                    {loading ? 'Creating Event...' : 'Create Event'}
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
