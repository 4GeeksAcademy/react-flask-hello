import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';  // Global styles for your application
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { StoreProvider } from './hooks/StoreContext';  // ✅ actualizado
import { BackendURL } from './components/BackendURL';
import 'mapbox-gl/dist/mapbox-gl.css';
import ScrollToTop from './components/ScrollToTop'; // Ajustá el path si está en otro lado


const Main = () => {
    if (!import.meta.env.VITE_BACKEND_URL || import.meta.env.VITE_BACKEND_URL === "") {
        return (
            <React.StrictMode>
                <BackendURL />
            </React.StrictMode>
        );
    }

    return (
        <React.StrictMode>
            <StoreProvider>
                <RouterProvider router={router} />
            </StoreProvider>
        </React.StrictMode>

    );
};

// Renderiza la app
ReactDOM.createRoot(document.getElementById('root')).render(<Main />);
