import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import ScrollToTop from "./component/scrollToTop";
import { Home } from "./pages/home";
import { RegisterUserIn } from "./pages/registerUserIn";
import { LogUserIn } from "./pages/logUserIn";
import { RecoverLogIn } from "./pages/recoverLogIn";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";
import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { Contactus } from "./pages/contact-us";
import { NewProduct } from "./pages/newProduct";
import { Logueado } from "./pages/logueado";
import { WazeView } from "./pages/wazeview";

//create your first component
const Layout = () => {
	//the basename is used when your project is published in a subdirectory and not in the root of the domain
	// you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
	const basename = process.env.BASENAME || "";

	return (
		<div className="d-flex flex-column h-100">
			<BrowserRouter basename={basename}>
				<ScrollToTop>
					<Navbar />
					<Switch>
						<Route exact path="/">
							<Home />
						</Route>
						<Route exact path="/logUserIn">
							<LogUserIn />
						</Route>
						<Route exact path="/registerUserIn">
							<RegisterUserIn />
						</Route>
						<Route exact path="/recoverLogIn">
							<RecoverLogIn />
						</Route>
						<Route exact path="/contact-us">
							<Contactus />
						</Route>
						<Route exact path="/newProduct">
							<NewProduct />
						</Route>
						<Route exact path="/logueado">
							<Logueado />
						</Route>
						<Route exact path="/single/:theid">
							<Single />
						</Route>
						<Route exact path="/wazeview">
							<WazeView />
						</Route>
						<Route>
							<h1>Not found!</h1>
						</Route>
					</Switch>
					<Footer />
				</ScrollToTop>
			</BrowserRouter>
		</div>
	);
};

export default injectContext(Layout);
