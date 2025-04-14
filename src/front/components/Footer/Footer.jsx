import React from 'react';
import "./Footer.css";

export const Footer = () => {
	return (
		<footer className="footer-container">
			<div className="footer-content">
				<div className="footer-bottom">
					<p className="copyright">
						&copy; Flow {new Date().getFullYear()}. All rights reserved.
					</p>
					<div className="social-links">
						<a href="#" className="social-link">
							<i class="fa-brands fa-linkedin"></i>
						</a>
						<a href="#" className="social-link">
							<i class="fa-brands fa-square-x-twitter"></i>
						</a>
						<a href="#" className="social-link">
							<i class="fa-brands fa-square-facebook"></i>
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
};