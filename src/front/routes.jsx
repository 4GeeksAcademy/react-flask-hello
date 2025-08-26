import React from "react";
import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import { useStore } from "./hooks/useGlobalReducer";

// Páginas para Autenticación y perfil
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import ProfilePrivate from "./pages/ProfilePrivate";
import ProfilePublic from "./pages/ProfilePublic";
<<<<<<< HEAD
import AuthCallback from "./pages/AuthCallback";
=======

// Páginas que venían en main by Jaqueline
import Single from "./pages/Single";
import Demo from "./pages/Demo";
import NewTask from "./pages/NewTask";
import Admin from "./pages/Admin";
>>>>>>> main

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
<<<<<<< HEAD
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/auth/callback", element: <AuthCallback /> },   // <--- AÑADIDO
      // ... tus rutas protegidas
      { path: "*", element: <Navigate to="/" replace /> }
    ]
  }
]);
=======
      // Públicas
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/u/:username", element: <ProfilePublic /> },

      // Rutas que venían en main
      { path: "/single/:theId", element: <Single /> },
      { path: "/demo", element: <Demo /> },
      { path: "/newtask", element: <NewTask /> },
      { path: "/admin", element: <Admin /> },

      // Privadas (requiere sesión)
      {
        element: <Protected />,
        children: [
          { path: "/account", element: <ProfilePrivate /> },
          { path: "/profile", element: <Profile /> },
        ],
      },

      // Privadas por rol
      { element: <Protected role="client" />, children: [{ path: "/client", element: <DashboardClient /> }] },
      { element: <Protected role="tasker" />, children: [{ path: "/tasker", element: <DashboardTasker /> }] },

      // Catch-all
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
]);
>>>>>>> main
