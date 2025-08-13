import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";

import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login.jsx";
import { Register } from "./pages/Register.jsx";
import { NotFound } from "./pages/NotFound";
import { CreateEvent } from "./pages/CreateEvent";
import { Register } from "./pages/Register.jsx";
import { Forgot } from './pages/Forgot.jsx';
import { Reset } from './pages/Reset.jsx';
import { Events } from "./pages/Events.jsx";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<NotFound />}>
      {/* Home (index) */}
      <Route index element={<Home />} />
      {/* Alternativa a lo de antes: /home */}
      <Route path="home" element={<Home />} />

      {/* Auth */}
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="forgot" element={<Forgot />} />
      <Route path="reset" element={<Reset />} />
      
        {/* Home (index) */}
        <Route index element={<Home />} />
        {/* Alternativa: /home */}
        <Route path="/home" element={<Home />} />

      {/* Eventos */}
      <Route path="eventos" element={<Events />} />
      <Route path="crear-evento" element={<CreateEvent />} />

      {/* Catch-all */}
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

export default router;
