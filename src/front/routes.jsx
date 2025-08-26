import React from "react";
import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import { useStore } from "./hooks/useGlobalReducer";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import ProfilePrivate from "./pages/ProfilePrivate";
import ProfilePublic from "./pages/ProfilePublic";
import AuthCallback from "./pages/AuthCallback";

const DashboardClient = () => <div>Mis tareas (Cliente)</div>;
const DashboardTasker = () => <div>Mis ofertas (Proveedor)</div>;

function Protected({ role }) {
  const { store } = useStore();
  const user = store.user;
  if (!user) return <Navigate to="/login" replace />;
  if (role && user.role !== role) {
    return <Navigate to={user.role === "client" ? "/client" : "/tasker"} replace />;
  }
  return <Outlet />;
}

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/auth/callback", element: <AuthCallback /> },   // <--- AÑADIDO
      // ... tus rutas protegidas
      { path: "*", element: <Navigate to="/" replace /> }
    ]
  }
]);
