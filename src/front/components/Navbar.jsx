import { Link } from "react-router-dom";

export const Navbar = () => {

	return (
		<nav className="navbar navbar-light bg-black p-3">
			<div className="container text-center ">
				<div className="col-2">
					<h3 style={{ color: 'white' }}>@TerryTango13</h3>
				</div>
				<div className="col-6">
					<h3 style={{ color: 'white' }}>COUCH POTATO</h3>
				</div>
				<div className="col-2">
					<Link to="/demo">
						<p className="">Log out</p>
					</Link>
					
				</div>
			</div>
		</nav>
	);
};