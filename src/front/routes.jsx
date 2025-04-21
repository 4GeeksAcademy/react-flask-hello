import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";

import { Layout } from "./pages/Layout";
import { Login } from "./pages/Login/Login.jsx";
import { Business } from "./pages/Business/Business.jsx";
import { Clients } from "./pages/Clients/Clients.jsx";
import AssignService  from "./pages/AssignService.jsx";
import Calendar  from "./pages/Calendar/Calendar.jsx";


export const AppRoutes = createBrowserRouter(
    createRoutesFromElements(

        <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>} >
            <Route index element={<Login />} />
            <Route path="/negocios" element={<Business />} />
            <Route path="/clientes" element={<Clients />} />
            <Route path="/servicios" element={<AssignService />} />
            <Route path="/calendario" element={<Calendar />} />
        </Route>
    )
);