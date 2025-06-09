import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const { store, setStore, logout } = useAuth();
    const [checking, setChecking] = useState(true);
    const [tokenValid, setTokenValid] = useState(false);

    useEffect(() => {
        const token = sessionStorage.getItem("access_token");

        if (token) {

            if (!store.access_token) {
                setStore(prev => ({ ...prev, access_token: token }));
            }
            setTokenValid(true);
        } else {
            logout()
            setTokenValid(false);
        }

        setChecking(false);
    }, [store.access_token, setStore, logout]);

    if (checking) return null;

    if (!tokenValid) {
        console.warn("Token nulo o expirado, redirigiendo al login...");
        return <Navigate to="/" replace />;
    }

    return children;
};

export default PrivateRoute;