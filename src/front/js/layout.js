import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { SingleHathaYogaDetails } from "./pages/SingleHathaYogaDetails.js";
import { SingleJivamutkiYogaDetails } from "./pages/SingleJivamutkiYogaDetails.js";
import { SingleVinyasaYogaDetails } from "./pages/SingleVinyasaYogaDetails.js";
import { SessionYogaDetails } from "./pages/SessionYogaDetails.js";
import injectContext from "./store/appContext";
import { Login } from "./pages/login"; 
import { Sessions } from "./pages/classes";
import { Teachers } from "./pages/teachers";
import { Signup } from "./pages/signup";


import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
// import { HathaYogaDetailsCard } from "./component/HathaYogaDetailsCard.js";
import { SignupFreeTrial } from "./pages/signupfreetrial";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    return (
        <div style={{backgroundColor: "#FBF9F1"}}>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Demo />} path="/demo" />
                        {/* <Route element={<SingleMeditationDetails />} path="/meditation/:theid" /> */}
                        {/* <Route element={<SingleMeditationDetails />} path="/harmonium/:theid" /> */}
                        <Route path="/hathayoga/:theid" element={<SingleHathaYogaDetails />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/sessions" element={<Sessions />} />
                        <Route path="/theteachers" element={<Teachers />} />
                        {/* <Route path="/jivamuktiyoga/:theid" element={<SingleJivamutkiYogaDetails />} /> */}
                        {/* <Route path="/vinyasayoga/:theid" element={<SingleVinyasaYogaDetails />} /> */}
                        <Route path="/:yogatype/:theid" element={<SessionYogaDetails />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/signup/freetrial" element={<SignupFreeTrial />} />

                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
