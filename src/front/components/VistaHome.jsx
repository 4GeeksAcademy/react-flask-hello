import { Link } from "react-router-dom";
import { Login } from "./Login.jsx";
import { CarruselHome } from "./CarruselHome.jsx";
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export const VistaHome = () => {

  const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
      };

    return (
    <div>
      <br />
      {/*titulo y encabezado*/}
      <div>
        <div className="flex justify-center">
          <h1 className="text-red-500 mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Knect</h1>
        </div>
        <div className="flex justify-center">
          <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">nace la nueva forma de organizarte a ti y a tu grupo de personas</p>
          <br />
        </div>
        <div className="flex justify-center">
          <p>con Knect, no te perderas los eventos que mas te gustan, crearlos e incuso encontrar nuevas experiencias</p>
        </div>
         <div className="flex justify-center">
          <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Leer mas</a>
        </div>
      </div>
        {/*carrusel de fotos*/}
                <Slider {...settings}>
          <div >
            <img 
            src="https://images.pexels.com/photos/5386754/pexels-photo-5386754.jpeg"
            class="left-1/2 top-1/2 block -translate-x-1/2 -translate-y-1/2"
            alt="Imagen 1" />
          </div>
          <div>
            <img src="https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg" alt="Imagen 2" />
          </div>
          <div>
            <img src="https://images.pexels.com/photos/1974927/pexels-photo-1974927.jpeg" alt="Imagen 3" />
          </div>
        </Slider>
        
    </div>
    );
};