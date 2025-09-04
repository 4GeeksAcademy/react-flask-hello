import React from "react";
import { Link } from "react-router-dom";

function Home() {
	const heroUrl = "https://via.placeholder.com/1200x400.png?text=Welcome";

	return (
		<div className="container py-5">
			<div className="text-center">
				<img
					src={heroUrl}
					alt="Hero"
					className="img-fluid rounded mb-4"
					style={{ maxHeight: 320, objectFit: "cover" }}
				/>
				<h1 className="h3 mb-3">Welcome to YourApp</h1>
				<p className="text-muted mb-4">
					This is the home page. Use the button below to visit your Account.
				</p>
				<Link to="/account" className="btn btn-primary">
					Go to Account
				</Link>
			</div>
		</div>
	);
}

export { Home };
export default Home;