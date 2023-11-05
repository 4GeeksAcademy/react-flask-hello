import React from "react";
import { Link } from "react-router-dom";

//import { Carta } from "./carta"


export const Categorias = () => {
  return (
    <div className="container">
      <div className="mt-5 mb-5">
        <h1><b>Categorías</b></h1>
      </div>
      <div className="row row-cols-3 g-4">
        <div className="col">
          <div className="card shadow-sm p-3 mb-5 bg-white rounded">
            <img src="https://placeholder.pics/svg/500x350/DEDEDE/555555/novelas" className="card-img-top" alt="Hollywood Sign on The Hill" />
            <div className="card-body">
              <h5 className="card-title">Novelas</h5>
              <p className="card-text">
              Son textos narrativos que hablan de historias ficticias que el autor ha creado y que sirven únicamente para el entretenimiento del lector. Tienen que ser libros fáciles de leer y que capten la atención que quien está al otro lado. Normalmente presentan historias ubicadas en un lugar y en una época que les pasan a ciertos personajes ficticios. Puede ser que el libro cuente con una sola trama o que disponga de varias (una principal que lleve el hilo de la historia y otras secundarias que lo complementen).
              </p>
              <a href="#" className="btn btn-dark">Ver categoría</a>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card shadow-sm p-3 mb-5 bg-white rounded">
            <img src="https://placeholder.pics/svg/500x350/DEDEDE/555555/biograficos" className="card-img-top" alt="Palm Springs Road" />
            <div className="card-body">
              <h5 className="card-title">Biograficos</h5>
              <p className="card-text">
              Son libros que narran la vida de una persona real dando datos exactos y concretos y contando los hechos más remarcables que le sucedieron. La información de la que disponen es muy fiable y está contrastada con varias fuentes. Normalmente están escritos en orden cronológico y narran la vida de personas importantes que han aportado algo relevante a la sociedad: actores, músicos, científicos, presidentes, etc.
              </p>
              <a href="#" className="btn btn-dark">Ver categoría</a>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card shadow-sm p-3 mb-5 bg-white rounded">
            <img src="https://placeholder.pics/svg/500x350/DEDEDE/555555/educativos" className="card-img-top" alt="Los Angeles Skyscrapers" />
            <div className="card-body">
              <h5 className="card-title">Educativos</h5>
              <p className="card-text">Los libros de texto son otro de los tipos de libros más comunes y son los que se suelen usar en las escuelas. Sirven para que el profesor pueda tener una guía para dar sus clases de forma ordenada y que los alumnos profundicen más en el aprendizaje de cierto tema. Pueden ser de diferentes asignaturas como por ejemplo de matemáticas, de lengua, de ciencias, etc. Y sirve para que el alumno refuerce las enseñanzas impartidas por un profesor.</p>
              <a href="#" className="btn btn-dark">Ver categoría</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}