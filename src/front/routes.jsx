import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Single } from "./pages/Single";
import { Demo } from "./pages/Demo";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { CreateEditClient } from "./components/CreateEditClient";
import { Payment } from "./pages/Payment";
import { ExplorePage } from "./pages/ExplorePage";
import { PaginaTienda } from "./components/PaginaTienda";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>}>
      <Route index element={<Home />} />
      <Route path="/single/:theId" element={<Single />} />
      <Route path="/demo" element={<Demo />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/createeditclient" element={<CreateEditClient />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/explorar" element={<ExplorePage />} />
      <Route path="/tienda/:id" element={<PaginaTienda />} />
    </Route>
  )
);
