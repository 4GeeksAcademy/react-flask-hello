import React, { useContext, useEffect, useState, Component } from "react";
import "../../styles/home.scss";
import { Promociones } from "../component/promociones";
import { Cinta } from "../component/cinta";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Home = () => {
	const { store, actions } = useContext(Context);
	return (
		<>
			<div className="contenedor container-fluid imagen-fondo">
				<div className="row">
					<div className="col-12">
						<div className="text-white">
							<h3 className="title font-weight-light">¡Más opciones, ahorrás más colones!</h3>
						</div>
						<form>
							<div className="form-group mx-auto text-white">
								<div className="input-group input-group-lg">
									<input
										type="text"
										className="form-control"
										placeholder="¿Qué estás buscando?"
										aria-label="Recipient's username"
										aria-describedby="basic-addon2"
									/>
									<div className="input-group-append mx-auto">
										<span className="input-group-text" id="basic-addon2">
											<i className="fas fa-search" />
										</span>
									</div>
								</div>
							</div>
							<div className="mx-auto form-group text-white input-group-lg">
								<input
									type="text"
									className="form-control"
									placeholder="¿Dónde estás ubicado?"
									aria-label="Recipient's username"
									aria-describedby="basic-addon2"
								/>
							</div>
							<Link to={"/products"}>
								<button type="submit" className="boton mx-auto btn btn-warning btn-lg btn-block">
									Iniciar búsqueda
								</button>
							</Link>
						</form>
					</div>
				</div>
			</div>

			<div className="cinta_mov">
				<Cinta />
			</div>

			<h1 className="Promociones text-center py-4 font-weight-light">Promociones</h1>
			<div className="col-lg-12 productos">
				{store.products
					? store.products.map((item, index) => {
							console.log("products", item);
							if (item.category == "Promo") {
								return (
									<div key={index}>
										<Promociones
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
		</>
	);
};
