/* 👆 🤟🏼 ❇️ Riki for the group success 8_Abril 👊 */

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import PublicLayout from "./pages/PublicLayout"; // Importación correcta (sin destructuring)
import { Login } from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Dash_user from "./pages/Dash_user/Dash_user";
import Dash_admin from "./pages/Dash_admin/Dash_admin";
import Plot_form from "./pages/Plot_form/Plot_form";
import Landing from "./pages/Landing/Landing"; // Componente Landing

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Landing page directamente sin layout */}
      <Route path="/" element={<Landing />} />
      
      {/* El resto de rutas con su layout original */}
      <Route path="/app" element={<Layout />} errorElement={<h1>Not found!</h1>}>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="dashboard" element={<Dash_user />} />
        <Route path="dash_admin" element={<Dash_admin />} />
        <Route path="plot_form" element={<Plot_form />} />
      </Route>
    </>
  )
);