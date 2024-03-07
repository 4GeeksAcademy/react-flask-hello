import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Profile } from "./pages/Profile";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";
import { EventDescription } from "./pages/eventDescription";
import { PasswordRestoration } from "./pages/PasswordRestoration";

import { Navbar } from "./component/navbar"
import { Footer } from "./component/footer"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreateEventForm from "./pages/createEventForm";
import { Events } from "./pages/events";
import { UpdateEventPage } from "./pages/updateEventPage";
import { Cloudinary } from "./pages/cloudinary";

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
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        {/* <Route element={<Demo />} path="/demo" /> */}
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<CreateEventForm />} path="/createEventForm" />
                        <Route element={<Profile />} path="/profile" />
                        <Route element={<EventDescription />} path="/description/:theid" />
                        <Route path="events/:category" element={<Events />} />
                        <Route element={<UpdateEventPage />} path="/event/:theid" />
                        <Route element={<h1>Not found!</h1>} />
                        <Route element={<PasswordRestoration />} path="/restore_password/:token" />
                    </Routes>
                    <Footer />
                    <ToastContainer
                        position="top-center"
                        autoClose={2000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="dark"
                    />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
