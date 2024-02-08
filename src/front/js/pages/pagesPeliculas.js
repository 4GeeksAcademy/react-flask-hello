import React, { useEffect, useState } from "react";
import "../../styles/home.css";
import { useParams } from "react-router-dom";

export const PagesPeliculas = () => {

  const [detallePelicula, setDetallePelicula] = useState([]);
  {/*const params = useParams()
  
  function obtenerInfoDeUnaPelicula() {
    fetch("VA LA API DE PELICULAS" + params.theid)
      .then((res) => res.json())
      .then((data) => setDetallePersonaje(data))
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    obtenerInfoDeUnaPelicula()
  }, [])*/}

  return (
    <div className="main-container" style={{ minHeight: "100vh", paddingBottom: "10%" }}>
      <div className="text-center">
        <div style={{ position: "relative" }}>
          <img
            style={{ width: "100%", height: "500px" }}
            src="https://img2.rtve.es/v/2521219?w=1600&preview=1398070448414.jpg"
            className="img-fluid mx-auto my-auto"
            alt="Descripción de la imagen"
          />
          {/* VER

          <div style={{position: "absolute", paddingLeft:"60%" }}>
            <button
              className="boton btn btn-lg btn-custom border-0 mt-3 d-flex"
              style={{ position: "absolute", padding: "15px 20px", alignItems:"center"}}
            >
              <span style={{ fontSize: "14px", color: "#A259FF" }}>
                <i className="fa-regular fa-eye"></i> 
              </span>
              <span className="text-center" style={{fontSize: "14px", marginLeft: "5px" }}>Ver ahora</span>
            </button>*/}
        </div>
        <div className="container" style={{ backgroundColor: "transparent", height: "20%", width: "70%", display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          <h1 className="card-title" style={{ marginTop: "2%", color: "white", fontFamily: "Poppins, Work Sans" }}>NOMBRE PELÍCULA {detallePelicula.name}</h1>
          <span className="card-text" style={{ color: "#858584", fontSize: "small", fontFamily: "Body Text, Work Sans" }}>FECHA Sep 30, 2022{detallePelicula.fecha}</span>

          <p className="card-text" style={{ marginTop: "4%", marginBottom: "0" }}>
            Creadores o Productores
          </p>
          <p className="text-light" style={{ fontFamily: "Poppins, Work Sans" }}>{detallePelicula.creador} Orbitian</p>
          <p className="card-text" style={{ marginTop: "2%", marginBottom: "0" }}>Descripción</p>
          <p className="text-light" style={{ fontFamily: "Poppins, Work Sans" }}>{detallePelicula.descripcion} The Orbitians
            They live in a metal space machines, high up in the sky and only have one foot on Earth.
            These Orbitians are a peaceful race, but they have been at war with a group of invaders for many generations. The invaders are called Upside-Downs, because of their inverted bodies that live on the ground, yet do not know any other way to be. Upside-Downs believe that they will be able to win this war if they could only get an eye into Orbitian territory, so they've taken to make human beings their target.
          </p>
          <p className="card-text" style={{ marginTop: "2%", marginBottom: "0" }}>Plataformas</p>
          <p className="text-light" style={{ marginBottom: "1%", fontFamily: "Poppins, Work Sans" }}><i class="fa-solid fa-globe" style={{ color: "#858584", marginRight: "5px" }}></i> Netflix</p>
          <p className="text-light" style={{ marginBottom: "0" }}><i class="fa-solid fa-globe" style={{ color: "#858584", marginRight: "5px" }}></i> HBO max</p>
          <p className="card-text" style={{ marginTop: "2%", marginBottom: "1%", fontFamily: "Poppins, Work Sans" }}>Tags</p>
          <div className="d-flex">
            <div class="rounded-container" style={{ marginRight: "3%" }} >
              <div class="rounded-content text-light" style={{ fontFamily: "Poppins, Work Sans" }}>
                TERROR
              </div>
            </div>
            <div class="rounded-container" style={{ marginRight: "3%" }}>
              <div class="rounded-content text-light" style={{ fontFamily: "Poppins, Work Sans" }}>
                SUSPENSO
              </div>
            </div>
            <div class="rounded-container" style={{ marginRight: "3%" }}>
              <div class="rounded-content text-light" style={{ fontFamily: "Poppins, Work Sans" }}>
                TERROR
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    /*</div >*/
  );
}