import React from "react";
import { Link } from "react-router-dom";

export const Banner = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <div className="mt-5">
            <h1><b>Bienvenido a BooksMarket</b></h1>
            <p><b>Descubre los mejores libros y al mejor precio...</b></p>
          </div>
        </div>
        <div className="col p-2 mt-5">
          <img src="https://insights.gostudent.org/hubfs/Insights_GoStudent_Blog_Images/world-book-day%20%282%29.jpg" className="card-img-top shadow-sm p-3 mb-5 bg-white rounded" alt="..." />
        </div>
      </div>
    </div>
  )
}