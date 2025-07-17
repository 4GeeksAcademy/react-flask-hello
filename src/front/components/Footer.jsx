import logoFooter from "../assets/img/logoFooter.svg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faYoutube } from '@fortawesome/free-brands-svg-icons'
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const Footer = () => {
	const { t } = useTranslation();

	return (
		<footer className="footer mt-auto py-3 mx-3">
			<div className="container">
				<div className="row">
					<div className="col text-center text-sm-start">
						<img src={logoFooter} alt="clooudTech logo" className="mb-3" />
						<p className="text-white mb-3 w-75 d-none d-sm-block mb-4">{t('footer.footerSlogan')}</p>
						<div className="fs-2 d-flex gap-3 text-white justify-content-center justify-content-sm-start">
							<FontAwesomeIcon icon={faFacebookSquare} />
							<FontAwesomeIcon icon={faInstagram} />
							<FontAwesomeIcon icon={faLinkedin} />
							<FontAwesomeIcon icon={faYoutube} />
						</div>
					</div>
					<div className="col text-white text-end d-flex flex-column d-none d-sm-flex">
						<Link to={"/"} className="fs-5 fw-bold text-decoration-none text-white">CloudTech</Link>
						<Link to={"/about"} className="fs-5 text-decoration-none text-white">Nosotros</Link>
						<Link to={"/services"} className="fs-5 text-decoration-none text-white">Servicios</Link>
						<Link to={"/projects"} className="fs-5 text-decoration-none text-white">Proyectos</Link>
						<Link to={"/contact"} className="fs-5 text-decoration-none text-white">Contacto</Link>

					</div>
				</div>
			</div>
			<hr className="my-3 border border-white border-1 opacity-100" />
			<div className="text-center">
				<p> <span className="text-ct-secondary">Copyright © 2025 CloudTech</span> <br></br> <span className="text-ct-gray">Terms and Conditions | Privacy Policy</span> </p>
			</div>
		</footer>
	)

};
