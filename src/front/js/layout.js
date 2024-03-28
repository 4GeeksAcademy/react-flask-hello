import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";
import { Forgot } from "./pages/forgot";
import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";
import { ContextProvider } from "./store/appContext"; // Importa el proveedor de contexto existente
import NavBar from "./component/Navbar";
import BookDetails from "./pages/book"
import Footer from "./component/footer";
import Signup from "./pages/signup";
import Login from "./pages/login";
import Reviews from "./pages/reviews";
{/*EMPIEZAN PAGINAS DE FOOTER*/}
import PrivacyPolicy from "./pages/privacy-policy";
import PrivacyNotice from "./pages/privacy-notice";
import TermsAndConditions from "./pages/terms-and-conditions";
import AboutUs from "./pages/about-us";
import CookiesNotice from "./pages/cookies-notice";
import Recommenders from "./pages/recommenders.js";
import Contact from "./pages/contact.js";
import Advertisements from "./pages/advertisements.js";
import { FavoritesPage } from './pages/favorites.js';


const Layout = () => {
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL === "") return <BackendURL />;

    return (
        <div>
            <Router basename={basename}>
                <ScrollToTop>
                    <NavBar />
                    <Routes>
                            <Route element={<Home />} path="/" />
                            <Route element={<Demo />} path="/demo" />
                            <Route element={<Signup />} path="/signup" />
                            <Route element={<Single />} path="/single/:theid" />
                            <Route element={<h1>Not found!</h1>} />
                            <Route element={<Login />} path="/login" />
                            <Route element={<Forgot />} path="/forgot" />
                            <Route element={<BookDetails />} path="/books/works/:id" />
                            <Route element={<Reviews />} path="/books/works/:id/reviews" />
                            <Route element={<FavoritesPage />} path="/favorites" />
                            {/* EMPIEZAN PAGINAS DE FOOTER*/}
                            <Route element={<PrivacyPolicy />} path="/privacy-policy" />
                            <Route element={<PrivacyNotice/>} path="/privacy-notice" />
                            <Route element={<TermsAndConditions/>} path="/terms-and-conditions" />
                            <Route element={<AboutUs/>} path="/about-us" />
                            <Route element={<CookiesNotice/>} path="/cookies-notice" />
                            <Route element={<Recommenders />} path="/recommenders" />
                            <Route element={<Contact />} path="/contact" />
                            <Route element={<Advertisements />} path="/advertisements" />
                            {/*TERMINAN PAGINAS DE FOOTER*/}
                            {/*<Route exact path="/books/:id/reviews" component={Reviews} />*/}
                            <Route path="*" element={<h1>Not found!</h1>} />

                    </Routes>
                    <Footer />
                </ScrollToTop>
            </Router>
        </div>
    );
};

export default injectContext(Layout);
