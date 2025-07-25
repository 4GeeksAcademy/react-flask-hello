// Import necessary components and functions from react-router-dom.

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import Home from "../front/pages/Home.jsx";
import { Single } from "./pages/Single";
import { Demo } from "./pages/Demo";
import React from "react";
import CurvedText from "./components/CurvedText"; // Importing the CurvedText component
import { Perros } from "./pages/Perros.jsx";
import { Gatos } from "./pages/Gatos.jsx";
import { Registro } from "./pages/Registro.jsx"; // Importing the Registro component
import { Carrito } from "./pages/Carrito.jsx"; // Importing the Carrito component
import { Login } from "./pages/Login.jsx"; // Importing the Login component
import { Dashboard } from "./pages/Dashboard"; // Importing the Dashboard component

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>} >

      {/* Nested Routes: Defines sub-routes within the BaseHome component. */}
      <Route path="/" element={<Home />} />
      <Route path="/single/:theId" element={<Single />} />  {/* Dynamic route for single items */}
      <Route path="/demo" element={<Demo />} />
      <Route path="/curved-text" element={<CurvedText />} /> {/* Route for CurvedText component */}
      <Route path="/perros" element={<Perros />} /> {/* Route for Perros page */}
      <Route path="/gatos" element={<Gatos />} /> {/* Route for Gatos page */}
      <Route path="/registro" element={<Registro />} /> {/* Route for RegistroModal */}
      <Route path="/carrito" element={<Carrito />} /> {/* Route for Carrito page */}
      <Route path="/login" element={<Login />} /> {/* Route for Login page */}
      <Route path="/dashboard" element={<Dashboard />} /> {/* Route for Dashboard page */}


    </Route>
  )
);