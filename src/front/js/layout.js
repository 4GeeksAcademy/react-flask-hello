import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";

import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import { Login } from "./pages/login";

import { Perfil } from "./pages/perfil";
import { SegundoPerfil } from "./pages/SegundoPerfil";

import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";

import { Formulario } from "./component/Formulario.jsx";
import { OtroFormulario } from "./component/OtroFormulario.jsx";
import { Buscador } from "./component/Buscador.jsx";
import { Nosotros } from "./component/nosotros.js";
import { Task } from "./component/task.js";
import Carrousel from "./component/carrousel.js";
import PrestadorCv from "./component/prestadorCv.js";

import GeneradorPublicacion from "./component/generadorPublicacion";
import { Landing } from "./component/landing2.js";

//create your first component
const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g:: BASENAME=/react-hello-webapp/
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
            <Route element={<Demo />} path="/demo" />
            <Route element={<Single />} path="/single" />
            <Route element={<Single />} path="/single/:theid" />
            <Route element={<Login />} path="/login" />
            <Route element={<Footer />} path="/footer" />
            <Route element={<PrestadorCv />} path="/Trabajos" />
            <Route element={<OtroFormulario />} path="/Registro" />
            <Route element={<Formulario />} path="/RegistroPrestador" />
            <Route element={<Carrousel />} path="/carousel" />
            <Route element={<PrestadorCv />} path="/prestadorCV" />
            {/* <Route element={<PrestadorCv />} path="/perfil" /> */}
           
            <Route
              element={<GeneradorPublicacion />}
              path="/generadorPublicacion"
            />
            <Route element={<Perfil />} path="/perfil" />
            <Route element={<Landing />} path="/landing2" />
            <Route element={<SegundoPerfil />} path="/Prestador/"/>
            <Route element={<SegundoPerfil />} path="/Prestador/:idUsuario" />
            <Route element={<Nosotros />} path="/nosotros" />
            <Route element={<h1>Not found!</h1>} />
            <Route element={<Task />} path="/task" />
          </Routes>
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);