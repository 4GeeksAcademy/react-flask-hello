// src/front/js/pages/home.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Optional: include these if you plan to use them later
// import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
// import { useGeoLocation } from "../hooks/GeoLocation.jsx";

export const Home = () => {
  return (
    <main className="container py-5">
      <section className="text-center">
        <h1 className="display-5">WhiteGlove BnB</h1>
        <p className="text-muted">
          Connect your Google Calendar and share a simple guest preview with
          weather and nearby restaurants.
        </p>
        <div className="mt-3">
          <Link to="/signup" className="btn btn-primary me-2">Get Started</Link>
          <Link to="/login" className="btn btn-outline-secondary">Log in</Link>
        </div>
      </section>

      <hr className="my-5" />

      <section className="row g-3">
        <div className="col-md-6">
          <div className="p-3 border rounded-3 h-100">
            <h5>For Hosts</h5>
            <ul className="mb-0">
              <li>Sync bookings from Google Calendar</li>
              <li>Manage basic listing details</li>
            </ul>
          </div>
        </div>
        <div className="col-md-6">
          <div className="p-3 border rounded-3 h-100">
            <h5>For Guests</h5>
            <ul className="mb-0">
              <li>Weather for their stay</li>
              <li>Nearby restaurants (Yelp)</li>
            </ul>
          </div>
        </div>
      </section>

      <div className="text-center mt-4">
        <BackendPing />
      </div>
    </main>
  );
};

function BackendPing() {
  const [status, setStatus] = useState("Checking…");
  const base = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    if (!base) {
      setStatus("Set VITE_BACKEND_URL in .env ❌");
      return;
    }
    const controller = new AbortController();
    fetch(`${base}/api/hello`, { signal: controller.signal })
      .then(r => (r.ok ? r.json() : Promise.reject()))
      .then(() => setStatus("Connected ✅"))
      .catch(() => setStatus("Not connected ❌"));
    return () => controller.abort();
  }, [base]);

  return <small className="text-muted">Backend: {status}</small>;
}
