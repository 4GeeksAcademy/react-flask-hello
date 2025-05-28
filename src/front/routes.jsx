import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import Home from "./pages/Home";
import { Single } from "./pages/Single";
import { Demo } from "./pages/Demo";
import Dashboard from "./pages/Dashboard";
import Registro from "./pages/Registro";
import FormularioEvento from "./pages/FormularioEvento";  // Importá tu componente

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>}>
      <Route path="/" element={<Home />} />
      <Route path="/single/:theId" element={<Single />} />
      <Route path="/demo" element={<Demo />} />
      <Route path="/registro" element={<Registro />} />
      <Route path="/eventos/crear" element={<FormularioEvento />} />
      <Route path="/eventos/editar/:id" element={<FormularioEvento />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Route>
  )
);
