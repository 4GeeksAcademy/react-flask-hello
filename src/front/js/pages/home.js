import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link } from "react-router-dom";

export const Home = ({ nombrePelicula }) => {
  const { actions } = useContext(Context);

  const [tiempoInicial, setTiempoInicial] = useState({
    horas: 5,
    minutos: 30,
    segundos: 0,
  });
  const [tiempo, setTiempo] = useState(tiempoInicial);

  useEffect(() => {
    const totalSegundosInicial =
      tiempoInicial.horas * 3600 +
      tiempoInicial.minutos * 60 +
      tiempoInicial.segundos;
    let segundosRestantes = totalSegundosInicial;

    const temporizador = setInterval(() => {
      if (segundosRestantes > 0) {
        setTiempo((prevTiempo) => {
          const horas = Math.floor(segundosRestantes / 3600);
          const minutos = Math.floor((segundosRestantes % 3600) / 60);
          const segundos = segundosRestantes % 60;

          segundosRestantes -= 1;

          return {
            horas,
            minutos,
            segundos,
          };
        });
      } else {
        clearInterval(temporizador); // Detener el temporizador cuando llega a cero
      }
    }, 1000);

    return () => clearInterval(temporizador);
  }, [tiempoInicial]);

  return (
    <div className="main-container" style={{ minHeight: "100vh", paddingBottom: "10%" }}>
      <div className="text-center">
        <div style={{ position: "relative" }}>
          <img
            style={{ width: "100%", height: "500px" }}
            src="https://s3.amazonaws.com/dam.smashmexico.com.mx/wp-content/uploads/2023/11/los-juegos-del-hambre-como-ver-en-orden-cronologico.jpg"
            className="img-fluid mx-auto my-auto"
            alt="Descripción de la imagen"
          />

          {/* Temporizador */}
          <div className="timer-container" style={{ position: "absolute", right: "3%" }}>
            <div className="timer" style={{ marginBottom: "100px" }}>
              <div className="timer-header" style={{ textAlign: "left", paddingBottom: "5px" }}>
                <span style={{ fontSize: "14px" }}>Finaliza en:</span>
              </div>
              <div className="timer-content">
                <span>{tiempo.horas.toString().padStart(2, "0")}
                  <p style={{ fontSize: "14px" }}>Horas</p>
                </span>
                <span style={{ paddingLeft: "5px" }}>{tiempo.minutos.toString().padStart(2, "0")}
                  <p style={{ fontSize: "14px" }}>Minutos</p>
                </span>
                <span>{tiempo.segundos.toString().padStart(2, "0")}
                  <p style={{ fontSize: "14px" }}>Segundos</p>
                </span>
              </div>
            </div>
          </div>

          {/* Carta Película de la Semana */}
          <div className="card" style={{ width: "18rem", position: "absolute", right: "15%", borderRadius: "15px", marginTop: "1%", backgroundColor: "#3B3B3B" }}>
            <img className="card-img-top"
              style={{ borderTopLeftRadius: "15px", borderTopRightRadius: "15px" }}
              src="https://musicart.xboxlive.com/7/99ce1100-0000-0000-0000-000000000002/504/image.jpg?w=1920&h=1080" alt="Card image cap" />
            <div className="card-body">
            </div>
          </div>

          <p style={{ fontFamily: "Poppins, Work Sans", fontSize: "18px", margin: "10px 0", textAlign: "center", color: "white", position: "absolute", bottom: "200px", left: "10%" }}>
            Mirala ahora y obtén 5 puntos!
          </p>

          {/* Botón Ver ahora */}
          <button
            className="boton btn btn-lg btn-custom border-0 mt-3"
            style={{ position: "absolute", bottom: "130px", left: "13%", transform: "translateX(-50%)", display: "flex", alignItems: "center", padding: "15px 20px" }}
          >
            <span style={{ fontSize: "14px", color: "#A259FF" }}>
              <i className="fa-regular fa-eye"></i>
            </span>
            <span className="text-center" style={{ fontSize: "14px", marginLeft: "5px" }}>Ver ahora</span>
          </button>

        </div>
      </div>
      <div className="container-fluid" style={{ fontFamily: "Poppins, Work Sans", paddingTop: "20px" }}>

        <h1 className="text-light" style={{ marginLeft: "10%" }}>¿No Sabes </h1>
        <h1 className="text-light d-flex" style={{ marginLeft: "10%" }}>Que Ver?</h1>
        <h5 className="text-light" style={{ fontSize: "15px", marginLeft: "10%", marginBottom: "50px" }}>Deja que nosotros elijamos por ti.</h5>

        {/* Botón2 Ver ahora */}
        <button
          className="boton2 btn btn-lg btn-custom border-0 mt-3" onClick={() => actions.getRandomMovie()}
          style={{
            marginBottom: "50px",
            marginLeft: "10%",
            display: "flex",
            alignItems: "center",
            padding: "15px 20px",
            backgroundColor: "#A259FF",
          }}
        >
          <span style={{ fontSize: "12px", color: "white" }}>
            <i className="fa-solid fa-rocket"></i>
          </span>
          <div style={{ display: "flex", flexDirection: "column", marginLeft: "5px" }}>
            <span className="text-center text-light" style={{ fontSize: "14px" }}>Ver En</span>
            <span className="text-center text-light" style={{ fontSize: "14px" }}>Aleatorio</span>
          </div>
        </button>

        <div className="d-flex text-light" style={{ marginLeft: "10%" }}>
          <h3 style={{ fontSize: "20px", marginRight: "50px" }}>240k+<p>Visitas</p></h3>
          <h3 style={{ fontSize: "20px", marginRight: "50px" }}>150k+<p>Me Gusta</p></h3>
          <h3 style={{ fontSize: "20px" }}>240k+<p>Comentarios</p></h3>
        </div>
      </div>

      <div className="mas-visto">
        <h3 className="text-light">Explora lo más visto</h3>
        <h5 className="text-light" style={{ fontSize: "15px", marginBottom: "50px" }}>Mantente Actualizado</h5>

        {/* Cards Películas */}
        <div className="container">
          <div className="col m-4 d-flex">
            <div className="card h-100" style={{ width: "18rem", position: "relative", borderRadius: "15px", backgroundColor: "#3B3B3B" }}>
              <img
                src={"https://musicart.xboxlive.com/7/99ce1100-0000-0000-0000-000000000002/504/image.jpg?w=1920&h=1080" /*+ (id) + ".jpg"*/}
                className="card-img-top" style={{ borderTopLeftRadius: "15px", borderTopRightRadius: "15px" }}
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title text-light" style={{ fontFamily: "Poppins, Work Sans" }}> Nombre {nombrePelicula} </h5>
                <p className="card-text text-light" style={{ fontFamily: "Poppins, Work Sans" }}>Género </p>

                <div className="col-md d-flex justify-content-end">
                  <Link to={"/pagesPeliculas/" /*+ id*/} className="btn btn-dark btn-no-border mt-3" style={{ marginRight: "40%", width: "36px" }} title="Más información">
                    <i class="fa-solid fa-arrow-down"></i>
                  </Link>

                  <button className="btn btn-custom-purple border border-0 mt-3" style={{ marginRight: "3%" }}>
                    + Mi Lista
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
