import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

export const Header = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-text">
          <h1>
            Shop Smart with <span>Spidys</span>
          </h1>
          <p>
            Experience seamless online shopping with our curated collection. Browse products, manage your cart, and enjoy a personalized shopping experience.
          </p>

          <div className="hero-buttons">
            <Link to="/explorar" className="btn primary">Browse Products ➝</Link>
            <Link to="/login" className="btn secondary">
              <i className="fas fa-user"></i> Login to Account
            </Link>
          </div>

          <div className="hero-stats">
            <div>
              <h3>500+</h3>
              <p>Products</p>
            </div>
            <div>
              <h3>24/7</h3>
              <p>Support</p>
            </div>
            <div>
              <h3>Fast</h3>
              <p>Delivery</p>
            </div>
          </div>
        </div>

        <div className="hero-image">
          <div className="checkout-wrapper">
            <img
              src="https://cdn-icons-png.flaticon.com/512/10919/10919715.png"
              alt="Decorative background"
              className="checkout-bg"
            />
            <div className="checkout-card">
              <i className="fas fa-shopping-cart cart-icon"></i>
              <div>
                <h4>Easy Checkout</h4>
                <p>Secure & Fast</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
