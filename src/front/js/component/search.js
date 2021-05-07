import React from "react";
import { Link } from "react-router-dom";

export const Search = () => {
	return (
		<div className="container h-100">
			<div className="d-flex justify-content-center h-100">
				<div className="searchbar">
					<input className="search_input" type="text" name="search" placeholder="Search..." />
					<a href="#" className="search_icon">
						<i className="fas fa-search" />
					</a>
				</div>
			</div>
		</div>
	);
};
