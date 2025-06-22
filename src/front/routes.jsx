import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Single } from "./pages/Single";
import { Demo } from "./pages/Demo";
import NutricionPage from "./pages/NutricionPage";
import NutricionUser from "./pages/NutricionUser";
import NutricionProfesional from "./pages/NutricionProfesional";
import SportPage from "./pages/SportPage";
import SportUser from "./pages/SportUser";
import SportProfesional from "./pages/SportProfesional";
import Entrenadores from "./pages/Entrenadores";
import AboutUs from "./pages/AboutUs";
import Eventos from "./pages/Eventos";
import Tarifas from "./pages/Tarifas";
import User from "./pages/User";
import ProfesoresPage from "./pages/ProfesoresPage";
import Register from "./pages/Register";
import { Checkout } from "./pages/checkout";
import Login from "./pages/Login";
import { ReturnPage } from "./pages/returnPage";
import PaymentReturn from "./components/paymentReturn";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import { PrivatePage } from "./pages/PrivatePage";
import Epersonalizado from "./pages/Epersonalizado";
import ContactoPage from "./pages/ContactoPage";
import EntrenadorInfo from "./pages/Entrenadorinfo";
import UsuarioPage from "./pages/UsuarioPage";



export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>}>

      <Route path="/" element={<Home />} />
      <Route path="/single/:theId" element={<Single />} />
      <Route path="/demo" element={<Demo />} />
      <Route path="/nutricion" element={<NutricionPage />} />
      <Route path="/nutricionUser" element={<NutricionUser />} />
      <Route path="/nutricionProfesional" element={<NutricionProfesional />} />
      <Route path="/sport" element={<SportPage />} />
      <Route path="/sportUser" element={<SportUser />} />
      <Route path="/sportProfesional" element={<SportProfesional />} />
      <Route path="/profesionales" element={<Entrenadores />} />
      <Route path="/AboutUs" element={<AboutUs />} />
      <Route path="/Eventos" element={<Eventos />} />
      <Route path="/Tarifas" element={<Tarifas />} />
      <Route path="/user" element={<User />} />
      <Route path="/pUser" element={<ProfesoresPage />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/return" element={<PaymentReturn />} />
      <Route path="/returnPage" element={<ReturnPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/private" element={<PrivatePage />} />
      <Route path="/tarifas" element={<Tarifas />} />
      <Route path="/tarifas/:tipo" element={<Tarifas />} />
      <Route path="/Epersonalizado" element={<Epersonalizado />} />
      <Route path="/ContactoPage" element={<ContactoPage />} />
      <Route path="/entrenador/:id" element={<EntrenadorInfo />} />
      <Route path="/usuario/:id" element={<UsuarioPage />} />
    </Route>
  )
);
