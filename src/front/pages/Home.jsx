// src/front/js/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";

// Optional: include these if you plan to use them later
// import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
// import { useGeoLocation } from "../hooks/GeoLocation.jsx";

export const Home = () => {
  const year = new Date().getFullYear();

  return (
    <main className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 m-0">WhiteGlove BnB</h1>
        <div>
          <Link to="/login" className="btn btn-outline-secondary me-2">Log in</Link>
          <Link to="/signup" className="btn btn-primary">Sign up</Link>
        </div>
      </div>

      <section className="row align-items-center g-4">
        <div className="col-md-6">
          <div
            className="position-relative"
            style={{
              paddingTop: "56.25%",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 0 0 1px rgba(0,0,0,.08)"
            }}
          >
            <iframe
              src="https://www.youtube.com/embed/YU7eKZ9iIMg"
              title="Happy Airbnb arrival"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
            />
          </div>
        </div>

        <div className="col-md-6">
          <h2 className="h4">Our mission</h2>
          <p className="text-muted">
            WhiteGlove BnB helps hosts share the right details, fast. We turn a host’s
            Google Calendar into a clear schedule and a single guest link that shows the
            essentials—property basics, live weather, and top nearby restaurants—so
            arrivals are smooth and questions are few.
          </p>

          <ul className="mb-4">
            <li>Connect Google Calendar to see booked and open dates</li>
            <li>Guest preview page with live weather and Yelp restaurants</li>
            <li>Simple setup so hosts and guests stay on the same page</li>
          </ul>

          <Link to="/signup" className="btn btn-primary me-2">Get Started</Link>
          <Link to="/login" className="btn btn-outline-secondary">Log in</Link>
        </div>
      </section>

      <div className="text-center text-muted mt-5 border rounded-3 py-3">
        © {year} WhiteGlove BnB
      </div>
    </main>
  );
};
