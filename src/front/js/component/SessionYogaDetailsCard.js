import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { withRouter, useParams } from "react-router-dom";
import { Context } from "../store/appContext.js";
import { Link } from "react-router-dom";
import "../../styles/singleDetails.css";


export const SessionYogaDetailsCard = props => {
    const [state, setState] = useState({
        //initialize state here
    });

    const { store, actions } = useContext(Context);

    const params = useParams();
    // console.log(params)

    const [styleStartNow, setStyleStartNow] = useState("btn-light");
    // boton Dive into the lesson now! que cuando haya hover se ponga el texto blanco
    const handleHoverInButton = () => {
        setStyleStartNow("btn-outline-white text-dark");
    }
    // al quitar el hover vuelva al texto en azul
    const handleHoverOutButton = () => {
        setStyleStartNow("btn-light");
    };

    console.log(props.name)

    return (
        <div className=" d-flex justify-content-center mt-5 pt-md-5 pt-sm-2 ms-md-4 me-md-4 me-sm-2 " >
            <div className="row g-0">
                <div className="col-md-5 col-sm-12 d-flex flex-column justify-content-center align-items-start py-3 ms-md-5 ms-sm-4 ps-md-3">
                    <div className="col-md-6 col-sm-6 d-flex align-items-center">
                        <h6 className="fs-1 mb-1 poiret-one-regular text-wrap">{props.name}</h6>
                    </div>
                    <div className="col-12 align-items-start mt-2">
                        <h6 className="fw-bold fs-6 fst-italic">{props.subtitle}</h6>
                    </div>
                    <hr className="mb-3 bg-secondary mt-0" />
                    <div className="col-md-12 col-sm-12 d-flex mb-3">
                        <h6 className="lh-base text-wrap">{props.description}</h6>
                    </div>
                    <div className="col-12 d-flex flex-row">
                        <h6 className="">Teacher : </h6>
                        <h6 className="ms-2"> {props.instructor}</h6>
                    </div>
                    <div className="col-12 d-flex flex-row">
                        <h6 className="">Duration : </h6>
                        <h6 className="ms-2">{props.duration}</h6>
                    </div>
                    <div className="col-12 d-flex flex-row">
                        <h6 className="">Asana Focus : </h6>
                        <h6 className="ms-2">{props.asana_focus}</h6>
                    </div>
                    <div className="col-12 d-flex flex-row">
                        <h6 className="">Level : </h6>
                        <h6 className="ms-2">{props.level}</h6>
                    </div>
                    <div className="d-flex flex-row gap-5">
                        <button type="button" className={`Name="btn btn-sm p-1 mt-4 btn-outline-ligth bg-transparent border-none d-flex align-items-start `} onMouseEnter={handleHoverInButton} onMouseLeave={handleHoverOutButton}>
                            <Link className={`btn text-dark `} to="/">
                                Dive into the lesson now!
                            </Link>
                        </button>
                        <button type="button" className={`Name="btn btn-sm p-1 mt-4 btn-outline-light border-none bg-transparent d-flex align-items-start `} onMouseEnter={handleHoverInButton} onMouseLeave={handleHoverOutButton}>
                            <Link className={`btn text-dark `} to="/jivamutki">
                                Back
                            </Link>
                        </button>
                    </div>
                </div>
                <div className="col-md-6 col-sm-12 d-flex flex-column justify-content-md-center justify-content-sm-center align-items-md-end align-items-sm-center ">
                    <img className="col-11 img-fluid w-75 rounded" src={props.url_imagen}></img>
                    {/* <iframe
                    width="560"  // Ancho del reproductor de video
                    height="315" // Altura del reproductor de video
                    src={props.link} // Reemplaza 'TU_VIDEO_ID' con el ID de tu video de YouTube
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                    ></iframe> */}
                        
                </div>

            </div>
        </div>
    );
};


SessionYogaDetailsCard.propTypes = {
	match: PropTypes.object,
    id: PropTypes.number,
    name: PropTypes.string,
    subtitle: PropTypes.string,
    description: PropTypes.string,
	instructor: PropTypes.string,
	level: PropTypes.string,
	asana_focus: PropTypes.string,
    link: PropTypes.string,
	url_imagen: PropTypes.string,
    duration: PropTypes.string,


};
