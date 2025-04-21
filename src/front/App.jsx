
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import { AnimatePresence } from "framer-motion";

const App = () => {
    const location = useLocation();
    const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

    return (
        <ScrollToTop>
            {/* Fondo ONDAS solo en login/register */}
            {isAuthPage && <div className="fixed-bg" />}

            {/* Animación solo para rutas Auth */}
            <div className="page-wrapper">
                <AnimatePresence mode="wait">
                    <Outlet key={location.pathname} />
                </AnimatePresence>
            </div>
        </ScrollToTop>
    );
};

export default App;
