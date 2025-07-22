import React, { useReducer, createContext, useState } from "react"
import { Outlet, useLocation } from "react-router-dom/dist";
import storeReducer, { initialStore } from "../store.js";
import ScrollToTop from "../components/ScrollToTop"
import { Navbar } from "../components/Navbar.jsx"
import { Footer } from "../components/Footer"
import WhatsappButton from "../components/WhatsappButton.jsx"


// Base component that maintains the navbar and footer throughout the page and the scroll to top functionality.
export const AppContext = createContext(null);

export const Layout = () => {

    const [store, dispatch] = useReducer(storeReducer, initialStore());
    const [showNavbar, setShowNavbar] = useState(true)
    const [showFooter, setShowFooter] = useState(true)

    const location = useLocation();

    return (
        <AppContext.Provider value={{ store, dispatch, showNavbar, setShowNavbar, setShowFooter }}>
            <>
                <ScrollToTop location={location} />
                {showNavbar && <Navbar />}
                <Outlet />
                <WhatsappButton />
                {showFooter && <Footer />}
            </>
        </AppContext.Provider>
    )
}