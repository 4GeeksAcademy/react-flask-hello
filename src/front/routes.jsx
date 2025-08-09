// src/front/routes.jsx
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Single } from "./pages/Single";
import { Demo } from "./pages/Demo";
import { Login } from "./pages/Login.jsx";
import { VistaHome } from "./pages/VistaHome";
import { Formulario } from "./pages/Formulario";
import { Evento } from "./pages/Evento";
import { Usuario } from "./pages/Usuario";
import { AjustesUsuario } from "./pages/AjustesUsuario";
import { NotFound } from "./pages/NotFound";
import { CreateEvent } from "./pages/CreateEvent";
import { Register } from "./pages/RegistroUsuario.jsx";


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
        <Route path="single/:theId" element={<Single />} />
        <Route path="demo" element={<Demo />} />
        <Route path="vistahome" element={<VistaHome />} />
        <Route path="formulario" element={<Formulario />} />
        <Route path="evento" element={<Evento />} />
        <Route path="usuario" element={<Usuario />} />
        <Route path="ajustesusuario" element={<AjustesUsuario />} />
        <Route path="crear-evento" element={<CreateEvent />} />

        {/* Catch-all */}
        <Route path="*" element={<NotFound />} />
      </Route>

    </>
  )
);

export default router;
