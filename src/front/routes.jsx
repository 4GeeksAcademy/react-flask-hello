// Import necessary components and functions from react-router-dom.

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Single } from "./pages/Single";
import { Demo } from "./pages/Demo";
import {Login }  from "./pages/Login";
import {Footer }  from "./components/Footer";
import { ForgotPassword } from "./pages/ForgotPassword";
import { ResetPassword } from "./pages/ResetPassword";
import { Formulario } from "./pages/Formulario";
import { Page404 } from "./pages/Page404";
import { Loader} from "./pages/Loader";
import { Page404 } from "./pages/Page404";
import { Loader} from "./pages/Loader";

export const router = createBrowserRouter(
  createRoutesFromElements(
    // CreateRoutesFromElements function allows you to build route elements declaratively.
    // Create your routes here, if you want to keep the Navbar and Footer in all views, add your new routes inside the containing Route.
    // Root, on the contrary, create a sister Route, if you have doubts, try it!
    // Note: keep in mind that errorElement will be the default page when you don't get a route, customize that page to make your project more attractive.
    // Note: The child paths of the Layout element replace the Outlet component with the elements contained in the "element" attribute of these child paths.

    // Root Route: All navigation will start from here.
    <Route path="/" element={<Layout />} errorElement={<Page404 />} /*  loader={<Loader /> }  */>

      {/* Nested Routes: Defines sub-routes within the BaseHome component. */}
      <Route path="/" element={<Home />} />
      <Route path="/single/:theId" element={<Single />} />  {/* Dynamic route for single items */}
      <Route path="/demo" element={<Demo />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route path="/resetpassword" element={<ResetPassword />} />
      <Route path="/Formulario" element={<Formulario />} />
      <Route path="/login" element={<Login />} />
      {/* <Route path="/loader" element={<Loader />} /> Esta pagina es un intento independiente. Alexis */}
      {/* <Route path="/loader" element={<Loader />} /> Esta pagina es un intento independiente. Alexis */}
    </Route>
  )
);