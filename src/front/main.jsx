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
    const { store, dispatch } = useGlobalReducer();

    useEffect(() => {
        // Inicializa el tema
        document.body.className = store.theme === 'dark' ? 'dark-theme' : '';

        // Intenta cargar el estado de login desde localStorage al montar el componente
        const storedToken = localStorage.getItem("jwt_token");
        if (storedToken) {
            // Opcional: podrías verificar la validez del token con una llamada al backend aquí
            // para una autenticación más robusta al recargar.
            dispatch({
                type: "set_login_status",
                payload: {
                    isLoggedIn: true,
                    user_id: null, // Si tu token no contiene el user_id, puedes dejarlo null o decodificarlo
                    token: storedToken
                }
            });
        }
    }, [store.theme, dispatch]);

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