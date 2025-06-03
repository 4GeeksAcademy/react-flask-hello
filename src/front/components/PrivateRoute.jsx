import { useEffect } from "react";
import { useAuth } from "../context/AuthProvider";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const { store, dispatch } = useAuth();

    useEffect(() => {
        const token = sessionStorage.getItem("access_token");
        if (token && !store.access_token) {
            dispatch({ type: "SET_TOKEN", payload: token });
        }
    }, [store.access_token, dispatch]);

    const token = store.access_token || sessionStorage.getItem("access_token");

    if (!token) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default PrivateRoute;