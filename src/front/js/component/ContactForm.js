import React, { useState } from "react";
import { Link } from "react-router-dom";
import ContactElements from "./ContactElements";
import ContactImage from "../../img/pitch/overlay/contact-section-overlay.png";

export const ContactForm = () => {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate sending message
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
    }, 2000); // Simulating 2 seconds delay, replace this with your actual send message function
  };

  return (
    <div
      className="container-full py-5 h-100 "
      style={{
        backgroundImage: `url(${ContactImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="row d-flex justify-content-center align-items-center h-100 contact">
        <div className="col-12 col-md-8 col-lg-6 col-xl-5 text-center">
          {/* Header */}
          <h1 className="mb-4">Contact Us.</h1>
          <p className="mb-5">
            If you need our help, have questions about how to use the platform{" "}
            <br />
            or are experiencing technical difficulties, please do not hesitate
            to contact us.
          </p>

          <div
            className="card contact-card shadow-2-strong"
            style={{ borderRadius: "1rem" }}
          >
            <div className="card-body p-5 text-center">
              {/* Name and Email */}
              <form onSubmit={handleSubmit}>
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
                    type = "text"
                    id="inputMessage"
                    className="form-control form-control"
                    placeholder="Your Message"
                    rows="4"
                  ></textarea>
                </div>

                {/* Send Message Button */}
                {!sent ? (
                  <button
                    className="btn btn-primary custom-btn contact-btn btn-block"
                    type="submit"
                    disabled={sending}
                  >
                    {sending ? "Sending..." : "Send Message"}
                  </button>
                ) : (
                  <p className="contact-success mb-3">
                    Thank you for messaging Eventure. One of our team will
                    contact you shortly!
                  </p>
                )}
              </form>
            </div>
          </div>
          <ContactElements />
        </div>
      </div>
    </div>
  );
};
