import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";

import { Layout } from "./pages/Layout";
import { Login } from "./pages/Login";
import { Negocios } from "./pages/Negocios";
import { Home } from "./pages/Home";
import { ClientList } from "./pages/ClientList";



export const AppRoutes = createBrowserRouter(
    createRoutesFromElements(

        <Route path="/" element={ <Layout /> } errorElement={ <h1>Not found!</h1> } >
            <Route index element={ <Login /> }/>
            <Route path="/negocios" element={<Negocios />} />
            <Route path="/home" element={<Home />} />
            <Route path="/clientes" element={<ClientList />} />
        </Route>
    )
);