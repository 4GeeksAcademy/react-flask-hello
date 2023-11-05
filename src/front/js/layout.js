import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";
import injectContext from "./store/appContext";
import { Login } from "./pages/login";
import { Home } from "./pages/home";
import { Signup } from "./pages/signup";
import { Profile } from "./pages/profile";
import { Landing } from "./pages/landing";
import { SignupKeeper } from "./pages/signupKeeper";
import { Footer } from "./component/footer";
import { Navbar } from "./component/navbar";
//create your first component
const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";
  if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "")
    return <BackendURL />;
  return (
    <div>
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          <Navbar />
          <Routes>
            <Route element={<Landing />} path="/" />
            <Route element={<Signup />} path="/signup" />
            <Route element={<Profile />} path="/profile" />
            <Route element={<SignupKeeper />} path="/signup/keeper" />
            <Route element={<Login />} path="/login" />
            <Route element={<Home />} path="/home" />
            <Route element={<h1>Not found!</h1>} />
          </Routes>
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};
export default injectContext(Layout);