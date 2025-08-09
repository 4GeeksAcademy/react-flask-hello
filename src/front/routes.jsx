// src/front/routes.jsx
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login.jsx";
import { Evento } from "./pages/Evento";
import { NotFound } from "./pages/NotFound";
import { CreateEvent } from "./pages/CreateEvent";
import { Register } from "./pages/Register.jsx";


export const router = createBrowserRouter(
  createRoutesFromElements(
    <>

    // Root Route: All navigation will start from here.
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

    

      {/* Rutas con layout */}
      <Route path="/" element={<Layout />} errorElement={<NotFound />}>
        {/* Home (index) */}
        <Route index element={<Home />} />
        {/* Alternativa: /home */}
        <Route path="home" element={<Home />} />

        {/* Rutas adicionales */}
        <Route path="evento" element={<Evento />} />
        <Route path="crear-evento" element={<CreateEvent />} />

        {/* Catch-all */}
        <Route path="*" element={<NotFound />} />
      </Route>

    </>
  )
);

export default router;
