import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import RegistroUsuario from "./pages/RegistroUsuario";
import RegistroEleccion from "./pages/RegistroEleccion";
import RegistroInst from "./pages/RegistroInst";
import IniciarSesion from "./pages/IniciarSesion";
import IniciarSesionInstitucion from "./pages/IniciarSesionInst";
import IniciarSesionEleccion from "./pages/InicioSesionEleccion";
import Nosotros from "./pages/Nosotros";
import PreguntasFrecuentes from "./pages/PreguntasFrecuentes";
import Perfil from "./pages/Perfil";
import PerfilInstitucional from "./pages/PerfilInstitucional"
import Tracker from "./pages/Tracker";
import FormularioBeca from "./pages/FormularioBeca";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";

//create your first component
const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";

  if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "")
    return <BackendURL />;

  return (
    <div>
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          <Navbar />
          <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<h1>Not found!</h1>} />
            <Route element={<RegistroUsuario />} path="/registroUsuario" />
            <Route element={<RegistroEleccion />} path="/registroEleccion" />
            <Route element={<RegistroInst />} path="/registroInst" />
            <Route element={<IniciarSesion />} path="/iniciarsesion" />
            <Route element={<IniciarSesionInstitucion />} path="/iniciarsesion_institucion" />
            <Route element={<IniciarSesionEleccion />} path="/iniciarsesionEleccion" />
            <Route element={<Nosotros />} path="/nosotros" />
            <Route element={<Tracker />} path="/tracker" />
            <Route element={<Tracker />} path="/tracker" />
            <Route element={<FormularioBeca />} path="/formulario" />
            <Route element={<PreguntasFrecuentes />} path="/preguntas-frecuentes" />
            <Route element={<Perfil />} path="/perfil" />
            <Route element={<PerfilInstitucional />} path="/perfil_institucional" />

          </Routes>
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
