// src/front/components/ProtectedRoute.jsx

import React from "react";
import { Navigate } from "react-router-dom";
import { useGlobalReducer } from "./hooks/useGlobalReducer"; // Ajusta la ruta si es necesario

const ProtectedRoute = ({ children }) => {
  const { store } = useGlobalReducer();
  const isAuthenticated = store.auth.isAuthenticated;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
