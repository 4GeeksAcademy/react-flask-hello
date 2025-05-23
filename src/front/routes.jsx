import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Contacto } from "./pages/Contacto";
import { SobreNosotros } from "./pages/SobreNosotros";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Men from "./pages/Men"
import Women from "./pages/Women"
import { Service } from "./pages/Service";


export const router = createBrowserRouter(
    createRoutesFromElements(

      <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>} >
        <Route path= "/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="contacto" element={<Contacto />} />
        <Route path="sobre-nosotros" element={<SobreNosotros />} />
        <Route path="men" element={<Men />} />
        <Route path="women" element={<Women />} />
        <Route path="service" element={<Service />} />
      </Route>
    )
);