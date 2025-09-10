import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";

import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login.jsx";
import { NotFound } from "./pages/NotFound";
import { CreateEvent } from "./pages/CreateEvent";
import { Register } from "./pages/Register.jsx";
import { Forgot } from './pages/Forgot.jsx';
import { Reset } from './pages/Reset.jsx';
import { MisEventos } from "./pages/MisEventos.jsx";
import { ListaEventos } from "./pages/ListaEventos.jsx";
import { PerfilUsuario } from "./pages/PerfilUsuario.jsx";
import { ID_Evento } from "./pages/ID_Evento.jsx";
import { ActualizarUsuario } from "./pages/ActualizarUsuario";




export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<NotFound />}>
      {/* Home (index) */}
      <Route index element={<Home />} />
      {/* Alternativa a lo de antes: /home */}
      <Route path="/home" element={<Home />} />
      <Route path="/home/:token" element={<Home />} />
      <Route path="/home/:token/:resetPassword/:email/reset" element={<Reset />} />

      {/* Auth */}
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="forgot" element={<Forgot />} />




      {/* Rutas adicionales */}
      <Route path="/crear-evento" element={<CreateEvent />} />
      <Route path="/crear-evento/:eventId" element={<CreateEvent />} />



      {/* Eventos */}
      <Route path="eventos" element={<ListaEventos />} />
      <Route path="mis-eventos" element={<MisEventos />} />
      <Route path="/evento/:event_id" element={<ID_Evento />} />
      
      {/* Usuario */}
      <Route path="user/perfil" element={<PerfilUsuario />} />
      <Route path="user/actualizar-perfil/:userId" element={<ActualizarUsuario />} />


      {/* Catch-all */}
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

