import React from 'react';
import { Link } from 'react-router-dom';


// Poner Logo
const Logo = () => {
    return (
        <Link to="/" className="logo-wrap col-3">
            <img src="/front/img/x.png" alt="Recomiéndame un Libro" />
        </Link>
    );
}

export default Logo;