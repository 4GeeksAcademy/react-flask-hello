import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const CardPeliculas = ({ nombrePelicula, generoPelicula }) => {
    const { actions } = useContext(Context);
    const [paginaActual, setPaginaActual] = useState(1);
    const totalPaginas = 6; // Cambiar esto según el número total de páginas
    const cambiarPagina = (nuevaPagina) => {
        setPaginaActual(nuevaPagina);
    };

    const generarBotones = () => {
        const botones = [];
        for (let i = 1; i <= totalPaginas; i++) {
            const numeroClase = paginaActual === i ? "numero-de-color" : "numero-normal";
            botones.push(
                <button
                    key={i}
                    onClick={() => cambiarPagina(i)}
                    className={`btn btn-no-border btn-con-espacio btn-fondo-contenedor ${paginaActual === i ? "pagina-actual" : ""
                        }`}
                >
                    <span className={numeroClase}>{i}</span>
                </button>
            );
        }
        return botones;
    };

    return (
        <>
            <div className="card-title text-light" style={{ paddingLeft: "8%", fontFamily: "Poppins, Work Sans" }}>
                <h3>Explora Todas Las Peliculas Que Tenemos Para Vos</h3>
            </div>
            <div className="container-fliud d-flex" style={{ backgroundColor: "#3B3B3B" }}>
                <div className="row justify-content-evenly">
                    <div className="col-md-4 mb-4">
                        <div className="card text-light rounded-lg" style={{ width: "18rem", marginTop:"30%", backgroundColor: "#2B2B2B", borderRadius: "15px", marginLeft: "20px" }}>

                            {/* Contenido de la carta */}
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
            <div className="container-fliud d-flex" style={{ backgroundColor: "#3B3B3B" }}>
                <div className="row justify-content-evenly">
                    <div className="col-md-4 mb-4">
                        <div className="card text-light rounded-lg" style={{ width: "18rem", backgroundColor: "#2B2B2B", borderRadius: "15px", marginLeft: "20px" }}>
                            {/* Contenido de la tarjeta */}
                            <img
                                src={"https://musicart.xboxlive.com/7/99ce1100-0000-0000-0000-000000000002/504/image.jpg?w=1920&h=1080" /*+ (id) + ".jpg"*/}
                                className="card-img-top" style={{ borderTopLeftRadius: "15px", borderTopRightRadius: "15px" }}
                                alt="..."
                            />
                            <div className="card-body">
                                <h5 className="card-title text-light" style={{ fontFamily: "Poppins, Work Sans" }}> Nombre {nombrePelicula}</h5>
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
            {/* Contador de páginas */}
            <div className="d-flex justify-content-center mt-3">
                {generarBotones()}
            </div>
        </>
    );
};
