import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import "bootstrap/dist/css/bootstrap.min.css";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import { Login1 } from "./pages/login";
import { Register1 } from "./pages/register";
import { Forgot1 } from "./pages/forgot";
import { Cupones1 } from "./pages/cupones";
import { Categorias } from "./pages/categorias";
import { Favoritos } from "./pages/favorites";
import { Contac1 } from "./pages/contact";
import injectContext from "./store/appContext";

import { Navbar1 } from "./component/navbar";
import { Footer1 } from "./component/footer";
import { Productos } from "./pages/products";
import { Modal1 } from "./component/modal";

//create your first component
const Layout = () => {
	//the basename is used when your project is published in a subdirectory and not in the root of the domain
	// you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
	const basename = process.env.BASENAME || "";

	return (
		<div className="d-flex flex-column h-100">
			<BrowserRouter basename={basename}>
				<ScrollToTop>
					<Navbar1 />
					<Switch>
						<Route exact path="/">
							<Home />
						</Route>
						<Route exact path="/demo">
							<Demo />
						</Route>
						<Route exact path="/login">
							<Login1 />
						</Route>
						<Route exact path="/products">
							<Productos />
						</Route>
						<Route exact path="/register">
							<Register1 />
						</Route>
						<Route exact path="/forgot">
							<Forgot1 />
						</Route>
						<Route exact path="/cupones">
							<Cupones1 />
						</Route>
						<Route exact path="/categorias">
							<Categorias />
						</Route>
						<Route exact path="/favorites">
							<Favoritos />
						</Route>
						<Route exact path="/contact">
							<Contac1 />
						</Route>
						<Route>
							<h1>Not found!</h1>
						</Route>
					</Switch>
					<Footer1 />
				</ScrollToTop>
			</BrowserRouter>
		</div>
	);
};

export default injectContext(Layout);
