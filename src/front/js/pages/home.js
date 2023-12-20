import React, { useContext } from "react";
import { Context } from "../store/appContext";
import easyJobUrl from "../../img/Easy-Job.jpg";
import worker from "../../img/worker.png";
import "../../styles/home.css";
import Carrousel from "../component/carrousel.js";
import { Link } from "react-router-dom";
import ProfesionCard from "../component/ProfesionCard.js";

export const Home = () => {
  const { store, actions } = useContext(Context);

  const handleButtonClick1 = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    console.log("Botón 1 clickeado");
    // Add logic for the first button click
  };

  return (
    <>
      <div
        className="container"
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid #616161",
          borderRadius: "35px",
          
          margin: "30px auto 0",
          padding: "40px",
          backgroundColor: "white", // Agregado para establecer el fondo gris
          boxShadow: "0 0 45px #546",
        }}
      >
        <div className="col-md-8">
          <div className="custom-container">
            {/* Existing content in custom-container */}
            <h1
              style={{
                fontFamily: "Calibri",
                fontSize: "30px",
                color: "#001F3F",
                marginTop: "1px",
                paddingBottom: "1px",
                textAlign: "center",
                transition:
                  "background-color 0.1s ease transform 0.3s ease-in-out",
              }}
            >
              <strong>
                TU PLATAFORMA TODO EN UNO PARA SERVICIOS DEL HOGAR!
              </strong>
            </h1>
            <p
              style={{
                color: "#616161",
                fontStyle: "normal",
                fontFamily: "Calibri",
                fontSize: "24px",
                marginBottom: "50px",
              }}
              className="mx-5 text-center"
            >
              Busca de forma sencilla y conecta con Prestadores para encontrar
              una solución a tu medida para tu casa o empresa. Siempre tendrás
              un buen contacto en EasyJob.
            </p>

            <div
              className="button"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Link
                to="/Registro"
                className="d-flex justify-content-center align-items-center"
                style={{ textDecoration: "none" }}
              >
                {/* Button styling and logic */}
                <button
                  style={{
                    display: "flex",
                    color: "#333333",
                    background: "#dd9e26",
                    borderRadius: "30px",
                    justifyContent: "center",
                    marginTop: "15%",
                    padding: "15px",
                    width: "250px",
                    textAlign: "center",
                    marginTop: "5px",
                    fontFamily: "Calibri, sans-serif", // Reemplaza "TuFuentePreferida" con la fuente que desees usar
                    fontSize: "20px", // Cambiado a "20px" para aumentar el tamaño de la letra
                  }}
                >
                  <h5 style={{ margin: "auto", fontWeight: "bold" }}>
                    Regístrate aquí
                  </h5>
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-4 text-center mt-3">
          {/* Image styling */}
          <img
            className="img-fluid"
            style={{
              marginTop: "15px",
              borderRadius: "70px",
              boxShadow: "0 0 100px #93C0C6E2",
              maxWidth: "300px",
              width: "100%",
              textAlign: "center",
              transition:
                "background-color 0.1s ease transform 0.3s ease-in-out",
              marginRight: "20px",
              
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
            src={worker}
            alt="Easy Job"
          />
        </div>
      </div>

      <div className="container">
        <Carrousel />
      </div>

      <div className="container2">
        <h2
          style={{
            fontFamily: "Calibri",
            color: "#001F3F",
            marginTop: "25%",
            paddingBottom: "2%",
            textAlign: "center",
            transition: "background-color 0.1s ease transform 0.3s ease-in-out",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid #616161",
            borderRadius: "35px",
            background: "#D1EFEA",
            padding: "40px",
            boxShadow: "0 0 70px #000",
            backgroundSize: "cover", // Puedes ajustar "cover" según tus necesidades
            backgroundPosition: "center", // Ajusta la posición del fondo si es necesario
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <strong>SOBRE NOSOTROS</strong>
        </h2>

        <div className="container  mt-lg-5">
          <div className="row">
            <div className="col-md-6">
              <div
                className="card mb-4"
                style={{
                  borderRadius: "30px",
                  transition: "transform 0.3s ease-in-out",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.transform = "scale(1.05)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                <img
                  src="https://thumbs.dreamstime.com/b/electricista-30694651.jpg"
                  className="card-img-top"
                  alt="imagen"
                />
                <div className="card-body">
                  <p
                    className="card-text mt-5px"
                    style={{
                      textAlign: "justify",
                      fontWeight: "bold",
                      color: "rgba(0, 0, 0, 0.8)",
                      fontFamily: "Calibri",
                      fontSize: "18px",
                    }}
                  >
                    Somos una plataforma dedicada a conectar con Técnicos en
                    Oficios tales como: Carpintería, Electricidad, Gasfitería,
                    Pintura y Aseo. Damos solución a problemas de tu hogar o
                    empresa. Compara perfiles y selecciona al experto que mejor
                    se adapte a tus necesidades.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div
                className="card mb-4"
                style={{
                  borderRadius: "30px",
                  transition: "transform 0.3s ease-in-out",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.transform = "scale(1.05)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                <img
                  src="https://thumbs.dreamstime.com/b/electricista-89764045.jpg"
                  className="card-img-top"
                  alt="imagen"
                />
                <div className="card-body">
                  <p
                    className="card-text mt-5px"
                    style={{
                      textAlign: "justify",
                      fontWeight: "bold",
                      color: "rgba(0, 0, 0, 0.8)",
                      fontFamily: "Calibri",
                      fontSize: "18px",
                    }}
                  >
                    Nuestra misión es facilitar la búsqueda de técnicos o
                    trabajador(es) capacitados y confiables en los Oficios que
                    ofrecemos. Como prestador tendrás un entorno seguro y fácil
                    de usar, podrás publicar tu Oficio (trabajo) de manera fácil
                    y rápida.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div
                className="card mb-4"
                style={{
                  borderRadius: "30px",
                  transition: "transform 0.3s ease-in-out",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.transform = "scale(1.05)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                <img
                  src="https://i.pinimg.com/564x/d0/dc/36/d0dc36c015e58259b644b71244a8a0b3.jpg"
                  className="card-img-top"
                  alt="imagen"
                />
                <div className="card-body">
                  <p
                    className="card-text mt-5px"
                    style={{
                      textAlign: "justify",
                      fontWeight: "bold",
                      color: "rgba(0, 0, 0, 0.8)",
                      fontFamily: "Calibri",
                      fontSize: "18px",
                    }}
                  >
                    Easy Jobs es tu aliado para encontrar la solución perfecta
                    que se adapta a tus necesidades. Limpiezas, Mantenciones,
                    Reparaciones y Renovaciones. Nuestros prestadores están
                    listos para ayudarte, conécta fácil y seguro, aquí en Easy
                    Job.{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* anexa las tarjetas de profesiones */}
      </div>
    </>
  );
};
