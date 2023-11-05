import React from "react";
import casaImg from "../../img/casa-1.jpg";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import diego from "../../img/diego.jpg";


export const Comentarios = (props) => {

return(
<div className="d-flex "><img src={diego} style={{ width: "150px", height: "50px" }} className="rounded-circle me-3" alt="..." /> <p>Un lugar increíble, Armando estuvo pendiente de nosotros para que estemos como en Casa.</p></div>
)
}




Comentarios.propTypes = {
    
    ubicacion: PropTypes.string,
    precio: PropTypes.number,

};