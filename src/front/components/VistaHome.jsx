import { Login } from "./Login.jsx";
import { Link } from "react-router-dom";
import { AjustesUsuario } from "../pages/AjustesUsuario.jsx";
import { Evento } from "../pages/Evento.jsx";
import { Formulario } from "../pages/Formulario.jsx";
import { NotFound } from "../pages/NotFound.jsx";
import { Usuario } from "../pages/Usuario.jsx";
import { CreateEvent } from "../pages/CreateEvent";
import { LoginPage } from "../pages/LoginPage";


import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import { useNavigate } from "react-router-dom";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export const VistaHome = () => {
  //carrusel fotos 
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  //rutas

  const navigate = useNavigate();

  const rutaLogin = () => {
    navigate("/login");
  };
  const rutaUsuario = () => {
    navigate("/usuario");
  };
  const rutaAjustesUsuario = () => {
    navigate("/AjustesUsuario");
  };
  const rutaEvento = () => {
    navigate("/evento");
  };
  const rutaNotFound = () => {
    navigate("/NotFound");
  };
  const rutaFormulario = () => {
    navigate("/Formulario");
  };
 const rutaCrearEvento = () => {
    navigate("/CreateEvent");
  };
  const rutaLoginPage = () => {
    navigate("/LoginPage");
  };

  return (
    <div>
      <Login />
      <br />
      <br />
      <div className="flex justify-center">
        {/*botones a rutas*/}
        <button className="text-black bg-yellow-700 m-3" onClick={rutaLogin}>Login</button>
        <button className="text-black bg-yellow-700 m-3" onClick={rutaUsuario}>Usuario</button>
        <button className="text-black bg-yellow-700 m-3" onClick={rutaAjustesUsuario}>Ajustes Usuario</button>
        <button className="text-black bg-yellow-700 m-3" onClick={rutaEvento}>Evento</button>
        <button className="text-black bg-yellow-700 m-3" onClick={rutaNotFound}>Not found</button>
        <button className="text-black bg-yellow-700 m-3" onClick={rutaFormulario}>Formulario</button>
        <button className="text-black bg-yellow-700 m-3" onClick={rutaCrearEvento}>Crear Evento</button>
        <button className="text-black bg-yellow-700 m-3" onClick={rutaLoginPage}>Login Page</button>

      </div>
      <br />
      <br />
      {/*titulo y encabezado*/}
      <div>
        <div className="flex justify-center">
          <h1 className="text-red-600 mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Knect</h1>
        </div>
        <div className="flex justify-center">
          <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">Nace la nueva forma de organizarte a ti y a tu grupo de personas</p>
          <br />
        </div>
        <div className="flex justify-center">
          <p>Con Knect, no te perderas los eventos que mas te gustan, crearlos e incuso encontrar nuevas experiencias</p>
        </div>
        <div className="flex justify-center">
          <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Leer mas</a>

        </div>
      </div>
      <br />
      <br />

      {/*carrusel de fotos*/}
      <Slider {...settings}>
        <div className="">
          <div className="flex justify-center flex-col md:flex-row items-center">
            <img
              src="https://images.pexels.com/photos/5386754/pexels-photo-5386754.jpeg"
              className="w-1/3 h-auto border-4 border-double border-blue-500"
              alt="Imagen 1" />
            <div className="">
              <p className="m-8">podras guardar todos los eventos en tu calendario, <br />  conocer todas las novedades y asistentes al evento</p>
            </div>
          </div>
        </div>

        <div>
          <div className="flex justify-center flex-col md:flex-row items-center m-4">
            <img
              src="https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg"
              className="w-1/3 h-auto border-4 border-double border-blue-500"
              alt="Imagen 1" />
            <div>
              <p className="m-8"> estaras en todos los eventos, <br /> podras comunicarte con tus amigos a traves de la aplicacion</p>
            </div>
          </div>
        </div>

        <div>
          <div className="flex justify-center flex-col md:flex-row items-center m-4">
            <img
              src="https://images.pexels.com/photos/2859169/pexels-photo-2859169.jpeg"
              className="w-1/3 h-auto border-4 border-double border-blue-500"
              alt="Imagen 1" />
            <div>
              <p className="m-8"> puedes añadir la direccion del evento <br /> y abrilo en un instante</p>
            </div>
            <br />
            <br />
            <br />
          </div>
        </div>
      </Slider>
      <br />
      <br />
      <br />
    </div>
  );
};