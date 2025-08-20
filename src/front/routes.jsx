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
import { Login } from "./pages/Login";
import { Registro } from "./pages/Registro";
import { BusquedaOfertas } from "./pages/BusquedaOfertas";
import { OfertaId } from "./pages/OfertaId";
import { ResetPassword } from "./pages/ResetPassword";


export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>} >
            <Route path="/" element={<Home />} />
            <Route path="/single/:theId" element={<Single />} />
            <Route path="/demo" element={<Demo />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/busqueda" element={<BusquedaOfertas />} />
            <Route path="/oferta/:id" element={<OfertaId />} />
            <Route path="/resetPassword/:token" element={<ResetPassword/>} />
            <Route path="/resetPassword/" element={<ResetPassword/>} />
        </Route>
    )
);
