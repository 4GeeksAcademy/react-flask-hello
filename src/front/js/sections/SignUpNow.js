// AboutSection.js

import React from 'react';
import AboutImage from '/workspaces/europe-fs-pt-14-ryandornan-mariahurtado/src/front/img/music/crowd-02.png';
import { Link } from "react-router-dom";


const SignUpNow = () => {
  return (
    <div className="container-full black-background">
      <div className="container sign-up d-flex justify-content-center align-items-center">
        {/* Left Column - Image */}
        <div className="col-md-5 mb-4 image-container">
          <img
            src={AboutImage}
            className="img-fluid"
            alt="Crowd at a Music Event"
          />
        </div>

        {/* Right Column - Sign Up Now Text */}
        <div className="col-md-5 mb-4 pink-div">
          <h2 className="sign-up-header mb-4">Want to promote your own event?</h2>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In id odio
            ultrices, rhoncus leo ac, placerat diam. Etiam id nulla ut est
            interdum mattis a eget tellus. Integer in erat imperdiet orci
            ullamcorper venenatis.
          </p>


          
        {/* View All Events Button */}
        <Link to="/sign-up">
          <button
            className="btn btn-secondary custom-btn-dark mt-5"
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