import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";
import Hero from "../component/Hero";
import { EventCard } from "../component/EventCard";
import { SignUpForm } from "../component/SignUpForm";
import SignUpNow from "../sections/SignUpNow";

export const Events = () => {
  const { store, actions } = useContext(Context);

  const imageUrl01 = "https://picsum.photos/200/150?random=1";
  const imageUrl02 = "https://picsum.photos/200/150?random=2";
  const imageUrl03 = "https://picsum.photos/200/150?random=3";
  const imageUrl04 = "https://picsum.photos/200/150?random=4";
  const imageUrl05 = "https://picsum.photos/200/150?random=5";
  const imageUrl06 = "https://picsum.photos/200/150?random=6";
  const imageUrl07 = "https://picsum.photos/200/150?random=7";
  const imageUrl08 = "https://picsum.photos/200/150?random=8";

  return (
    <div className="text-center">

      {/* Events Page Hero */}
      <div className="hero">
        <Hero
          header="Find An Event Near You"
          text="Explore a world of diverse events tailored to your interests. From exciting concerts and captivating art exhibitions to thrilling sports and enriching workshops, there’s something for everyone. Find your next unforgettable experience by browsing the events below."
        />
      </div>

      <div className="container-fluid popular-events black-two-background d-flex align-items-center justify-content-center">
        <div className="container text-center">

          <div className="row mb-4">
            <div className="col">
              <h2 className="section-header-white">All Events Near You</h2>
            </div>
          </div>


          {/* FIRST ROW */}

          <div className="row">
            <div className="col-md-3 mb-4">
              <EventCard imageUrl={imageUrl01}/>
            </div>
            <div className="col-md-3 mb-4">
              <EventCard imageUrl={imageUrl02}/>
            </div>
            <div className="col-md-3 mb-4">
              <EventCard imageUrl={imageUrl03}/>
            </div>
            <div className="col-md-3 mb-4">
              <EventCard imageUrl={imageUrl04}/>
            </div>
          </div>

          {/* SECOND ROW */}

          <div className="row">
            <div className="col-md-3 mb-4">
              <EventCard imageUrl={imageUrl05}/>
            </div>
            <div className="col-md-3 mb-4">
              <EventCard imageUrl={imageUrl06}/>
            </div>
            <div className="col-md-3 mb-4">
              <EventCard imageUrl={imageUrl07}/>
            </div>
            <div className="col-md-3 mb-4">
              <EventCard imageUrl={imageUrl08}/>
            </div>
          </div>

          <SignUpNow />

        </div>
      </div>

    </div>
  );
};
