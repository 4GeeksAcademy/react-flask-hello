import { Navigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const PrivateRoute = ({ children }) => {
  const { store } = useGlobalReducer();
  const token = localStorage.getItem("token");

  if (!store.user || !token) return <Navigate to="/login" />;
  return children;
};