import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { Navbar, Nav, Dropdown, DropdownButton, Button } from "react-bootstrap";

export const Navbar1 = () => {
	const { store, actions } = useContext(Context);

	console.log("estoy en login", store.login);
	return (
		<>
			<Navbar className="navigation" collapseOnSelect expand="lg" bg="transparent" variant="dark" text="white">
				<Link to={"/"}>
					<Navbar.Brand href="#home">
						<img
							src="https://www.freelogoservices.com/api/main/images/1j+ojFVDOMkX9Wytexe43D6khvSBrBVOnx3IwXs1M3EMoAJtliItgPtj8v46 "
							width="90px"
						/>
					</Navbar.Brand>
				</Link>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className="ml-auto mx-5">
						<Link to={"/"}>
							<Button variant="in1" href="#home" color="white">
								Inicio
							</Button>
						</Link>
						{!store.login && (
							<Link to={"/login"}>
								<Button variant="in1" href="#home" color="white">
									Ingresar
								</Button>
							</Link>
						)}

						{!store.login && (
							<Link to={"/register"}>
								<Button variant="in1" href="#home" color="white">
									Registro
								</Button>
							</Link>
						)}

						{store.login && (
							<Link to={"/categorias"}>
								<Button variant="in1" href="#home" color="white">
									Categorías
								</Button>
							</Link>
						)}
						{store.login && (
							<Link to={"/cupones"}>
								<Button variant="in1" href="#home" color="white">
									Cupones
								</Button>
							</Link>
						)}
						{store.login && (
							<Link to={"/favorites"}>
								<Button variant="in1" href="#home" color="white">
									Favoritos {store.favorites.length}
								</Button>
							</Link>
						)}

						{store.login && (
							<Link to={"/"}>
								<Button
									variant="in1"
									href="#home"
									color="white"
									onClick={() => {
										actions.logout();
										console.log("cierro secion", store.login);
										alert("Ha cerrado sesión correctamente");
									}}>
									Cerrar sesión
								</Button>
							</Link>
						)}
						<Link to={"/contact"}>
							<Button variant="in1" href="#home" color="white">
								Contáctenos
							</Button>
						</Link>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		</>
	);
};
