import React from "react";
import ComponentifyLogoDark from "../../img/componentify-logo-dark.png";

export const Footer = () => (
  <footer className="text-center text-lg-start border mt-xl-5 pt-4">
    <div className="container-fluid">
      <div className="container p-4">
        <div className="row">
          <div className="col-lg-3 col-md-4 mb-4 mb-lg-0 d-flex flex-column align-items-start">
            <div className="d-flex align-items-center">
              <img
                src={ComponentifyLogoDark}
                alt="Logo"
                width="45"
                height="39"
                className="d-inline-block align-text-start"
                style={{ marginTop: '-10px' }}
              />
              <span className="text-dark ml-2">
                <h5><strong>COMPONENTIFY</strong></h5>
              </span>
            </div>
            <p className="mt-3">Designed and built with all the love in the world by the Bootstrap team with the help of our contributors. Code licensed MIT, docs CC BY 3.0. Currently v5.3.1.</p>
          </div>

          <div className="col-lg-2 col-md-4 mb-4 mb-lg-0">
            <h5 className="text-uppercase mb-4" style={{ color: "#FD5812" }}>
              <strong>OUR WORLD</strong>
            </h5>
            <ul className="list-unstyled mb-4">
              <li>
                <a href="#aboutus" className="text-dark">About us</a>
              </li>
              <li>
                <a href="#!" className="text-dark">Collections</a>
              </li>
              <li>
                <a href="#!" className="text-dark">Environmental philosophy</a>
              </li>
              <li>
                <a href="#!" className="text-dark">Artist collaborations</a>
              </li>
            </ul>
          </div>

          <div className="col-lg-2 col-md-4 mb-4 mb-lg-0">
            <h5 className="text-uppercase mb-4" style={{ color: "#FD5812" }}>
              <strong>Assistance</strong>
            </h5>
            <ul className="list-unstyled mb-4">
              <li>
                <a href="#!" className="text-dark">Contact us</a>
              </li>
              <li>
                <a href="#!" className="text-dark">Shipping Information</a>
              </li>
              <li>
                <a href="#!" className="text-dark">Returns & Exchanges</a>
              </li>
            </ul>
          </div>

          <div className="col-lg-2 col-md-4 mb-4 mb-lg-0">
            <h5 className="text-uppercase mb-4" style={{ color: "#FD5812" }}>
              <strong>COMMUNITY</strong>
            </h5>
            <ul className="list-unstyled mb-4">
              <li>
                <a href="#!" className="text-dark">GitHub</a>
              </li>
              <li>
                <a href="#!" className="text-dark">Discord</a>
              </li>
              <li>
                <a href="#!" className="text-dark">YouTube</a>
              </li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6">
            <h5 className="text-uppercase mb-4" style={{ color: "#FD5812" }}>
              <strong>Sign up to our newsletter</strong>
            </h5>
            <div className="form-outline form-white mb-4">
              <input type="email" id="form5Example2" placeholder="Email address" className="form-control" />
            </div>
            <button type="submit" className="btn btn-outline-light" style={{ backgroundColor: "#FD5812", color: "white" }} data-mdb-ripple-color="dark">Subscribe</button>
          </div>
        </div>
      </div>

      <div className="text-center p-3 border-top border-white" style={{ color: "#FD5812" }}>
        © 2023 Copyright:
        <a className="text-dark" href="">
          Componentify.com
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
