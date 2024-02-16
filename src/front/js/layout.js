import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Events } from "./pages/events";
import Single from "./pages/single"; // Updated import
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { LogIn } from "./pages/login";
import { SignUp } from "./pages/signUp";
import { CreateEvent } from "./pages/createEvent";
import { Contact } from "./pages/contact";
import EventSingle from "./component/EventSingle";
import EventsPage from "./pages/EventsPage";
import MusicEventsPage from "./pages/MusicEventsPage";
import ComedyEventsPage from "./pages/ComedyEventsPage";
import BusinessEventsPage from "./pages/BusinessEventsPage";
import SportsEventsPage from "./pages/SportsEventsPage";
import UpdateEvent from './pages/updateEvent';
import Checkout from './pages/Checkout'
import MyEvents from "./pages/MyEvents";

const Layout = () => {
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<MyEvents /> } path="/my-events" />
                        <Route element={<EventsPage /> } path="/events" />
                        <Route element={<MusicEventsPage /> } path="/events/music" />
                        <Route element={<ComedyEventsPage /> } path="/events/comedy" />
                        <Route element={<BusinessEventsPage /> } path="/events/business" />
                        <Route element={<SportsEventsPage /> } path="/events/sports" />
                        <Route element={<Single />} path="/event/:id" /> {/* Updated route */}
                        <Route element={<Contact />} path="/contact" />
                        <Route element={<LogIn />} path="/login" />
                        <Route element={<SignUp />} path="/sign-up" />
                        <Route element={<CreateEvent />} path="/create-event" />
                        <Route element={<UpdateEvent />} path="/update-event/:id" /> {/* Include the route for UpdateEventForm */}
                        <Route element={<h1>Not found!</h1>} />
                        <Route element={<EventSingle />} path="/single-event" />
                        <Route element={<Checkout />} path="/checkout/:id" />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
