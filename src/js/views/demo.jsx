import React from "react";
import { Link } from "react-router-dom";

import DemoList from "../component/demoList.jsx";
import DemoProducts from "../component/demoProducts.jsx";

import "../../styles/demo.css";

export class Demo extends React.Component {
	render() {
		return (
			<div className="container">
				<div className="row">
					<div className="col-8">
						<h1>Demo Context Read</h1>
						<DemoList />
					</div>
					<div className="col-4 d-flex justify-content-center align-items-center">
						<Link to="/">
							<button className="btn btn-primary">
								Back to home
							</button>
						</Link>
					</div>
				</div>
				<div className="row">
					<div className="col">
						<h1>Demo Context Write</h1>
						<DemoProducts />
					</div>
				</div>
			</div>
		);
	}
}
