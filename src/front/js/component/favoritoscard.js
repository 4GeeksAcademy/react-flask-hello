import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Modal1 } from "../component/modal";
import { Context } from "../store/appContext";

export const FavoritosCard = props => {
	const { store, actions } = useContext(Context);

	return (
		<div className="tarjeta">
			<div className="card" style={{ width: "16rem" }}>
				<img src={props.image} className="card-img-top" alt="..." />
				<div className="card-body">
					<h5 className="card-title">{props.product_name}</h5>
					<ul>
						<p className="Precio"> Precio: ₡{props.price}</p>
						<p className="Precio"> Supermercado:</p>
					</ul>
					{/* <div className="modal_mov">
						<Modal1
							id={props.id}
							image={props.image}
							product_name={props.product_name}
							category={props.category}
							price={props.price}
						/>
					</div> */}
				</div>
			</div>
		</div>
	);
};
FavoritosCard.propTypes = {
	id: PropTypes.number,
	price: PropTypes.number,
	product_name: PropTypes.string,
	image: PropTypes.string,
	category: PropTypes.string
};
