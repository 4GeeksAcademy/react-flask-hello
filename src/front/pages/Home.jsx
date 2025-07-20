import React from "react";
import CurvedText from "../components/CurvedText";
import { Link } from "react-router-dom";
import dalmata from "/dalmata.png";
import fotoPrincipal from "/fotoPrincipal.png";
import Carrusel1 from "/Carrusel1.png";
import Carrusel2 from "/Carrusel2.png";
import Carrusel3 from "/Carrusel3.png";

const Home = () => {
  return (
    <section className="landing-body container-fluid my-0 py-0">
      <div className="row align-items-center justify-content-center col-12">


        <div id="carouselExampleDark"
          style={{
            width: "300px",
            display: "block",
            margin: "0 auto",
          }}
          className="carousel carousel-dark slide col-4" data-bs-ride="carousel">
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
          </div>

          <div className="carousel-inner">
            <div className="carousel-item active" data-bs-interval="10000">
              <img src={Carrusel1} className="d-block w-75 mx-auto" alt="Producto 1" />
              <div className="carousel-caption d-none d-md-block">
              </div>
            </div>
            <div className="carousel-item" data-bs-interval="2000">
              <img src={Carrusel2} className="d-block w-75 mx-auto" alt="Producto 2" />
              <div className="carousel-caption d-none d-md-block">
              </div>
            </div>
            <div className="carousel-item">
              <img src={Carrusel3} className="d-block w-75 mx-auto" alt="Producto 3" />
              <div className="carousel-caption d-none d-md-block">
              </div>
            </div>
          </div>

          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>


        <div className="col-md-4 text-center">
          <CurvedText />


          <img src="./fotoPrincipal.png"
            style={{
              width: "300px",
              display: "block",
              margin: "0 auto",
            }}
          />
          <div className="shop-now mt-3">
            <button className="btn btn-outline-primary">Shop now</button>
          </div>
        </div>

        <div className="col-md-4 text-center img-fluid">
          <img src="./dalmata.png"
            style={{
              width: "300px",
              display: "block",
              margin: "0 auto",
            }} />
        </div>
      </div>
    </section>
  );
};

export default Home;
