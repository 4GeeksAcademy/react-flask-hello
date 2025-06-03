import React from "react";
import {Link} from "react-router-dom";
import "../../styles/EventosButton.css";

function EventosButton(){
    return (
        <button className="eventos-button">
        <Link to= "/Eventos" className="eventos-button-link"> 
        <span className="eventos-icon"> 🏆  </span> 
        <div className="eventos-text"> 
            <span> Ver eventos </span>
            <span className="eventos-subtext"> Disponibles </span>
             </div>
        
        </Link>
        </button>
    )
}
export default EventosButton;
