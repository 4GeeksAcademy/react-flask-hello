import React, { useState } from "react";
import { Link } from "react-router-dom";

export const Contac1 = () => {
	return (
		<div className="container">
			<div className="login" />
			<div className="backdrop" />
			<div className="d-flex justify-content-center h-100">
				<div className="card c1">
					<div className="d-flex justify-content-center text-white">
						<h3>Contactenos</h3>
					</div>
					<div className="card-body">
						<form>
							<div className="input-group form-group">
								<div className="input-group-prepend">
									<span className="input-group-text">
										<i className="fas fa-user" />
									</span>
								</div>
								<input type="text" className="form-control" placeholder="Nombre" required />
							</div>
							<div className="input-group form-group">
								<div className="input-group-prepend">
									<span className="input-group-text">
										<i className="fa fa-envelope" />
									</span>
								</div>
								<input type="text" className="form-control" placeholder="Email" required />
							</div>
							<div className="input-group form-group">
								<div className="input-group-prepend">
									<span className="input-group-text">
										<i className="fas fa-phone" />
									</span>
								</div>
								<input type="text" className="form-control" placeholder="Telefono" required />
							</div>
							<div className="input-group form-group">
								<div className="input-group-prepend">
									<span className="input-group-text">
										<i className="fas fa-comment-dots" />
									</span>
								</div>
								<textarea type="text" className="form-control" placeholder="Mensaje" required />
							</div>
							<div className="card-footer">
								<Link to={"/"} href="#">
									<button
										type="button"
										className="btn float-right login_btn"
										onClick={() => {
											alert("Enviado");
										}}>
										<i className="fa fa-paper-plane" /> Enviar
									</button>
								</Link>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};
