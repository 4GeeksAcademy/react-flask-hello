import React, { Component } from "react";
import "../../styles/footer.css";

let menu = [
	{label: 'Inicio', url: '/'},
	{label: 'Servicios', url: '/demo'},
	{label: 'Eventos', url: '/eventos'},
	{label: 'Galería', url: '/galeria'},
	{label: 'Organizadores', url: '/organizadores'},
	{label: 'Contacto', url: '/contacto'},
	{label: 'Cuenta', url: '/cuenta'}
];

export const Footer = () => (
	<footer className="pie d-flex flex-wrap justify-content-between align-items-center m-2 border-top">
		<p className="col-md-3 mb-0 text-body-secondary">© 2023 TechSports, Inc</p>
		<ul className="nav col-md-5 justify-content-end">
			{menu.map((item) => {
				return (
					<li className="nav-item" key={item.label}>
						<a href={item.url} className="nav-link px-2 text-body-secondary">{item.label}</a>
					</li>
				);
			})}
		</ul>
	</footer>
);