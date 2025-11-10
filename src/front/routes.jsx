import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Forgot } from "./pages/Forgot";
import { MapView } from "./pages/MapView";


export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>}>
      <Route index element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot" element={<Forgot />} />
      <Route path="/map" element={<MapView />} />
      <Route path="*" element={<Login />} />
    </Route>
  )
);
