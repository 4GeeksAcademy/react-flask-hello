import React from "react";
import "../../styles/nutricion.css";

const CardPlan = ({ tittle, img, parrafo }) => {
  return (
    <div className="card tarjetaNp mb-4">
      <img src={img} className="card-img-top" alt={tittle} />
      <div className="card-body text-center">
        <h5 className="card-title">{tittle}</h5>
        <p className="card-text">{parrafo}</p>
      </div>
    </div>
  );
};

export default CardPlan;
