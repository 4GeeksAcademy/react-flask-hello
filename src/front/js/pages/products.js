import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Globalcard } from "../component/globalcard";
import { Context } from "../store/appContext";

export const Productos = () => {
	const { store, actions } = useContext(Context);

	return (
		<>
			<div className="container-fluid">
				<div className="categoriaspage row">
					<h1 className="promo1 h2 mx-auto py-4 font-weight-light">
						<strong>Productos disponibles</strong>
					</h1>
					<div className="col-lg-12 productos">
						{store.products
							? store.products.map((item, index) => {
									console.log("products", item);

									return (
										<div key={index}>
											<Globalcard
												id={item.id}
												price={item.price}
												location={item["supermarket.location"]}
												product_name={item.product_name}
												market_name={item["supermarket.market_name"]}
												image={item.image}
												category={item.category}
											/>
										</div>
									);
							  })
							: "No prodcuts here"}
					</div>
				</div>
			</div>
		</>
	);
};
