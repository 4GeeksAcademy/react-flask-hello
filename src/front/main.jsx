import React from "react";
import ReactDOM from "react-dom/client";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./index.css";

import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { StoreProvider } from "./hooks/useGlobalReducer";
import { BackendURL } from "./components/BackendURL";
import { Auth0Provider } from '@auth0/auth0-react';

// ✅ Define el componente principal con nombre
function MainApp() {
  if (!import.meta.env.VITE_BACKEND_URL || import.meta.env.VITE_BACKEND_URL === "") {
    return (
      <React.StrictMode>
        <BackendURL />
      </React.StrictMode>
    );
  }

  return (
    <React.StrictMode>
      <Auth0Provider
        domain="dev-q4ltdjvbavvzdw40.us.auth0.com"
        clientId="bXYAbt4b5Nsqotk2ER0QP27wPxWQYflc"
        authorizationParams={{
          redirect_uri: window.location.origin,
        }}
      >
        <StoreProvider>
          <RouterProvider router={router} />
        </StoreProvider>
      </Auth0Provider>
    </React.StrictMode>
  );
}

// ✅ Llamada final
ReactDOM.createRoot(document.getElementById("root")).render(<MainApp />);
