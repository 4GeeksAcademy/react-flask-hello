import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { StoreProvider } from './hooks/useGlobalReducer';
import useGlobalReducer from './hooks/useGlobalReducer';
import { BackendURL } from './components/BackendURL';

const RootApp = () => {
    const { store } = useGlobalReducer();

    useEffect(() => {
        document.body.className = store.theme === 'dark' ? 'dark-theme' : '';
    }, [store.theme]);

    if (!import.meta.env.VITE_BACKEND_URL || import.meta.env.VITE_BACKEND_URL == "") {
        return (
            <React.StrictMode>
                <BackendURL />
            </React.StrictMode>
        );
    }
    return (
        <React.StrictMode>
            <RouterProvider router={router}>
            </RouterProvider>
        </React.StrictMode>
    );
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <StoreProvider>
        <RootApp />
    </StoreProvider>
);