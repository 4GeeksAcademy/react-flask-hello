
import React, { useContext } from "react";
import { Context } from "../store/appContext";

import "../../styles/home.css";
import { Banner } from "../component/banner";
import { Categorias } from "../component/categorias";
import { Reviews } from "../component/reviews";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
			<div>
				<Banner></Banner>
				<Categorias></Categorias>
				<Reviews></Reviews>
			</div>
	);
};
