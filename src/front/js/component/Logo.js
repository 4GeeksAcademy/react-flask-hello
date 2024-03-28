import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/logo.css'; 
import logo from '../../../front/img/logo.jpg'; 

const Logo = () => {
    return (
        <Link to="/" className="logo-wrap">
            <img src={logo} className="logo-image" alt="Recommend me a Book" />
        </Link>
    );
}

export default Logo;
