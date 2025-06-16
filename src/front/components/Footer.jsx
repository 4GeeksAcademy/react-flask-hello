import { Link } from "react-router-dom";
import "../../styles/footer.css";

export const Footer = () => {
	return (
		<footer className="footer">
			<div className="footer-container">
				<div className="footer-social">
					<a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a>
					<a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
					<a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
					<a href="https://plus.google.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-google-plus-g"></i></a>
					<a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-youtube"></i></a>
				</div>

				<ul className="footer-links">
					<li><Link to="/">Home</Link></li>
					<li><Link to="/eventos">Eventos</Link></li>
					<li><Link to="/AboutUs">About</Link></li>
					<li><Link to="/ContactoPage">Contact Us</Link></li>
				</ul>

				<p className="footer-copy">Copyright ©2025; Designed by <strong>DMPC</strong></p>
			</div>
		</footer>
	);
};
