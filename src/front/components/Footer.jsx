import logoFooter from "../assets/img/logoFooter.svg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faYoutube } from '@fortawesome/free-brands-svg-icons'
import { Link } from "react-router-dom";

export const Footer = () => (
	<footer className="footer mt-auto py-3 mx-3">
		<div className="container">
			<div className="row">
				<div className="col text-center text-sm-start">
					<img src={logoFooter} alt="clooudTech logo" className="mb-3" />
					<p className="text-white mb-3 w-50 d-none d-sm-block mb-4">Lorem ipsum dolor sit amet consectetur adipiscing elit aliquam mauris sed ma.</p>
					<div className="fs-2 d-flex gap-3 text-white justify-content-center justify-content-sm-start">
						<FontAwesomeIcon icon={faFacebookSquare} />
						<FontAwesomeIcon icon={faInstagram} />
						<FontAwesomeIcon icon={faLinkedin} />
						<FontAwesomeIcon icon={faYoutube} />
					</div>
				</div>
				<div className="col text-white text-end d-flex flex-column d-none d-sm-flex">
					<span className="fs-5 fw-bold">CloudTech</span>
					<span className="fs-5">Nosotros</span>
					<span className="fs-5">Servicios</span>
					<span className="fs-5">Proyectos</span>
					<span className="fs-5">Contacto</span>

				</div>
			</div>
		</div>
		<hr className="my-3 border border-white border-1 opacity-100" />
		<div className="text-center">
			<p> <span className="text-ct-secondary">Copyright © 2025 CloudTech</span> <br></br> <span className="text-ct-gray">Terms and Conditions | Privacy Policy</span> </p>
		</div>
	</footer>
);
