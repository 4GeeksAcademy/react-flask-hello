import { Navigate } from "react-router-dom";
import { useGlobalReducer } from "../hooks/useGlobalReducer";

export const PrivateRoute = ({ children }) => {
  const { store } = useGlobalReducer();
  return store.token ? children : <Navigate to="/signin" />;
};
