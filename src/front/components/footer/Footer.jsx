import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import Contacto from "./Contacto";
import "./footer.css";

export const Footer = () => (
  <footer className="site-footer">
    <div className="footer-container">
      <div className="footer-top">
        <a href="/" className="footer-brand">
          <img src="https://flowbite.com/docs/images/logo.svg" alt="GameStore Logo" />
          <span>GameStore</span>
        </a>

        <ul className="footer-nav">
          <li><a href="/AboutUs">Equipo</a></li>
          <li><a href="/privacidad">Política de privacidad </a></li>
          <li><Contacto /></li>
        </ul>
      </div>

      <div className="footer-social">
        <FaFacebookF />
        <FaTwitter />
        <FaInstagram />
        <FaLinkedinIn />
      </div>

      <hr className="footer-divider" />

      <div className="footer-bottom">
        © 2025 <a href="/">GameStore™</a>. All Rights Reserved.
      </div>
    </div>
  </footer>
);
