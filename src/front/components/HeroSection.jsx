import React from "react";
import "./HeroSection.css";

export const HeroSection = () => {
  return (
    <section className="features">
      <div className="features-header">
        <h2>Why Choose Spidys?</h2>
        <p>
          We provide a seamless shopping experience with powerful features designed for your convenience.
        </p>
      </div>

      <div className="features-row">
        <div className="feature-card">
          <div className="feature-icon red">
            <i className="fas fa-box-open"></i>
          </div>
          <h3>Wide Selection</h3>
          <p>Browse through hundreds of quality products across multiple categories.</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon coral">
            <i className="fas fa-shopping-cart"></i>
          </div>
          <h3>Smart Cart</h3>
          <p>Manage your purchases easily with our intuitive shopping cart system.</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon yellow">
            <i className="fas fa-qrcode"></i>
          </div>
          <h3>QR Generator</h3>
          <p>Create custom QR codes for your shop to enhance customer engagement.</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon blue">
            <i className="fas fa-lock"></i>
          </div>
          <h3>Secure Login</h3>
          <p>Access your personalized account with our secure authentication system.</p>
        </div>
      </div>
    </section>
  );
};

