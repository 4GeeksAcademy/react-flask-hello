import { Link } from "react-router-dom";
import "../../styles/footer.css";

export const Footer = () => {

	return (
		<footer className="footer text-light text-center py-5 mt-5">
			<div className="container">
				<div className="mb-4">
					<a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-light mx-2 fs-4"><i className="fab fa-facebook-f"></i></a>
					<a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-light mx-2 fs-4"><i className="fab fa-instagram"></i></a>
					<a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-light mx-2 fs-4"><i className="fab fa-twitter"></i></a>
					<a href="https://plus.google.com" target="_blank" rel="noopener noreferrer" className="text-light mx-2 fs-4"><i className="fab fa-google-plus-g"></i></a>
					<a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="text-light mx-2 fs-4"><i className="fab fa-youtube"></i></a>
				</div>

				<ul className="list-inline mb-3">
					<li className="list-inline-item mx-2"><a href="/" className="text-light text-decoration-none">Home</a></li>
					<li className="list-inline-item mx-2"><a href="/eventos" className="text-light text-decoration-none">Eventos</a></li>
					<li className="list-inline-item mx-2"><a href="/about" className="text-light text-decoration-none">About</a></li>
					<li className="list-inline-item mx-2"><a href="/contact" className="text-light text-decoration-none">Contact Us</a></li>
				</ul>
				<p className="mb-0 small">Copyright ©2025; Designed by <strong>DMPC</strong></p>
			</div>
		</footer>
	);
};