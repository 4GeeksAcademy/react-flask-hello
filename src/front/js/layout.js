import React, { Component } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";
import Signup from "./pages/signup";
import Login from "./pages/login";
import  AlertsView  from "./pages/alertsView";
import { ButtonView } from "./pages/buttonView"
import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";

import { Admin } from "./pages/admin";
import { AdminSearch } from "./pages/adminSearch";
import { UserProfileData } from "./pages/userProfileData";


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
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<h1>Not found!</h1>} />
                        <Route element={<Signup />} path="/signup" />
                        <Route element={<Login />} path="/login" />
                        
                        <Route element={<Admin />} path="/admin" />

                        


                        <Route element={<AlertsView />} path="/component/alerts" />
                        <Route element={<ButtonView />} path="/button" />

                        <Route element={<AdminSearch />} path="/adminsearch" />

                        <Route element={<UserProfileData/>} path="/userprofiledata" />

                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
