import React from "react";
import casaImg from "../../img/casa-1.jpg";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export const CardFeedVen = (props) => {
    return (
        <div style={{width: "18rem"}}>
            <img src={casaImg} className="card-img-top" alt="..."/>
            <div className="azul-oscuro mb-5">
                <div className="d-flex justify-content-between">
                    <strong className="card-title">{props.ubicacion}</strong>
                    <p className="card-text">US$ {props.precio}</p>
                </div>
                <div className="d-flex justify-content-between px-1">
                    <i className="fa-regular fa-heart"></i>
                    <Link to={"/detailsventas/" + props.id}><i className="fa-solid fa-plus"></i></Link>
                </div>
            </div>
        </div>
    );
};

CardFeedVen.propTypes = {
    
    ubicacion: PropTypes.string,
    precio: PropTypes.number,
    id: PropTypes.number

};