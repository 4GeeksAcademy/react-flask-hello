import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import Contacto from "./Contacto";
import "./footer.css";
import { Link } from "react-router-dom"
import Logo from "../../assets/img/logo.png"

export const Footer = () => (
  <footer className="site-footer">

    <hr className="footer-divider" />

    <div className="footer-container">
      <div className="footer-top">
         <div className="flex shrink-0 items-center">
         <Link to="/">
            <img src={Logo} alt="logo" className="h-16 w-auto mix-blend-darken logoempresa" /> 
          </Link>
         <h1 href="#" className="rounded-md px-3 py-2 text-2xl font-bold text-gray-300">Game Store</h1>
        </div>

        <ul className="footer-nav">
          <li><a href="/AboutUs">Equipo</a></li>
          <li><a href="/privacidad">Política de privacidad</a></li>
          <li><a href="/Soporte" className="rounded-md px-3 py-2 text-lg font-bold text-gray-300 hover:text-white">Soporte</a></li>         
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
        © 2025 <a href="/">GameStore™</a>. All Rights Reserved..
      </div>
    </div>
  </footer>
);
