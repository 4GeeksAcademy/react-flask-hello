import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";
import { SignupLogin } from "./pages/signuplogin";
import { Login } from "./pages/login";
import { Signup } from "./pages/signup";
import { Userdata } from "./pages/userdata";
import { AdminPage } from "./pages/AdminPage";
import { Payment } from "./pages/Payment";
import { Completion } from "./component/Completion";
import CheckoutForm from "./component/CheckoutForm";
import { AmountSubmit } from "./component/amountSubmitForm";


import { NavBar } from "./component/navbar";
import { Footer } from "./component/footer";
import { UserInsertData } from "./component/userInsertData";
import { TimeCounter } from "./component/timeCounter";


//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    {/* <NavBar /> */}
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<SignupLogin />} path="/signuplogin"/>
                        <Route element={<Payment />} path="/donation" />
                        <Route element={<Completion />} path="/completion" />
                        <Route element={<CheckoutForm />} path="/checkoutform" />
                        <Route element={<Signup />} path="/signup" />

                        <Route element={<AdminPage />} path="/admin" />

                        <Route element={<AmountSubmit />} path="/amount" />

                        <Route element={<Userdata />} path="/userdata" />
                        <Route element= {<TimeCounter />} path="/timecounter"/> 
                        <Route element={<UserInsertData />} path="/userinsertdata" />
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
