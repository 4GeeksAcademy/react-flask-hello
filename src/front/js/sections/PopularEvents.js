import React from "react";
import { EventCard } from "../component/EventCard";
import { Link } from "react-router-dom";

const PopularEvents = () => {
  const imageUrl01 = "https://picsum.photos/200/150?random=1";
  const imageUrl02 = "https://picsum.photos/200/150?random=2";
  const imageUrl03 = "https://picsum.photos/200/150?random=3";

  return (
    <div className="container-fluid popular-events grey-background d-flex align-items-center justify-content-center">
      <div className="container text-center section-header">
        <div className="section-header">
          <h2 className="text-center mt-4">Popular Events Near You</h2>
        </div>

        <div className="row d-flex justify-content-center">
          <div className="col-lg-3 col-md-6 mb-4">
            <EventCard imageUrl={imageUrl01} />
          </div>
          <div className="col-lg-3 col-md-6 mb-4">
            <EventCard imageUrl={imageUrl02} />
          </div>
          <div className="col-lg-3 col-md-6 mb-4">
            <EventCard imageUrl={imageUrl03} />
          </div>
        </div>

        {/* View More Events Button */}
        <Link to="/events" className="btn btn-primary custom-btn mt-5">
          View More Events
        </Link>
      </div>
    </div>
  );
};

export default PopularEvents;
