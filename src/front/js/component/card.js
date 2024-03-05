// 1. Importar react como libreria
import React, { useEffect, useContext, useState } from "react";
import PropTypes, { string } from "prop-types";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useNavigate } from 'react-router-dom';

// 2. Crear el componente JSX

export const Card = (props) => {
    const { actions, store } = useContext(Context)
    const fechaString = props.fecha;
    const navigate = useNavigate();
    async function handleClick() {
        await actions.obtenerInfoUsuario()
        await actions.obtenerOneEvento(props.id)
        navigate(`/description/${props.id}`);
    }

    // Convertir la cadena en un objeto de fecha
    const fechaObjeto = new Date(fechaString);

    // Formatear la fecha en el formato corto
    const fechaFormateada = fechaObjeto.toLocaleDateString();
    return (
        <div className="card" >
            <img src={props.img} className="card-img-top" alt="..." style={{height:"200px"}}/>
            <div className="card-body" style={{ height: "100px" }}>
                <h5 className="card-title">{props.evento}</h5>
                <p className="card-text">{props.descripcion}</p>
            </div>
            <div className="card-body">
                <p className="card-text">Ciudad: {props.ciudad}</p>
                <p className="card-text">Fecha: {fechaFormateada}</p>
            </div>
            <button type="button" onClick={handleClick} className="bg-300 col-5 m-auto mb-3 rounded">
                See details!
            </button>
        </div>
    );
}

Card.propTypes = {
    id: PropTypes.number,
    evento: PropTypes.string,
    descripcion: PropTypes.string,
    ciudad: PropTypes.string,
    fecha: PropTypes.string,
    img: PropTypes.string
}
