import React from "react";
import "../../styles/footer.css";

export const Footer = () => (
  <footer className=" text-center text-white">
    <div className="container">
      <section className="mb-4 py-2">
        <a
          className="btn btn-outline-light btn-floating m-1"
          href="#!"
          role="button">
          <i className="fab fa-facebook-f"></i>
        </a>
        <a
          className="btn btn-outline-light btn-floating m-1"
          href="#!"
          role="button">
          <i className="fab fa-twitter"></i>
        </a>
        <a
          className="btn btn-outline-light btn-floating m-1"
          href="#!"
          role="button">
          <i className="fab fa-google"></i>
        </a>
        <a
          className="btn btn-outline-light btn-floating m-1"
          href="#!"
          role="button">
          <i className="fab fa-instagram"></i>
        </a>
        <a
          className="btn btn-outline-light btn-floating m-1"
          href="#!"
          role="button">
          <i className="fab fa-linkedin-in"></i>
        </a>
        <a
          className="btn btn-outline-light btn-floating m-1"
          href="#!"
          role="button">
          <i className="fab fa-github"></i>
        </a>
      </section>
    </div>
  </footer>
);
