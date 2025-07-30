// Import necessary components and functions from react-router-dom.

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Single } from "./pages/Single";
import { Demo } from "./pages/Demo";
import { Login } from "./pages/Login";
import { Footer } from "./components/Footer";
import { ForgotPassword } from "./pages/ForgotPassword";
import { ResetPassword } from "./pages/ResetPassword";
import { Formulario } from "./pages/Formulario";
import { Page404 } from "./pages/Page404";
import { AddNewGasto } from "./pages/AddNewGasto";
import { Loader } from "./pages/Loader";
import { Main } from "./pages/Main";
import { Objetivos } from "./pages/Objetivos";
import { EditarObjetivo } from "./pages/EditarObjetivo";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<Page404 />} /* loader={<Loader />} */>
      <Route path="/" element={<Home />} />
      <Route path="/Main" element={<Main />} />
       <Route path="/Objetivos" element={<Objetivos />} />
        <Route path="/objetivos/editar/:index" element={<EditarObjetivo />} />
      <Route path="/single/:theId" element={<Single />} />
      <Route path="/demo" element={<Demo />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route path="/resetpassword" element={<ResetPassword />} />
      <Route path="/form" element={<Formulario />} />
      <Route path="/login" element={<Login />} />
      <Route path="/addnewgasto" element={<AddNewGasto />} />
      {/* <Route path="/loader" element={<Loader />} /> Esta pagina es un intento independiente. Alexis */}
    </Route>
  )
);