import React from 'react';

export const Navbar = () => {
    return (
        <header style={styles.header}>
            <h1 style={styles.logo}> <strong> GG Salud </strong> </h1>
            <nav>
                <a href="#inicio" style={styles.navLink}>Inicio</a>
                <a href="#servicios" style={styles.navLink}>Servicios</a>
                <a href="#citas" style={styles.navLink}>Pedir Cita</a>
                <a href="#contacto" style={styles.navLink}>Contacto</a>
            </nav>
        </header>
    );
};

const styles = {
    header: {
        backgroundColor: '#20B2AA', 
        color: 'white',
        padding: '15px 30px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    logo: {
        margin: 0,
        fontSize: '1.8em',
    },
    navLink: {
        color: 'white',
        textDecoration: 'none',
        marginLeft: '25px',
        fontSize: '1.1em',
    }
};

export default Navbar;





/*import { Link } from "react-router-dom";

export const Navbar = () => {

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto">
					<Link to="/demo">
						<button className="btn btn-primary">Check the Context in action</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};
*/