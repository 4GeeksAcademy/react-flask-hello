import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export const CardFeedAlq = (props) => {
    return (
        <div style={{ width: "18rem" }}>
            <img src="https://www.decorablog.com/wp-content/2011/06/Casa-lujosa-Singapur-3.jpg" className="card-img-top" alt="..." />
            <div className="azul-oscuro mb-5">
                <div className="d-flex justify-content-between">
                    <strong className="card-title">{props.ubicacion}</strong>
                    <p className="card-text">US$ {props.precio}</p>
                </div>
                <div className="d-flex justify-content-between px-1">
                    <i className="fa-regular fa-heart"></i>
                    <Link to={"/details/" + props.id}><i className="fa-solid fa-plus"></i></Link>
                </div>
            </div>
        </div>
    );
};

CardFeedAlq.propTypes = {
    
    ubicacion: PropTypes.string,
    precio: PropTypes.number,
    id:PropTypes.number
};