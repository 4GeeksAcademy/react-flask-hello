import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import App from "./App";
import { Home } from "./pages/Home";
import Login from "./pages/Login"; // Importación por defecto
import Register from "./pages/Register";
import { Profile } from "./pages/Profile";
import { Landing } from "./pages/Landing";
import { Onboarding } from "./pages/Onboarding";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<h1>Not found!</h1>}>
      <Route index element={<Landing />} />
      <Route path="home" element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="profile" element={<Profile />} />
      <Route path="onboarding" element={<Onboarding />}/>
    </Route>
  )
);
