import React from "react";
import { Link } from "react-router-dom";
import "./Call.css";

const StartShopping = () => {
  return (
    <section className="start-shopping">
      <div className="start-header">
        <h2>Ready to Start Shopping?</h2>
        <p>
          Join Spidys today and discover a world of products at your fingertips. Sign up for personalized recommendations and exclusive deals.
        </p>
      </div>

      <div className="start-cards">
        <div className="start-card">
          <div className="card-icon red">
            <i className="fas fa-user-plus"></i>
          </div>
          <h3>Create Account</h3>
          <p>Set up your personal account and unlock exclusive features.</p>
          <Link to="/signup" className="card-link">Get Started →</Link>
        </div>

        <div className="start-card">
          <div className="card-icon coral">
            <i className="fas fa-tags"></i>
          </div>
          <h3>Browse Deals</h3>
          <p>Discover amazing products and special offers every day.</p>
          <Link to="/products" className="card-link">View Products →</Link>
        </div>

        <div className="start-card">
          <div className="card-icon yellow">
            <i className="fas fa-headset"></i>
          </div>
          <h3>Get Support</h3>
          <p>Need help? Our team is here to assist you 24/7.</p>
          <Link to="/contact" className="card-link">Contact Us →</Link>
        </div>
      </div>

      <Link to="/login" className="login-btn">Login to Your Account</Link>
    </section>
  );
};

export default StartShopping;
