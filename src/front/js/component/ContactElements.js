import React from "react";

const ContactElements = () => {
  return (
    <div className="container">
      <div className="row contact-elements">
        <div className="col-md-6">

          {/* Content for the first column */}

          <div className="p-3 text-center">

            {/* Email icon */}
            <i className="fas fa-envelope fa-2x mb-2 text-white"></i>

            {/* Header */}
            <h3>Email Us</h3>

            {/* Paragraph */}
            <p>Email us for general queries, including marketing and partnership opportunities.</p>

            {/* Email address */}
            <a href="mailto:hello@eventure.com">hello@eventure.com</a>
          </div>
        </div>
       
        <div className="col-md-6">

          {/* Content for the second column */}

          <div className="p-3 text-center">
            
            {/* Telephone icon */}
            <i className="fas fa-phone-alt fa-2x mb-2"></i>

            {/* Header */}
            <h3>Call Us</h3>
            
            {/* Paragraph */}
            <p>Call us to speak to a member of our team. We are always happy to help.</p>

            {/* Phone number */}
            <a href="tel:+12345678901">+1 (234) 567-8901</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactElements;
