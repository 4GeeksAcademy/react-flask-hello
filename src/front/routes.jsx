import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  useLocation,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Single } from "./pages/Single";
import { Demo } from "./pages/Demo";
import { LoginPage } from "./pages/LoginPage";
import { VistaHome } from "./pages/VistaHome";
import { Formulario } from "./pages/Formulario";
import { Evento } from "./pages/Evento";
import { Usuario } from "./pages/Usuario";
import { AjustesUsuario } from "./pages/AjustesUsuario";
import { NotFound } from "./pages/NotFound";
import { CreateEvent } from "./pages/CreateEvent";
import { Login } from "./components/Login.jsx";


export const router = createBrowserRouter(
  createRoutesFromElements(
    // CreateRoutesFromElements function allows you to build route elements declaratively.
    // Create your routes here, if you want to keep the Navbar and Footer in all views, add your new routes inside the containing Route.
    // Root, on the contrary, create a sister Route, if you have doubts, try it!
    // Note: keep in mind that errorElement will be the default page when you don't get a route, customize that page to make your project more attractive.
    // Note: The child paths of the Layout element replace the Outlet component with the elements contained in the "element" attribute of these child paths.
    <>
    // Root Route: All navigation will start from here.
    <Route path="/loginpage" element={<LoginPage />} />
    <Route path="login" element={<Login />} />

      {/* Nested Routes: Defines sub-routes within the BaseHome component. */}
      <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>} >
      <Route path="/" element={<Home />} />
      <Route path="/single/:theId" element={<Single />} />  {/* Dynamic route for single items */}
      <Route path="/demo" element={<Demo />} />
      <Route path="/home" element={<home />} />
      <Route path="vistahome" element={<VistaHome />} />
      <Route path="formulario" element={<Formulario />} />
      <Route path="evento" element={<Evento />} />
      <Route path="usuario" element={<Usuario />} />
      <Route path="ajustesusuario" element={<AjustesUsuario />} />
      <Route path="notfound" element={<NotFound />} />
      <Route path="crear-evento" element={<CreateEvent />} />

    </Route>
    </>
  )
);
