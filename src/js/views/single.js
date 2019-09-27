import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Consumer } from "../store/appContext";

export const Single = props => {
	return (
		<div className="jumbotron">
			<Consumer>
				{({ store }) => {
					return (
						<h1 className="display-4">
							This will show the demo element: {store.demo[props.match.params.theid].title}
						</h1>
					);
				}}
			</Consumer>

			<hr className="my-4" />

			<Link to="/">
				<span className="btn btn-primary btn-lg" href="#" role="button">
					Back home
				</span>
			</Link>
		</div>
	);
};

Single.propTypes = {
	match: PropTypes.object
};
