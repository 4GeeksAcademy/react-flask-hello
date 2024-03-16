import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faFacebookF, faInstagram, faTiktok, faYoutube } from '@fortawesome/free-brands-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import '../../styles/footer.css'

const Footer = () => {
  const redirectTo = (url) => {
    window.open(url, '_blank');
  };

  return (
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
            <button className="btn btn-primary">Join the News</button>
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
          <button onClick={() => redirectTo('/terms')} className="btn btn-link text-decoration-none text-secondary p-0 mb-2 d-inline">Terms and Conditions</button>
          {' | '}
          <button onClick={() => redirectTo('/cookie-notice')} className="btn btn-link text-decoration-none text-secondary p-0 mb-2 d-inline">Cookie Notice</button>
          {' | '}
          <button onClick={() => redirectTo('/news')} className="btn btn-link text-decoration-none text-secondary p-0 mb-2 d-inline">News</button>
          <p>Copyright © Recommend Me a Book. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
