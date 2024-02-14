// AboutSection.js

import React from 'react';
import AboutImage from "../../img/pitch/hands-01.png";
import { Link } from "react-router-dom";


const AboutSection = () => {
  return (
    <div className="container-full black-background">
      <div className="container about d-flex justify-content-center align-items-center">
        {/* Left Column - Image */}
        <div className="col-md-5 mb-4 image-container">
          <img
            src={AboutImage}
            className="img-fluid"
            alt="Crowd at a Music Event"
          />
        </div>

        {/* Right Column - About Text */}
        <div className="col-md-5 mb-4">
          <h2 className="about-header mb-4">Welcome To Eventure</h2>

          <p>
          At Eventure, we're here to redefine event planning. Say goodbye to stress and hello to seamless, 
          unforgettable experiences. From intimate gatherings to grand celebrations, Eventure empowers you to create, 
          organize, and collaborate like never before.
          </p>
          <p>
          Let's embark on a journey of endless possibilities, where every event 
          is a new adventure waiting to unfold.
          </p>

          
        {/* View All Events Button */}
        <Link to="/events">
          <button
            className="btn btn-primary custom-btn mt-5"
            id="viewAllEventsBtn"
          >
            View All Events
          </button>
        </Link>
          

        </div>
      </div>
    </div>
  );
};

export default AboutSection;

<Link to="/sign-up">
<button
  className="btn btn-primary custom-btn mt-5"
  id="signUpNow"
>
  Sign Up Now
</button>
</Link>
