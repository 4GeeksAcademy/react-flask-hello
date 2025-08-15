import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";

import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login.jsx";
import { NotFound } from "./pages/NotFound";
import { CreateEvent } from "./pages/CreateEvent";
import { Events } from "./pages/Events.jsx";
import { Register } from "./pages/Register.jsx";
import { Forgot } from './pages/Forgot.jsx';
import { Reset } from './pages/Reset.jsx';



export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<NotFound />}>
      {/* Home (index) */}
      <Route index element={<Home />} />
      {/* Alternativa a lo de antes: /home */}
        <Route path="/home" element={<Home />} />
        <Route path="/home/:token" element={<Home />} />

      {/* Auth */}
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="forgot" element={<Forgot />} />
      <Route path="reset" element={<Reset />} />

      

        {/* Rutas adicionales */}
        <Route path="/crear-evento" element={<CreateEvent />} />
        
        

      {/* Eventos */}
      <Route path="eventos" element={<Events />} />
      

      {/* Catch-all */}
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

