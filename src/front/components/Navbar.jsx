import { Link } from "react-router-dom";

export const Navbar = () => {

	return (
		<nav className="navbar navbar-light bg-light">
			<ul style={{ display: 'flex', gap: '1.5rem', listStyle: 'none', margin: 0, padding: '0 1rem', alignItems: 'center' }}>
				<li><Link to="/">Home</Link></li>
				<li><Link to="/discover">Discover</Link></li>
				<li><Link to="/myevents">My Events</Link></li>
				{/* Add more links as needed */}
			</ul>
		</nav>
	);
};