import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

export const LibrosIntercambio = () => {
  const { store, actions } = useContext(Context);

  return (
    <div>
      <div className="container-fluid">
        <div className="text-center m-3 mt-5 mb-5">
          <h1>LIBROS PARA INTERCAMBIO</h1>
        </div>
        <div className="d-flex justify-content-evenly ">
          <div
            className="card shadow-sm p-3 mb-5 bg-white rounded"
            style={{ width: "300px", height: "400px" }}
          >
            <img
              src="https://placeholder.pics/svg/500x350/DEDEDE/555555/novelas"
              className="card-img-top"
              alt="Hollywood Sign on The Hill"
            />
            <div className="card-body">
              <h5 className="card-title">Novelas</h5>
              <p className="card-text">Son textos narrativos.</p>
              <a href="#" className="btn btn-dark">
                Ver categoría
              </a>
            </div>
          </div>
          <div
            className="card shadow-sm p-3 mb-5 bg-white rounded"
            style={{ width: "300px", height: "400px" }}
          >
            <img
              src="https://placeholder.pics/svg/500x350/DEDEDE/555555/biograficos"
              className="card-img-top"
              alt="Palm Springs Road"
            />
            <div className="card-body">
              <h5 className="card-title">Biograficos</h5>
              <p className="card-text">
                Son libros que narran la vida de una persona real.
              </p>
              <a href="#" className="btn btn-dark">
                Ver categoría
              </a>
            </div>
          </div>
          <div
            className="card shadow-sm p-3 mb-5 bg-white rounded"
            style={{ width: "300px", height: "400px" }}
          >
            <img
              src="https://placeholder.pics/svg/500x350/DEDEDE/555555/educativos"
              className="card-img-top"
              alt="Los Angeles Skyscrapers"
            />
            <div className="card-body">
              <h5 className="card-title">Educativos</h5>
              <p className="card-text">
                son otro de los tipos de libros más comunes.
              </p>
              <a href="#" className="btn btn-dark">
                Ver categoría
              </a>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-evenly ">
          <div
            className="card shadow-sm p-3 mb-5 bg-white rounded"
            style={{ width: "300px", height: "400px" }}
          >
            <img
              src="https://placeholder.pics/svg/500x350/DEDEDE/555555/novelas"
              className="card-img-top"
              alt="Hollywood Sign on The Hill"
            />
            <div className="card-body">
              <h5 className="card-title">Novelas</h5>
              <p className="card-text">Son textos narrativos.</p>
              <a href="#" className="btn btn-dark">
                Ver categoría
              </a>
            </div>
          </div>
          <div
            className="card shadow-sm p-3 mb-5 bg-white rounded"
            style={{ width: "300px", height: "400px" }}
          >
            <img
              src="https://placeholder.pics/svg/500x350/DEDEDE/555555/biograficos"
              className="card-img-top"
              alt="Palm Springs Road"
            />
            <div className="card-body">
              <h5 className="card-title">Biograficos</h5>
              <p className="card-text">
                Son libros que narran la vida de una persona real.
              </p>
              <a href="#" className="btn btn-dark">
                Ver categoría
              </a>
            </div>
          </div>
          <div
            className="card shadow-sm p-3 mb-5 bg-white rounded"
            style={{ width: "300px", height: "400px" }}
          >
            <img
              src="https://placeholder.pics/svg/500x350/DEDEDE/555555/educativos"
              className="card-img-top"
              alt="Los Angeles Skyscrapers"
            />
            <div className="card-body">
              <h5 className="card-title">Educativos</h5>
              <p className="card-text">
                son otro de los tipos de libros más comunes.
              </p>
              <a href="#" className="btn btn-dark">
                Ver categoría
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
