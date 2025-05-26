import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Single } from "./pages/Single";
import { Demo } from "./pages/Demo";
import  NutricionPage  from "./pages/NutricionPage";
import  SportPage  from "./pages/SportPage";
import  Entrenadores  from "./pages/Entrenadores";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>}>

      <Route path="/" element={<Home />} />
      <Route path="/single/:theId" element={<Single />} />
      <Route path="/demo" element={<Demo />} />
      <Route path="/nutricion" element={<NutricionPage />} />
      <Route path="/sport" element={<SportPage />} /> 
      <Route path="/entrenadores" element={<Entrenadores />} />
    </Route>
  )
);
