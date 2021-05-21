import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Card, ListGroupItem, ListGroup } from "react-bootstrap";
import { propTypes } from "react-bootstrap/esm/Image";

export const Promociones = props => {
	return (
		<>
			<div className="tarjeta">
				<div className="card" style={{ width: "16rem", marginInline: "20px" }}>
					<img src={props.image} className="card-img-top" alt="..." />
					<ul className="list-group list-group-flush">
						<li className="list-group-item font-weight-bold">{props.product_name}</li>
						<li className="list-group-item"> Precio: ₡{props.price} (-10%)</li>
					</ul>
					<p className="card-text">
						<small className=" update text-muted">Actualizado hace 45 min</small>
					</p>
				</div>
			</div>
		</>
	);
};

Promociones.propTypes = {
	image: PropTypes.string,
	product_name: PropTypes.string,
	price: PropTypes.number,
	id: PropTypes.number
};
