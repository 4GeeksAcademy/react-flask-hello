import React from 'react';
import "./Footer.css";

export const Footer = () => {
	return (
		<footer className="footer-container">
			<div className="footer-content">
				<div className="footer-nav">
					<div className="footer-section">
						<button className="footer-btn">
							<i className="bi bi-info-circle"></i>
							<span>Sobre nosotros</span>
						</button>
					</div>
					<div className="footer-section">
						<button className="footer-btn">
							<i className="bi bi-gear"></i>
							<span>Servicios</span>
						</button>
					</div>
					<div className="footer-section">
						<button className="footer-btn">
							<i className="bi bi-envelope"></i>
							<span>Contacto</span>
						</button>
					</div>
				</div>
				<div className="footer-divider"></div>
				<div className="footer-bottom">
					<p className="copyright">
						&copy; Flow {new Date().getFullYear()}. Todos los derechos reservados.
					</p>
					<div className="social-links">
						<a href="#" className="social-link">
							<i className="bi bi-linkedin"></i>
						</a>
						<a href="#" className="social-link">
							<i className="bi bi-twitter-x"></i>
						</a>
						<a href="#" className="social-link">
							<i className="bi bi-facebook"></i>
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
};