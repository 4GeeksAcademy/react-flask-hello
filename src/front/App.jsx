import React, { useEffect, createContext, useContext, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import { AnimatePresence } from "framer-motion";
import Loader from "./components/Loader";

// Creamos el contexto dentro del mismo archivo
const LoadingContext = createContext();

// Hook personalizado para usar el loading
const useLoading = () => {
    const context = useContext(LoadingContext);
    if (!context) {
        throw new Error('useLoading must be used within LoadingProvider');
    }
    return context;
};

const AppContent = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { setIsLoading } = useLoading();
    const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

    useEffect(() => {
        const handleRouteChange = () => {
            setIsLoading(true);
            // Simulamos un tiempo mínimo de carga para mostrar la animación
            setTimeout(() => {
                setIsLoading(false);
            }, 800);
        };

        handleRouteChange();
    }, [location.pathname, setIsLoading]);

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

const App = () => {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
            <AppContent />
            {isLoading && <Loader />}
        </LoadingContext.Provider>
    );
};

export default App;
