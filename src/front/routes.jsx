// src/front/routes.jsx
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login.jsx";
import { NotFound } from "./pages/NotFound";
import { CreateEvent } from "./pages/CreateEvent";
import { Register } from "./pages/Register.jsx";
import { Forgot } from './pages/Forgot.jsx';
import { Reset } from './pages/Reset.jsx';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>

    // Root Route: All navigation will start from here.
      

    

      {/* Rutas con layout */}
      <Route path="/" element={<Layout />} errorElement={<NotFound />}>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="forgot" element={<Forgot />} />
      <Route path="reset" element={<Reset />} />
      
        {/* Home (index) */}
        <Route index element={<Home />} />
        {/* Alternativa: /home */}
        <Route path="/home" element={<Home />} />

        {/* Rutas adicionales */}
        <Route path="/crear-evento" element={<CreateEvent />} />
        
        

        {/* Catch-all */}
        <Route path="*" element={<NotFound />} />
      </Route>

    </>
  )
);

export default router;
