import React, { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";



import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import LogIn from "./pages/LogIn.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx"
import UserPrivate from "./pages/UserPrivate.jsx";
import BusinessUserPrivate from "./pages/BusinessUserPrivate.jsx";
import Business_offers from "./pages/Business_offers.jsx";
import Trips from "./pages/Trips.jsx";
import SignupGeneralView from "./pages/SignupGeneralView.jsx";
import Reviews from "./pages/Reviews";
import TermsConditions from "./pages/TermsConditions.jsx";
import SingleReviewView from "./pages/SingleReviewView.jsx";
import SingleOfferView from "./pages/SingleOfferView.jsx";


import injectContext, { Context } from "./store/appContext";

import Navbar from "./component/Navbar.jsx";
import Footer from "./component/Footer.jsx";
import ContactForm from "./component/ContactForm";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";
import PaymentOptions from "./component/PaymentOptions";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import DonationForm from "./component/DonationForm";
import Favorites from "./pages/Favorites";
import AdminView from "./pages/AdminView";
import AboutUs from "./pages/AboutUs"
import Cookies from "./pages/Cookies";
import PrivatePolitic from "./pages/PrivatePolitic";






//create your first component
const Layout = () => {
    const { store } = useContext(Context)
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;


    const initialOptions = {
        clientId: "AUhavhSMBFBY08HaRDVYAVtP0_opyZj2sMf3E8iVWlf5lvPQSex2_n4YyP_-1kD6LonYzrY0crPXzjXP",
        currency: "USD",
        intent: "capture",
    };

    return (
        <div>

            <PayPalScriptProvider options={initialOptions}>
                <BrowserRouter basename={basename}>
                    <ScrollToTop>
                        <Navbar />
                        <Routes>
                            <Route element={<Home />} path="/" />
                            <Route element={<Demo />} path="/demo" />
                            <Route element={<Single />} path="/single/:theid" />
                            <Route element={<SignupGeneralView />} path="/signup" />
                            <Route element={<LogIn />} path="/login" />
                            <Route element={<ForgotPassword />} path="/forgot_password" />
                            <Route element={<ContactForm />} path="/contact" />
                            <Route element={<UserPrivate />} path="/user/private" />
                            <Route element={<BusinessUserPrivate />} path="/business_user/private" />
                            <Route element={<Business_offers />} path="/offers" />
                            <Route element={<SingleOfferView />} path="/offer/:offer_id" />
                            <Route element={<SingleReviewView />} path="/review/:review_id" />
                            <Route element={<Trips />} path="/trips" />
                            <Route element={<Reviews />} path="/reviews" />
                            <Route element={<TermsConditions />} path="/terms" />
                            <Route element={<DonationForm />} path="/donacion" />
                            <Route element={<PaymentOptions />} path="/opciones-de-pago" />
                            <Route element={<Favorites />} path="/favoritos" />
                            <Route element={<AdminView />} path="/admin" />
                            <Route element={<AboutUs />} path="/about" />
                            <Route element={<Cookies />} path="/cookies" />
                            <Route element={<PrivatePolitic />} path="/politica-privacidad" />
                            <Route element={<h1>Not found!</h1>} />
                        </Routes>
                        <Footer />
                    </ScrollToTop>
                </BrowserRouter>
            </PayPalScriptProvider>
        </div>
    );
};

export default injectContext(Layout);
