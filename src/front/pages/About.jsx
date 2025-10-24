import React from "react";
import imagenBack from "../assets/fondo-orquesta.jpg"

export const About = () => {
  return (
    <div className="signup-page-container">
      <div className="imagen-background">
        <img src={imagenBack} alt="imagen fondo" />
      </div>
      <div className="container my-5">
        <div className="text-center mb-5">
          <h1 className="fw-bold">Sobre Nosotros</h1>
          <p className="fs-5">Un viaje que recién comienza 🚀</p>
        </div>

        <div className="row justify-content-center">
          <div className="col-md-10">
            <div className="border-0 p-4">
              <p className="fs-5">
                Somos <strong>cuatro estudiantes apasionados</strong> que juntos trabajamos para crear este proyecto como parte de nuestro trabajo final del curso de programación en 4Geeks Academy.
              </p>
              <p className="fs-5">
                Este proyecto representa más que una entrega académica, es el <strong>inicio de nuestro camino profesional en el mundo del desarrollo web</strong>, y la primera piedra de algo mucho más grande.
              </p>
              <p className="fs-5">
                Soñamos con que algún día, cada uno de nosotros se convierta en un <strong>gran programador</strong>, construyendo tecnología que inspire, ayude y transforme el mundo.
              </p>
              <p className="fs-5">
                ¡Gracias por formar parte de esta aventura con nosotros!
              </p>
              <p className="text-end mt-4 fst-italic">— Alexander, Alejandro, Thaner y Sebastian 💻✨</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};