import React, { useContext, useEffect, Component } from "react";
import { Globalcard } from "../component/globalcard";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Categorias = () => {
	const { store, actions } = useContext(Context);

	return (
		<>
			<div className="container-fluid">
				<div className="categoriaspage row">
					<h1 className="h2 mx-auto py-4 font-weight-light">
						<strong>Categorias</strong>
					</h1>
					<div className="col-lg-12">
						<h4>
							<strong>Lacteos</strong>
						</h4>
					</div>
					<div className="col-lg-12 categorias">
						{store.products
							? store.products.map((item, index) => {
									console.log("products", item);
									if (item.category == "Lacteos") {
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
									}
							  })
							: "No prodcuts here"}
					</div>
					<br />

					<div className="col-lg-12">
						<h4>
							<strong>Granos</strong>
						</h4>
					</div>
					<div className="col-lg-12 categorias">
						{store.products
							? store.products.map((item, index) => {
									console.log("products", item);
									if (item.category == "Granos") {
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
									}
							  })
							: "No prodcuts here"}
					</div>
					<br />

					<div className="col-lg-12">
						<h4>
							<strong>Cuidado Personal</strong>
						</h4>
					</div>
					<div className="col-lg-12 categorias">
						{store.products
							? store.products.map((item, index) => {
									console.log("prodcts", item);
									if (item.category == "Cuidado Personal") {
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
									}
							  })
							: "No products here"}
					</div>
				</div>
			</div>
		</>
	);
};
