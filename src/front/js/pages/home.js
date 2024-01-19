import React, { useContext } from "react";
import { Context } from "../store/appContext";

import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="home-container">
			<div className="bg position-relative text-center">
				<div className="overlay"></div>
				<div className="jumbo">
					<h1 className="display-5 fw-bold">Why the fork is this not behaving?</h1>
					<div className="col-lg-6 mx-auto">
						<a href="#" class="button lead mb-4">DioDio's got you covered!</a>
					</div>
				</div>
			</div>
		</div>
	);
};
