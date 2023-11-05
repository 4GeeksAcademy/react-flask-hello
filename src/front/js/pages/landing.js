import React, { useContext, useState, useEffect } from "react";
import "../../styles/landing.css";

import { Context } from "../store/appContext";

let titles = [
  "Hazlo por el y por ti",
  "Lavamos su pelo por ti",
  "Tu amigo incondicional",
  "Love and pets",
  "Somos un todo",
];
let descriptions = [
  "Discovering beauty in every step",
  "Grooming keeps pets looking great",
  "Regular exercise ensures happy pets",
  "Love and play daily together",
  "La amistad y el cuidado",
];

export const Landing = () => {
  const { store, actions } = useContext(Context);
  const [background, setBackground] = useState("background");
  const [title, setTitle] = useState(titles[0]);
  const [description, setDescription] = useState(descriptions[0]);

  const handleButtonClick = (index) => {
    setBackground(`background${index}`);
    setTitle(titles[index + 1]);
    setDescription(descriptions[index + 1]);
  };

  return (
    <div className={background} id="landing">
      <div className="landing-content">
        <div className="text-container">
          <h1 className="landing-title">{title}</h1>
          <h4 className="landing-description">{description}</h4>
        </div>
        <div className="buttons-container">
          <button
            className="btn-carrusel"
            onClick={() => handleButtonClick(1)}></button>
          <button
            className="btn-carrusel"
            onClick={() => handleButtonClick(2)}></button>
          <button
            className="btn-carrusel"
            onClick={() => handleButtonClick(3)}></button>
        </div>
      </div>
    </div>
  );
};
