import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Login } from "./pages/Login/Login.jsx";
import { Business } from "./pages/Business/Business.jsx";
import { Appointments } from "./pages/Appointments/Appointments.jsx";
import { AppointmentForm } from "./components/AppointmentForm/AppointmentForm.jsx";
import { Clients } from "./pages/Clients/Clients.jsx"
import { NewClient } from "./pages/NewClient/NewClient.jsx";
import { NewService } from "./pages/NewService/NewService.jsx"
import { Calendar } from "./pages/Calendar/Calendar.jsx";
import { ListOfService } from "./components/ListOfService/ListOfService.jsx";
import { ClientDetail } from "./pages/ClientDetail/ClientDetail.jsx";
import AssignService from "./pages/AssignService.jsx";



export const AppRoutes = createBrowserRouter(
    createRoutesFromElements(

        <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>} >
            <Route index element={<Login />} />

            <Route path="/calendar" element={<Calendar />} />
            <Route path="/business" element={<Business />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/newclient" element={<NewClient />} />
            <Route path="/newservice" element={<NewService />} />
            <Route path="/services" element={<ListOfService />} />
            <Route path="/clients/:clientId" element={<ClientDetail />} />
            <Route path="/assignservice" element={<AssignService />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/appointment/create" element={<AppointmentForm />} />
            <Route path="/appointment/create/:clientId" element={<AppointmentForm />} />
        </Route>
    )
);