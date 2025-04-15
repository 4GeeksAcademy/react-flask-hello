import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";

import { Layout } from "./pages/Layout";
import { Login } from "./pages/Login/Login.jsx";
import { Business } from "./pages/Business/Business.jsx";
import { ClientList } from "./pages/ClientList";
import { NewClient } from "./pages/NewClient/NewClient.jsx"
import { NewService } from "./pages/NewService/NewService.jsx"
import { Calendar } from "./pages/Calendar/Calendar.jsx";


export const AppRoutes = createBrowserRouter(
    createRoutesFromElements(

        <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>} >
            <Route index element={<Login />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/business" element={<Business />} />
            <Route path="/clients" element={<ClientList />} />
            <Route path="/newclient" element={<NewClient />} />
            <Route path="/newservice" element={<NewService />} />
        </Route>
    )
);