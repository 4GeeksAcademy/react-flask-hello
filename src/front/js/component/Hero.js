import React from "react";
import EventSearchBar from "./EventSearchBar";


const Hero = ({ header, text }) => {
  return (

    <div className="hero container-full">
      
      <div className="hero-content container">

        <div className="row d-flex align-items-center justify-content-center">
          <div className="row hero-header mt-5">
            <h1>{header}</h1>
          </div>
        </div>

        <EventSearchBar />

        <div className="row d-flex align-items-center justify-content-center pb-5">
          <div className="col-8 hero-text">
            <p>{text}</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Hero;