import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";
import { Login } from "./pages/login";
import { Signup } from "./pages/signup";
import { Userdata } from "./pages/userdata";
import { Payment } from "./component/Payment";
import { Completion } from "./component/Completion";
import CheckoutForm from "./component/CheckoutForm";
import { AmountSubmit } from "./component/amountSubmitForm";


import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";


//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<Payment />} path="/donation" />
                        <Route element={<Completion />} path="/completion" />
                        <Route element={<CheckoutForm />} path="/checkoutform" />
                        <Route element={<Signup />} path="/signup" />
                        <Route element={<AmountSubmit />} path="/amount" />
                        <Route element={<Userdata />} path="/userdata" />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
