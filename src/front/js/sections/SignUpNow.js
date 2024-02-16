import React from 'react';
import { Link } from "react-router-dom";

import SignUpNowImage from "../../img/pitch/sign-up-section.jpg"


const SignUpNow = () => {
  return (
    <div className="container-fluid sign-up-now-section ">
      <div className="container sign-up d-flex justify-content-center align-items-stretch">
        {/* Left Column - Image */}
        <div className="col-md-5 image-container">
          <img
            src={SignUpNowImage}
            className="img-fluid"
            alt="Crowd at a Music Event"
          />
        </div>

        {/* Right Column - Sign Up Now Text */}
        <div className="col-md-5 pink-div height-100">
          <h2 className="sign-up-header mb-4">Ready to take your event to the next level?</h2>

          <p className='sign-up-now-section-text'>
          Join Eventure and gain access to a world of possibilities. 
          Whether you're organizing a concert, workshop, or art exhibition, 
          Eventure makes it easy to promote your event and connect with your audience.
          </p>

          <p className='sign-up-now-section-text'>
          Sign up now and start making your event a success with Eventure!
          </p>

          
        {/* View All Events Button */}
        <Link to="/sign-up">
          <button
            className="btn btn-secondary sign-up-now-btn-dark"
            id="signUpNow"
          >
            Sign Up Now
          </button>
        </Link>

          

        </div>
      </div>
    </div>
  );
};

export default SignUpNow;