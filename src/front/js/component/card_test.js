import React from "react";

export const Card_test = ({ movie }) => (
  <div className="card" style={{ width: "18rem" }}>
    <img src={movie.poster} className="card-img-top" alt={movie.name} />
    <div className="card-body">
      <h5 className="card-title">{movie.name}</h5>
      <p className="card-text">{movie.description}</p>
      <p className="card-text">Estreno: {movie.relese_date}</p>
    </div>
  </div>
);