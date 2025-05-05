import { createBrowserRouter, createRoutesFromElements, Route, Navigate } from "react-router-dom";
import App from "./App";
import { Home } from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Profile } from "./pages/Profile";
import Landing from "./pages/Landing";
import Journey from "./pages/Journey";
import Onboarding from "./pages/Onboarding";
import ProfileMainPage from "./pages/ProfileMainPage";
import { Layout } from "./pages/Layout";
import PrivateRoute from "./components/PrivateRoute";
import Task from "./pages/Task";
import Achievements from "./pages/Achievements";



// Activa este flag para ver todo sin estar logueado (modo desarrollo)
const DEV_MODE = true;

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<h1>Not found!</h1>}>
      
      {/* Ruta inicial: redirige a /home si hay token, si no muestra Landing */}
      <Route
        index
        element={
          localStorage.getItem("token")
            ? <Navigate to="/profilemainpage" />
            : <Landing />
        }
      />

      {/* Rutas públicas */}
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="onboarding" element={<Onboarding />} />
      <Route path="landing" element={<Landing />} />
      <Route path="task" element={<Task />} />
      <Route path="achievements" element={<Achievements />} />


      {/* Páginas accedidas libremente en dev, protegidas en producción */}
      <Route path="home" element={
        DEV_MODE ? <Home /> : <PrivateRoute><Home /></PrivateRoute>
      } />

      <Route path="profile" element={
        DEV_MODE ? <Profile /> : <PrivateRoute><Profile /></PrivateRoute>
      } />

      <Route path="journey" element={
        DEV_MODE ? <Journey /> : <PrivateRoute><Journey /></PrivateRoute>
      } />

      <Route path="profilemainpage" element={
        DEV_MODE ? <ProfileMainPage /> : <PrivateRoute><ProfileMainPage /></PrivateRoute>
      } />

      <Route path="layout" element={
        DEV_MODE ? <Layout /> : <PrivateRoute><Layout /></PrivateRoute>
      } />
    </Route>
  )
);