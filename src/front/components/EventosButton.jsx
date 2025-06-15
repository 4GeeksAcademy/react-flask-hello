import React from "react";
import {Link} from "react-router-dom";
import "../../styles/EventosButton.css";

function EventosButton(){
    return (
        <div>
        <button className="eventos-button">
        <Link to= "/Eventos" className="eventos-button-link"> 
        <span className="eventos-icon"> 🏆  </span> 
        <div className="eventos-text"> 
            <span> Ver eventos </span>
            <span className="eventos-subtext"> Disponibles </span>
             </div>
        
        </Link>
        
        </button>

        <div className="contenedor-parrafo"><p>Eventos: Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae cum omnis eius, reiciendis, veritatis quae laudantium corrupti aliquam voluptatum accusantium cumque repudiandae nemo deserunt delectus exercitationem beatae, fugit esse dolor.</p></div>
        </div>
    )
}
export default EventosButton;
