export const Footer = () => (
	<>
		<hr className="w-100 m-0 custom-hr" />
		<footer className="footer py-4 text-center">
			<div className="d-flex flex-wrap justify-content-center align-items-center gap-4 py-3">
				<a href="https://www.tiktok.com/@patitasclub_petshop" target="_blank" rel="noopener noreferrer">
					<i style={{ color: "#3c6ca8" }} className="fa-brands fa-tiktok fa-2x"></i>
				</a>
				<a href="https://www.instagram.com/patitasclubpetshop/" target="_blank" rel="noopener noreferrer">
					<i style={{ color: "#3c6ca8" }} className="fa-brands fa-instagram fa-2x"></i>
				</a>
				<a href="mailto:petshoppatitasclub@gmail.com">
					<i style={{ color: "#3c6ca8" }} className="fa-solid fa-envelope fa-2x"></i>
				</a>
			</div>
			<p style={{ color: "#3c6ca8" }} className="mb-0 fs-5">¡Contáctanos!</p>
			<div className="border-t border-gray-700 mt-10 pt-4 text-center text-sm text-gray-500">
				© {new Date().getFullYear()} PatitasClub. Todos los derechos reservados.
			</div>
		</footer>
	</>
);
