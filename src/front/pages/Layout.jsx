import React, { useReducer, createContext} from "react"
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

    const location = useLocation();

    return (
        <AppContext.Provider value={{ store, dispatch }}>
            <>
            <ScrollToTop location={location} />
                <Navbar />
                    <Outlet />
                    <WhatsappButton />
                <Footer />
            </>
        </AppContext.Provider>
    )
}