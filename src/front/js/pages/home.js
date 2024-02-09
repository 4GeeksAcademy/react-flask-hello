import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);


	return (
		<div className="home-container">
			<div className="bg position-relative text-center">
				<div className="overlay"></div>
				<div className="jumbo">
					<h1 className="display-5 fw-bold">Why the fork is this not behaving? Who gives a flux?</h1>
					<div className="col-lg-6 mx-auto">
						<Link to="createItinerary" className="mb-4" id="button-lead"  >
							DioDio's got you covered!
						</Link>
					</div>
				</div>
			</div>		
		</div>
	);
};
