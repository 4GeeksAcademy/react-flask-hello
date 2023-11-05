import React from 'react';
import { Link } from 'react-router-dom';


const Footer = () => {
	return (

		<div className="container-footer align-items-center mt-5">
			<footer >
				<div className="line-above-footer"></div>
				<div className="row footer-content pt-3">
					<div className="col-2 footer-viajes">
						<h5>Viajes</h5>
						<ul className="nav flex-column">
							<li className="nav-item mb-2"><Link to="/" className="nav-link p-0 text-muted" >Home</Link></li>
							<li className="nav-item mb-2"><Link to="/trip" className="nav-link p-0 text-muted" >Planea tu siguiente trip</Link></li>
							<li className="nav-item mb-2"><Link to="/reviews" className="nav-link p-0 text-muted" >Reseñas</Link></li>
							<li className="nav-item mb-2"><Link to="/offers" className="nav-link p-0 text-muted" >Ofertas</Link></li>
							<li className="nav-item mb-2"><Link to="#" className="nav-link p-0 text-muted">Ayuda</Link></li>
						</ul>
					</div>

					<div className="col-2 footer-business">
						<h5>Empresa</h5>
						<ul className="nav flex-column">
							<li className="nav-item mb-2"><Link to="/cookies" className="nav-link p-0 text-muted" >Política de cookies</Link></li>
							<li className="nav-item mb-2"><Link to="/politica-privacidad" className="nav-link p-0 text-muted" >Política de privacidad</Link></li>
							<li className="nav-item mb-2"><Link to="/terms" className="nav-link p-0 text-muted" >Términos de servicio</Link></li>
							<li className="nav-item mb-2"><Link to="/about" className="nav-link p-0 text-muted" >Información de la empresa</Link></li>
							<li className="nav-item mb-2"><Link to="/contact" className="nav-link p-0 text-muted">Contacto</Link></li>
						</ul>
					</div>
					<div className='col-2'></div>
					<div className="col-5 offset-1">
						<form className='mb-4'>
							<h5>Suscríbete a nuestro Newsletter</h5>
							<p>Recibe ofertas y promociones exclusivas.</p>
							<div className="d-flex w-100 gap-2">
								<label htmlFor="newsletter1" className="visually-hidden">Correo electrónico</label>
								<input id="newsletter1" type="text" className="form-control" placeholder="Email address" />
								<button className="btn btn-primary" type="button">Subscribe</button>
							</div>
						</form>
						<div className="div-donation mb-5 w-100">
							<Link to='/donacion' >
								<button className="btn-donation">Participa en el desarrollo de la página!</button>
							</Link>
						</div>
					</div>
				</div>

				<div className="d-flex justify-content-between pt-2 my-2 border-top">
					<p className='mt-2'><strong>© 2023 TRIP NEXUS, S,L.</strong>Todos los derechos reservados.</p>
					<ul className="list-unstyled d-flex">
						<li className="ms-3"><Link className="link-dark" to="#"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-twitter" width="32" height="32" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
							<path stroke="none" d="M0 0h24v24H0z" fill="none" />
							<path d="M22 4.01c-1 .49 -1.98 .689 -3 .99c-1.121 -1.265 -2.783 -1.335 -4.38 -.737s-2.643 2.06 -2.62 3.737v1c-3.245 .083 -6.135 -1.395 -8 -4c0 0 -4.182 7.433 4 11c-1.872 1.247 -3.739 2.088 -6 2c3.308 1.803 6.913 2.423 10.034 1.517c3.58 -1.04 6.522 -3.723 7.651 -7.742a13.84 13.84 0 0 0 .497 -3.753c0 -.249 1.51 -2.772 1.818 -4.013z" />
						</svg></Link></li>
						<li className="ms-3"><Link className="link-dark" to="#"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-instagram" width="32" height="32" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
							<path stroke="none" d="M0 0h24v24H0z" fill="none" />
							<path d="M4 4m0 4a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z" />
							<path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
							<path d="M16.5 7.5l0 .01" />
						</svg></Link></li>
						<li className="ms-3"><Link className="link-dark" to="#"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-meta" width="32" height="32" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
							<path stroke="none" d="M0 0h24v24H0z" fill="none" />
							<path d="M12 10.174c1.766 -2.784 3.315 -4.174 4.648 -4.174c2 0 3.263 2.213 4 5.217c.704 2.869 .5 6.783 -2 6.783c-1.114 0 -2.648 -1.565 -4.148 -3.652a27.627 27.627 0 0 1 -2.5 -4.174z" />
							<path d="M12 10.174c-1.766 -2.784 -3.315 -4.174 -4.648 -4.174c-2 0 -3.263 2.213 -4 5.217c-.704 2.869 -.5 6.783 2 6.783c1.114 0 2.648 -1.565 4.148 -3.652c1 -1.391 1.833 -2.783 2.5 -4.174z" />
						</svg></Link></li>
					</ul>
				</div>
			</footer>
		</div>
	);

};

export default Footer;
