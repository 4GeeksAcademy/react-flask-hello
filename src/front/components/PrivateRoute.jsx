import { useEffect } from "react";
import { useAuth } from "../context/AuthProvider";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const { store } = useAuth();

    useEffect(() => {
        const token = sessionStorage.getItem("access_token");
        if (token && !store.access_token) {
            store.access_token = token;
        }
    }, []);

    if (!store.access_token) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default PrivateRoute;