import React from "react";

export const Contact = () => {
	return (
		<div className="container">
			<section className="mb-4">
				<h2 className="h1-responsive text-center my-4">Contáctenos</h2>

				<p className="text-center w-responsive mx-auto mb-5">
					Si tiene alguna consulta, no dude en contactarnos directamente, nuestro equipo le estrá respondiendo
					en cuestión de horas, para ayudarle.
				</p>

				<div className="row">
					<div className="col-md-9 mb-md-0 mb-5">
						<form id="contact-form" name="contact-form" action="mail.php" method="POST">
							<div className="row">
								<div className="col-md-6">
									<div className="md-form mb-0">
										<input type="text" id="name" name="name" className="form-control" />
										<label htmlFor="name" className="">
											Nombre
										</label>
									</div>
								</div>

								<div className="col-md-6">
									<div className="md-form mb-0">
										<input type="text" id="email" name="email" className="form-control" />
										<label htmlFor="email" className="">
											Email
										</label>
									</div>
								</div>
							</div>

							<div className="row">
								<div className="col-md-12">
									<div className="md-form mb-0">
										<input type="text" id="subject" name="subject" className="form-control" />
										<label htmlFor="subject" className="">
											Asunto
										</label>
									</div>
								</div>
							</div>

							<div className="row">
								<div className="col-md-12">
									<div className="md-form">
										<textarea
											type="text"
											id="message"
											name="message"
											rows="2"
											className="form-control md-textarea"
										/>
										<label htmlFor="message">Mensaje</label>
									</div>
								</div>
							</div>
						</form>

						<div className="text-center text-md-left">
							<a className="btn btn-primary" onClick="document.getElementById('contact-form').submit();">
								Enviar
							</a>
						</div>
						<div className="status" />
					</div>

					<div className="col-md-3 text-center">
						<ul className="list-unstyled mb-0">
							<li>
								<i className="fas fa-map-marker-alt fa-2x" />
								<p>San Francisco, Heredia Costa Rica</p>
							</li>

							<li>
								<i className="fas fa-phone mt-4 fa-2x" />
								<p>+ 01 234 567 89</p>
							</li>

							<li>
								<i className="fas fa-envelope mt-4 fa-2x" />
								<p>contacto@puravidamart.com</p>
							</li>
						</ul>
					</div>
				</div>
			</section>
		</div>
	);
};
