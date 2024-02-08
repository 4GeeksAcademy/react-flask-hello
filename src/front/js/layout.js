import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { SignUp } from "./pages/signUp";
import { Login } from "./pages/login";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { CardPeliculas } from "./component/cardPeliculas"
import { PagesPeliculas }  from "./pages/pagesPeliculas";
import { Profile } from "./pages/profile"
import { MovieReviewForm } from "./component/movieReviewForm";
import { EditUserProfile } from "./component/profile/editUserProfile";



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
                        <Route element={<CardPeliculas />} path="/cardPeliculas" />
                        <Route element={<PagesPeliculas />} path="/pagesPeliculas" />
                        <Route element={<SignUp />} path="/signUp" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<Profile />} path="/profile" />
                        <Route element={<EditUserProfile/>} path="/editProfile" />
                        <Route element={<MovieReviewForm />} path="/reviewForm" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
