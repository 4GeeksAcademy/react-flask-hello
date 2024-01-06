import React, { Component } from "react";

export const Card = ({ title, overview, poster_path, release_date }) => (
    <div className="card" style={{ width: "18rem" }}>
      <img src={`https://image.tmdb.org/t/p/w500/${poster_path}`} className="card-img-top" alt={title} />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{overview}</p>
        <p className="card-text">Estreno: {release_date}</p>
      </div>
    </div>
  );