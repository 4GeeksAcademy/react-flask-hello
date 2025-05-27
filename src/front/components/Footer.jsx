export const Footer = () => {
	const currentYear = new Date().getFullYear();

	return (
		<>
			{/* Sección principal del footer */}
			<footer
				className="text-white mt-5 pt-4 pb-3"
				style={{ backgroundColor: "black" }}
			>
				<div className="container">
					<div className="row text-center text-md-start align-items-start">

						{/* Columna: Marca y copyright */}
						<div className="col-12 col-md-4 text-center">
							<h3 className="text-uppercase fw-bold mb-3" style={{ color: "#FF2E63" }}>
								ASAD-APP
							</h3>
							<p className="mb-0 small">
								&copy; {currentYear} ASAD-APP. Todos los derechos reservados.
							</p>
						</div>

						{/* Columna: Redes sociales */}
						<div className="col-12 col-md-4 mb-4 mb-md-0 d-flex flex-column align-items-center">
							<h5 className="text-uppercase mb-3" style={{ color: "#FF2E63" }}>
								Síguenos
							</h5>
							<div className="d-flex gap-4 fs-5">
								<a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white">
									<i className="fab fa-facebook-f"></i>
								</a>
								<a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white">
									<i className="fab fa-instagram"></i>
								</a>
								<a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white">
									<i className="fab fa-twitter"></i>
								</a>
								<a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-white">
									<i className="fab fa-github"></i>
								</a>
							</div>
						</div>

						{/* Columna: Información de contacto */}
						<div className="col-12 col-md-4 mb-4 mb-md-0 contacto-footer">
							<h5 className="text-uppercase mb-3" style={{ color: "#FF2E63" }}>
								Contacto
							</h5>
							<p><i className="fas fa-map-marker-alt me-2"></i> China</p>
							<p><i className="fas fa-phone me-2"></i> +506 8888 8888</p>
							<p><i className="fas fa-envelope me-2"></i> info@asadapp.com</p>
						</div>
					</div>
				</div>
			</footer>

			{/* Carrusel de íconos deslizante */}
			<div className="icon-strip py-2">
				<div className="scroll-wrapper">
					<div className="animate-scroll">
						{/* Grupo duplicado de íconos para crear la ilusión de bucle infinito */}
						{[...Array(2)].map((_, i) => (
							<div key={i} className="icon-group">
								<i className="fas fa-drumstick-bite"></i>
								<i className="fas fa-wine-glass-alt"></i>
								<i className="fas fa-birthday-cake"></i>
								<i className="fas fa-glass-cheers"></i>
								<i className="fas fa-hotdog"></i>
								<i className="fas fa-music"></i>
								<i className="fas fa-beer"></i>
								<i className="fas fa-cocktail"></i>
								<i className="fas fa-pizza-slice"></i>
								<i className="fas fa-ice-cream"></i>
								<i className="fas fa-utensils"></i>
								<i className="fas fa-burger"></i>
							</div>
						))}
					</div>
				</div>
			</div>

		</>
	);
};
