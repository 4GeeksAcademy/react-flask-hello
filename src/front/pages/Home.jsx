import React from "react";
import CurvedText from "../components/CurvedText"; // Importing the CurvedText component
import { Link } from "react-router-dom";
import dalmata from "/dalmata.png"; // Assuming this is the path to the image
import fotoPrincipal from "/fotoPrincipal.png"; // Assuming this is the path to the image


const Home = () => {
  return (
    <section className="landing-body container-fluid py-5">
      <div className="row align-items-center justify-content-center">

        {/* Producto destacado */}
        <div id="carouselExampleDark" className="carousel carousel-dark slide" data-bs-ride="carousel">
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
          </div>

          <div className="carousel-inner">
            <div className="carousel-item active" data-bs-interval="10000">
              <img src="/producto1.jpg" className="d-block w-75 mx-auto" alt="Producto 1" />
              <div className="carousel-caption d-none d-md-block">
                <h5>Producto 1</h5>
                <p>Descripción del producto destacado 1.</p>
              </div>
            </div>
            <div className="carousel-item" data-bs-interval="2000">
              <img src="/producto2.jpg" className="d-block w-75 mx-auto" alt="Producto 2" />
              <div className="carousel-caption d-none d-md-block">
                <h5>Producto 2</h5>
                <p>Descripción del producto destacado 2.</p>
              </div>
            </div>
            <div className="carousel-item">
              <img src="/producto3.jpg" className="d-block w-75 mx-auto" alt="Producto 3" />
              <div className="carousel-caption d-none d-md-block">
                <h5>Producto 3</h5>
                <p>Descripción del producto destacado 3.</p>
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


        <div className="col-md-5 text-center mb-4">
          <CurvedText />


          <img src="./fotoPrincipal.png"
            style={{
              width: "300px",     // ajusta el tamaño
              display: "block",   // necesario para centrar con margin
              margin: "0 auto",   // centra horizontalmente
            }}
          />
          <div className="shop-now mt-3">
            <button className="btn btn-outline-primary">Shop now</button>
          </div>
        </div>

        {/* Imagen decorativa */}
        <div className="col-md-3 mb-4 text-center img-fluid">
          <img src="./dalmata.png"
            style={{
              width: "300px",     // ajusta el tamaño
              display: "block",   // necesario para centrar con margin
              margin: "0 auto",   // centra horizontalmente
            }} />
        </div>
      </div>
    </section>
  );
};

export default Home;
