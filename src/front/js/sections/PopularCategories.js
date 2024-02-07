import React, { useContext } from "react";
import { EventCard } from "../component/EventCard";

const PopularCategories = () => {

  const imageUrl04 = "https://picsum.photos/200/150?random=4";
  const imageUrl05 = "https://picsum.photos/200/150?random=5";
  const imageUrl06 = "https://picsum.photos/200/150?random=6";
  const imageUrl07 = "https://picsum.photos/200/150?random=7";

  return (
    <div className="container-fluid popular-categories grey-two-background d-flex align-items-center justify-content-center">
      <div className="container">

        <div className="section-header">
        <h2 className="text-center mt-4 mb-3">Popular Categories Near You</h2>
        </div>
        

        <div className="row">
          <div className="col-lg-3 col-md-6 mb-4">
            <EventCard imageUrl={imageUrl04} />
          </div>
          <div className="col-lg-3 col-md-6 mb-4">
            <EventCard imageUrl={imageUrl05} />
          </div>
          <div className="col-lg-3 col-md-6 mb-4">
            <EventCard imageUrl={imageUrl06} />
          </div>
          <div className="col-lg-3 col-md-6 mb-4">
            <EventCard imageUrl={imageUrl07} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularCategories;
