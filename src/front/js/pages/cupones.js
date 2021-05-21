import React, { useContext, useEffect, Component } from "react";
import { Cupones } from "../component/cuponesCard";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Cupones1 = () => {
	const { store, actions } = useContext(Context);

	return (
		<>
			<div className="container-fluid">
				<div className="categoriaspage row">
					<p className="h2 mx-auto py-4 font-weight-light">Cupones disponibles</p>

					<div className="col-lg-12 categorias1">
						{store.coupons
							? store.coupons.map((item, index) => {
									console.log("item", item);
									return (
										<div key={index}>
											<Cupones
												id={index}
												coupon_name={item.coupon_name}
												coupon_info={item.coupon_info}
												product_name={item["product.product_name"]}
												market_name={item["supermarket.market_name"]}
												image={item["product.image"]}
											/>
										</div>
									);
							  })
							: "No cupons here"}
					</div>
				</div>
			</div>
		</>
	);
};
