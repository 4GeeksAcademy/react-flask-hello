import { Navigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";


export const ProtectedRoute = ({ children }) => {
  const { store } = useGlobalReducer();

  if (!store.token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};