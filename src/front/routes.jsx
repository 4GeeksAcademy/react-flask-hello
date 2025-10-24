import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Single } from "./pages/Single";
import { Demo } from "./pages/Demo";
import { Login } from "./pages/Login.jsx";
import { SignupPage } from "./pages/SignupPage.jsx";
import { ForgotPasswordPage } from "./pages/ForgotPasswordPage.jsx";
import { EventForm } from "./pages/EventForm.jsx";
import { Prebuy } from "./pages/Prebuy.jsx";
import { Events } from "./pages/Events.jsx"; 
import {EventsMapView} from "./components/EventsMapView";
import { ResetPasswordPage } from "./pages/Resetpassword.jsx";
import { Contact } from "./pages/Contact.jsx";
import { About } from "./pages/About.jsx"

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>} >
            <Route index element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/events" element={<Events />} /> 
            <Route path="/single/:theId" element={<Single />} />
            <Route path="/resetpassword/:token/success" element={<ResetPasswordPage />} />
            <Route path="/demo" element={<Demo />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/create-event" element={<EventForm />} />
            <Route path="/events-map" element={<EventsMapView />} />
            <Route path="/prebuy" element={<Prebuy />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<h1>Page Not Found!</h1>} />

        </Route>
    )
);