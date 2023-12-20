import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/home.css";
import easyJobUrl1 from "../../img/electricista.jpg";
import easyJobUrl2 from "../../img/gasfiteria.jpg";
import easyJobUrl3 from "../../img/carpintero.jpg";
import easyJobUrl4 from "../../img/aseo.jpg";
import easyJobUrl5 from "../../img/maestro-pintor.jpg";

export const Carrousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex < 2 ? prevIndex + 1 : 2));
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
  };

  return (
    <div className="carousel-oficios mt-30">
      <h2
        style={{
          fontFamily: "Calibri",
          color: "#001F3F",
          marginTop: "5%",
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
          opacity: "0.9",
          padding: "40px",
          backgroundColor: " #93C0C6E2",
          boxShadow: "0 0 70px #000",
          backgroundSize: "cover", // Puedes ajustar "cover" según tus necesidades
          backgroundPosition: "center", // Ajusta la posición del fondo si es necesario
        }}
        onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
        onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        <strong>PRESTADORES</strong>
      </h2>
      <div className="carousel-container container-fluid">
        <div
          className="carousel-wrapper"
          style={{
            display: "flex",
            fontSize: "32px",
            // transition: "transform 0.2s ease-in-out",
            // transform: `translateX(-${currentIndex * 25}%)`,
            // padding: "10px",
          }}
        >
          {" "}
          {/* <Link to="/buscador"> */}
          <button
            style={{
              marginRight: "-0.1%",
              backgroundColor: "transparent",
              border: "1px solid transparent", // Grosor del borde bajo y transparente
              borderRadius: "35px",
              padding: "5px 5px",
              fontSize: "16px",
              cursor: "pointer",
              transition:
                "background-color 0.1s ease transform 0.3s ease-in-out",
                fontFamily: "Calibri"
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <div className="carousel-box" style={{ background: "white" }}>
              <h2 style={{ fontWeight: "bold" }}>Electricista</h2>
              <img
                className="img-fluid"
                style={{ minWidth: "100px", width: "100%" }}
                src={easyJobUrl1}
                alt="Electricista"
              />
            </div>
          </button>
          {/* </Link> */}
          <button
            style={{
              marginRight: "-0.1%",
              backgroundColor: "transparent",
              border: "1px solid transparent", // Grosor del borde bajo y transparente
              borderRadius: "35px",
              padding: "5px 5px",
              fontSize: "16px",
              cursor: "pointer",
              transition:
                "background-color 0.1s ease transform 0.3s ease-in-out",
                fontFamily: "Calibri"
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <div className="carousel-box" style={{ background: "white" }}>
              <h2 style={{ fontWeight: "bold" }}>Carpintero</h2>
              <img
                className="img-fluid"
                style={{ minWidth: "100px", width: "100%" }}
                src={easyJobUrl2}
                alt="Carpintero"
              />
            </div>
          </button>
          <button
            style={{
              marginRight: "-0.1%",
              backgroundColor: "transparent",
              border: "1px solid transparent", // Grosor del borde bajo y transparente
              borderRadius: "35px",
              padding: "5px 5px",
              fontSize: "16px",
              cursor: "pointer",
              transition:
                "background-color 0.1s ease transform 0.3s ease-in-out",
                fontFamily: "Calibri"
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <div className="carousel-box" style={{ background: "white" }}>
              <h2 style={{ fontWeight: "bold" }}>Aseo</h2>
              <img
                className="img-fluid"
                style={{ minWidth: "100px", width: "100%" }}
                src={easyJobUrl3}
                alt="Aseo"
              />
            </div>
          </button>
          <button
            style={{
              marginRight: "-0.1%",
              backgroundColor: "transparent",
              border: "1px solid transparent", // Grosore del borde bajo y transparente
              borderRadius: "35px",
              padding: "5px 5px",
              fontSize: "16px",
              cursor: "pointer",
              transition:
                "background-color 0.1s ease transform 0.3s ease-in-out",
                fontFamily: "Calibri"
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <div className="carousel-box" style={{ background: "white" }}>
              <h2 style={{ fontWeight: "bold" }}>Gasfitería</h2>
              <img
                className="img-fluid"
                style={{ minWidth: "100px", width: "100%" }}
                src={easyJobUrl4}
                alt="Gasfitería"
              />
            </div>
          </button>
          <button
            style={{
              marginRight: "-0.1%",
              backgroundColor: "transparent",
              border: "1px solid transparent", // Groso del borde bajo y transparente
              borderRadius: "35px",
              padding: "5px 5px",
              fontSize: "16px",
              cursor: "pointer",
              transition:
                "background-color 0.1s ease transform 0.3s ease-in-out",
                fontFamily: "Calibri"
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <div className="carousel-box" style={{ background: "white" }}>
              <h2 style={{ fontWeight: "bold" }}>Pintor</h2>

              <img
                className="img-fluid"
                style={{ minWidth: "100px", width: "100%" }}
                src={easyJobUrl5}
                alt="Pintor"
              />
            </div>
          </button>
        </div>
      </div>
      

      {/* <div className="carousel-controls">
        <div className="arrow" onClick={handlePrev}>
          &#9664;
        </div>
        <div className="arrow" onClick={handleNext}>
          &#9654;
        </div>
      </div> */}
    </div>
  );
};
export default Carrousel;
