import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import digitalImg from "../../img/digital.jpg";
import operatividadImg from "../../img/operatividad.jpg";
import eventosImg from "../../img/eventos.jpg";

import "../../styles/services.css";

export const Servicios = () => {
	const { store, actions } = useContext(Context);

	return (
			<div className="contSuperior container text-center">
				<h1>Nuestros Servicios</h1>
				<div className="divider divider-default m-3"></div>
				<div className="row">
					<div className="col-md-4 mb-4">
						<div className="">
							<img className="rounded img-fluid" src={digitalImg} alt="wrappixel kit" />
							<div className="mt-4 text-center">
								<h6 className="font-weight-medium">Organización Digital</h6>
								<p className="mt-3">Olvídate de los registros en papel. Crea eventos y permite el registro de los equipos fácil y rápido, incluyendo el cobro de la inscripción en línea.</p>
							</div>
						</div>
					</div>
					<div className="col-md-4 mb-4">
						<div className="">
							<img className="rounded img-fluid" src={operatividadImg} alt="wrappixel kit" />
							<div className="mt-4 text-center">
								<h6 className="font-weight-medium">Operatividad Integral</h6>
								<p className="mt-3">Crea torneos, añade costos de inscripción, reglas del juego, categorías, staff, árbitros, sedes. Todo para que tu evento sea un éxito.</p>
								<Link to="/cuenta">
									<span className="btn btn-primary btn-lg m-2" href="#" role="button">
										Regístrate Gratis
									</span>
								</Link>
							</div>
						</div>
					</div>
					<div className="col-md-4 mb-4">
						<div className="">
							<img className="rounded img-fluid" src={eventosImg} alt="wrappixel kit" />
							<div className="mt-4 text-center">
								<h6 className="font-weight-medium">Publicación de Eventos</h6>
								<p className="mt-3">Compartimos los datos de tus eventos deportivos para facilitar el proceso de registro y pago de la inscripción a los torneos. Tendrás todo en un solo lugar.</p>
							</div>
						</div>
					</div>
				</div>
			</div>
	);
};
