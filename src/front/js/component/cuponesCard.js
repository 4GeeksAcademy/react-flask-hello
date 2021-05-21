import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { Modal2 } from "../component/modalcupon";

export const Cupones = props => {
	const { store, actions } = useContext(Context);

	return (
		<div className="card mb-3">
			<div className="row g-0">
				<div className="col-md-4">
					<img src={props.image} width="200px" />
				</div>
				<div className="col-md-8">
					<div className="card-body">
						<h3 className="card-title">{props.coupon_name}</h3>
						<h5 className="card-text" />
						<p className="card-text">{props.product_name}</p>
						<br />
						<h6 className="card-text">{props.market_name}</h6>
						<Modal2 />
						<p className="card-text">
							<small className="text-muted">{props.coupon_info}</small>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};
Cupones.propTypes = {
	id: PropTypes.number,
	coupon_name: PropTypes.string,
	coupon_info: PropTypes.string,
	product_name: PropTypes.string,
	market_name: PropTypes.string,
	image: PropTypes.string
};
