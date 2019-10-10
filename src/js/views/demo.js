import React from "react";
import { Link } from "react-router-dom";

import { Consumer } from "../store/appContext";

import "../../styles/demo.scss";

export const Demo = () => (
	<div className="container">
		<ul className="list-group">
			<Consumer>
				{({ store, actions }) => {
					return store.demo.map((item, index) => {
						return (
							<li
								key={index}
								className="list-group-item d-flex justify-content-between"
								style={{ background: item.background }}>
								<Link to={"/single/" + index}>
									<span>Link to: {item.title}</span>
								</Link>
								{// Conditional render example
								// Check to see if the background is orange, if so, display the message
								item.background === "orange" ? (
									<p style={{ color: item.initial }}>
										Check store/flux.js scroll to the actions to see the code
									</p>
								) : null}
								<button
									className="btn btn-success"
									onClick={() => actions.changeColor(index, "orange")}>
									Change Color
								</button>
							</li>
						);
					});
				}}
			</Consumer>
		</ul>
		<br />
		<Link to="/">
			<button className="btn btn-primary">Back home</button>
		</Link>
	</div>
);
