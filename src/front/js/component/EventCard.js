import React from "react";
import { Link } from "react-router-dom";

export const EventCard = ({ imageUrl }) => {
  return (
    <div className="card event-card" style={{ width: "18rem" }}>
      
      <img src={imageUrl} className="card-img-top" alt="Event Image" />

      <div className="event-card-body">
        <h5 className="event-card-title">Event Title</h5>
        <p className="event-card-location">Location: Thompsons</p>
              <div className="d-flex justify-content-between event-card-info">
                <p>Tickets: £20</p>
                <p>Date: 20/20/2022</p>
              </div>    
              <div className="d-flex justify-content-between align-items-center">
                <Link to="#" className="btn btn-primary custom-btn">More info.</Link>
                <i class="fa-solid fa-heart"></i>
              </div>

      </div>
    </div>
  );
};
