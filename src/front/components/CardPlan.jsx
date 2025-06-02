import React from "react";
import { Navbar } from "../components/Navbar";

// index.css
import "../../styles/card.css";


const CardPlan = ({tittle, img, parrafo}) => {
  return (            <div className="card h-100 shadow">
              <div className="card-body tarjetaNp">
                <h5 className="card-title  mb-3">{tittle}</h5>
                <img src={img} className="card-img-top" alt="Plan pérdida de peso" />
                <p className="card-text mt-4 mb-3">
                  {parrafo}
                </p>
              </div>
            </div>)
}

  export default CardPlan;


