// 1. Importar react como libreria
import React, { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext.js";
import PropTypes, { string } from "prop-types";
import { useNavigate } from 'react-router-dom';

// 2. Crear el componente JSX
export const SimpleCard = (props) => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const fechaString = props.fecha;
    const handleClick = async() => {
        // Navegar a la página deseada cuando se hace clic en el elemento
        await actions.obtenerOneEvento(props.id)
        navigate(`/description/${props.id}`);
      };
    // Convertir la cadena en un objeto de fecha
    const fechaObjeto = new Date(fechaString);

    // Formatear la fecha en el formato corto
    const fechaFormateada = fechaObjeto.toLocaleDateString();
    return(
        <div className="card d-flex flex-row border-0">
                <p onClick={handleClick}  style={{ cursor: 'pointer', color: 'black' }} onMouseEnter={(e) => { e.target.style.color = 'blue'; }}  onMouseLeave={(e) => { e.target.style.color = 'black'; }}className="card-title">{props.evento}</p>
        </div>
    );
}

SimpleCard.propTypes = { 
	key: PropTypes.number,
	evento: PropTypes.string,
    descripcion: PropTypes.string,
    ciudad: PropTypes.string,
    fecha: PropTypes.string
}