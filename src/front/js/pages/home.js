import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Carousel } from "../component/carousel";
import { Search } from "../component/search";
import { Footer } from "../component/footer";
import "../../styles/home.scss";
import "../../styles/index.scss";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="h-75 text-center mt-2" style={{ fontFamily: "Zen Dots" }}>
			<h1>Pura Vida Mart</h1>
			<h2>Bienvenido(a)</h2>
			<Carousel />{" "}
		</div>
	);
};
