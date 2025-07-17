import React, { useReducer, createContext} from "react"
import { Outlet } from "react-router-dom/dist";
import storeReducer, { initialStore } from "../store.js";
import ScrollToTop from "../components/ScrollToTop"
import { Navbar } from "../components/Navbar.jsx"
import { Footer } from "../components/Footer"


// Base component that maintains the navbar and footer throughout the page and the scroll to top functionality.
export const AppContext = createContext(null);

export const Layout = () => {

    const [store, dispatch] = useReducer(storeReducer, initialStore());

    return (
        <AppContext.Provider value={{ store, dispatch }}>
            <ScrollToTop>
                <Navbar />
                    <Outlet />
                <Footer />
            </ScrollToTop>
        </AppContext.Provider>
    )
}