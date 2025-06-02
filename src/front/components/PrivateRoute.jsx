import { useAuth } from "../context/AuthProvider";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const { store } = useAuth();

    if (!store.access_token) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default PrivateRoute;