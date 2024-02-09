import React from 'react';
import CreateItinerary from '../component/createItinerary.js';
import { Link } from 'react-router-dom';
import '../../styles/createItinerary.css';

const CreateItineraryPage = () => {
  return (
    <div className="itinerary-container">
      <div className="page-title">Create Itinerary</div>
      <CreateItinerary />
      <Link to="/privatePage" className="back-button">
        Back to my Profile
      </Link>
    </div>
  );
};

export default CreateItineraryPage;