import React from 'react';
import { Link } from 'react-router-dom';

export const Navbar = () => (
  <nav className="navbar navbar-light bg-light">
    <div className="container">
      <Link className="navbar-brand" to="/">AgriMarket</Link>
      <div className="d-flex ms-auto">
        <Link className="btn btn-outline-success me-2" to="/login">Acceder</Link>
        <Link className="btn btn-success" to="/register">Registrarse</Link>
      </div>
    </div>
  </nav>
);