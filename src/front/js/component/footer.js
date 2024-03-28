import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faFacebookF, faInstagram, faTiktok, faYoutube } from '@fortawesome/free-brands-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/footer.css';

const Footer = () => {
  const [showNewsletterForm, setShowNewsletterForm] = useState(false);
  const navigate = useNavigate();

  const redirectTo = (path) => {
    navigate(path);
  };

  const toggleNewsletterForm = () => {
    setShowNewsletterForm(!showNewsletterForm);
  };

  return (
    <>
      {showNewsletterForm && (
        <div className="newsletter-modal">
          <div className="newsletter-modal-content">
            <span className="close" onClick={toggleNewsletterForm}>&times;</span>
            <form className="newsletter-form">
              <h2>Subscribe to our Newsletter</h2>
              <p>Enter your email address:</p>
              <input type="email" placeholder="Email Address" required />
              <button type="submit" className="btn btn-magic">Subscribe</button>
            </form>
          </div>
        </div>
      )}
      <footer className="bg-dark text-light py-4 footer">
        <div className="container">
          <div className="row">
            <div className="col-md-4 ayuda">
              <h5>Help</h5>
              <button onClick={() => redirectTo('/about-us')} className="btn btn-link text-decoration-none text-secondary p-0 mb-2 d-block">About Us</button>
              <button onClick={() => redirectTo('/recommenders')} className="btn btn-link text-decoration-none text-secondary p-0 mb-2 d-block">Who are the "Recommenders"</button>
              <button onClick={() => redirectTo('/privacy-notice')} className="btn btn-link text-decoration-none text-secondary p-0 mb-2 d-block">Privacy Notice</button>
              <button onClick={() => redirectTo('/advertisements')} className="btn btn-link text-decoration-none text-secondary p-0 d-block">Advertisements on the page</button>
            </div>
            <div className="col-md-4 unete">
              <h5>Join Our Newsletter</h5>
              <p>Receive the best recommendations, news, and more directly in your email.</p>
              <button onClick={toggleNewsletterForm} className="btn btn-primary">Join the News</button>
            </div>
            <div className="col-md-4 siguenos">
              <h5>Follow Us</h5>
              <div>
                <a href="#!" className="text-secondary me-2"><FontAwesomeIcon icon={faTwitter} size="lg" /></a>
                {' | '}
                <a href="#!" className="text-secondary me-2"><FontAwesomeIcon icon={faFacebookF} size="lg" /></a>
                {' | '}
                <a href="#!" className="text-secondary me-2"><FontAwesomeIcon icon={faInstagram} size="lg" /></a>
                {' | '}
                <a href="#!" className="text-secondary me-2"><FontAwesomeIcon icon={faTiktok} size="lg" /></a>
                {' | '}
                <a href="#!" className="text-secondary"><FontAwesomeIcon icon={faYoutube} size="lg" /></a>
              </div>
            </div>
          </div>
          <div className="border-top border-secondary mt-3 pt-3 text-center text-secondary">
            <button onClick={() => redirectTo('/privacy-policy')} className="btn btn-link text-decoration-none text-secondary p-0 mb-2 d-inline">Privacy Policy</button>
            {' | '}
            <button onClick={() => redirectTo('/terms-and-conditions')} className="btn btn-link text-decoration-none text-secondary p-0 mb-2 d-inline">Terms and Conditions</button>
            {' | '}
            <button onClick={() => redirectTo('/cookies-notice')} className="btn btn-link text-decoration-none text-secondary p-0 mb-2 d-inline">Cookies Notice</button>
            {' | '}
            <button onClick={() => redirectTo('/contact')} className="btn btn-link text-decoration-none text-secondary p-0 mb-2 d-inline">Contact</button>
            <p>Copyright © Recommend Me a Book. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
