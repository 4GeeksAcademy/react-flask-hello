import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h2>Quick Links</h2>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Products</a></li>
            <li><a href="#">Shopping Cart</a></li>
            <li><a href="#">Login</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h2>Services</h2>
          <ul>
            <li><a href="#">QR Code Generator</a></li>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">Customer Support</a></li>
            <li><a href="#">Order Tracking</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h2>Contact</h2>
          <p><strong>Email:</strong> support@spidys.com</p>
          <p><strong>Phone:</strong> +1 (234) 567 890</p>
          <p><strong>Support Hours:</strong> 24/7 Available</p>
        </div>
        <div className="footer-section">
          <h2>Legal</h2>
          <ul>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#">Cookie Policy</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-brand">
        <img
          src="https://imagedelivery.net/xaKlCos5cTg_1RWzIu_h-A/b1c380b2-282d-481f-6d27-db0aa86c0d00/public"
          alt="Spidys Logo"
        />
        <p>
          Your trusted e-commerce platform for seamless online shopping experiences.
          Browse, shop, and enjoy fast delivery.
        </p>
      </div>

      <div className="footer-bottom">
        © 2025 Spidys. All rights reserved.
      </div>
    </footer>
  );
}
