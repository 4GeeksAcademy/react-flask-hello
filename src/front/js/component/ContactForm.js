import React from "react";
import { Link } from "react-router-dom";
import ContactElements from "./ContactElements";

export const ContactForm = () => {
  return (
    <div className="container-full py-5 h-100 grey-background">
      <div className="row d-flex justify-content-center align-items-center h-100 contact">
        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
          <div className="card custom-card shadow-2-strong" style={{ borderRadius: "1rem" }}>
            <div className="card-body p-5 text-center">

              {/* Header */}
              <h2 className="mb-5">Contact Us.</h2>

              {/* Name and Email */}
              <div className="row mb-4">
                <div className="col">
                  <div className="form-outline">
                    <input
                      type="text"
                      id="inputName"
                      className="form-control"
                      placeholder="Your Name"
                    />
                  </div>
                </div>
                <div className="col">
                  <div className="form-outline">
                    <input
                      type="email"
                      id="inputEmail"
                      className="form-control"
                      placeholder="Your Email"
                    />
                  </div>
                </div>
              </div>

              {/* Company Name and Country */}
              <div className="row mb-4">
                <div className="col">
                  <div className="form-outline">
                    <input
                      type="text"
                      id="inputCompany"
                      className="form-control form-control-lg form-lettering"
                      placeholder="Company Name"
                    />
                  </div>
                </div>
                <div className="col">
                  <div className="form-outline">
                    <select
                      id="inputCountry"
                      className="form-select form-select-lg form-lettering"
                    >
                      <option value="">Select Continent</option>
                      <option value="">United Kingdom</option>
                      <option value="">Europe</option>
                      <option value="">North America</option>
                      <option value="">South America</option>
                      <option value="">Australia</option>
                      <option value="">Asia</option>
                      <option value="">Africa</option>
                      <option value="">Antarctica</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Message */}
              <div className="form-outline mb-4">
                <textarea
                  id="inputMessage"
                  className="form-control form-control-lg"
                  placeholder="Your Message"
                  rows="4"
                ></textarea>
              </div>

              {/* Send Message Button */}
              <button
                className="btn btn-primary custom-btn btn-block "
                type="submit"
              >
                Send Message
              </button>
            </div>
          </div>
          <ContactElements />
        </div>
        
      </div>
    </div>
  );
};
