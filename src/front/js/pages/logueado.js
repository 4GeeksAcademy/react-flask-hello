import React from "react";
import { Carouselproductos } from "../component/carouselproductos";
import { Search } from "../component/search";

export const Logueado = () => {
	return (
		<div className="container">
			<h1 className="text-center">Pura Vida Mart</h1>
			<Carouselproductos />
			<div className="text-center my-4">
				<Search />
			</div>
		</div>
	);
};
