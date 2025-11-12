import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

export const Header = () => {
  return (
   <section className="hero">
  <div className="container">
    <div className="row align-items-center">

      {/* Texto Hero */}
      <div className="col-lg-6 text-center text-lg-start mb-4 mb-lg-0">
        <div className="hero-text">
          <h1>
            Shop Smart with <span>Spidys</span>
          </h1>
          <p>
            Experience seamless online shopping with our curated collection. Browse products, manage your cart, and enjoy a personalized shopping experience.
          </p>

          {/* Botones */}
          <div className="d-flex flex-column flex-sm-row gap-2 gap-sm-3 justify-content-center justify-content-lg-start hero-buttons">
            <Link to="/explorar" className="btn primary">Browse Products ➝</Link>
            <Link to="/login" className="btn secondary">
              <i className="fas fa-user me-2"></i> Login to Account
            </Link>
          </div>

          {/* Stats */}
          <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center justify-content-lg-start hero-stats mt-4">
            <div className="text-center text-lg-start">
              <h3>500+</h3>
              <p>Products</p>
            </div>
            <div className="text-center text-lg-start">
              <h3>24/7</h3>
              <p>Support</p>
            </div>
            <div className="text-center text-lg-start">
              <h3>Fast</h3>
              <p>Delivery</p>
            </div>
          </div>
        </div>
      </div>

      {/* Imagen Hero */}
      <div className="col-lg-6 d-flex justify-content-center justify-content-lg-end hero-image">
        <div className="checkout-wrapper position-relative">
          <img
            src="https://cdn-icons-png.flaticon.com/512/10919/10919715.png"
            alt="Decorative background"
            className="checkout-bg img-fluid"
          />
          <div className="checkout-card position-absolute top-50 start-50 translate-middle d-flex align-items-center">
            <i className="fas fa-shopping-cart cart-icon me-2"></i>
            <div>
              <h4>Easy Checkout</h4>
              <p>Secure & Fast</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>


  );
};
