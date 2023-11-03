import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";


export const AllBooks = () => {
    const { store, actions } = useContext(Context);

    return (
        <div>
            <div className="container-fluid">
                <div className="text-center m-3 mt-5 mb-5">
                    <h1>LIBROS EN VENTA</h1>
                </div>
                <div className="d-flex flex-wrap justify-content-center">
                    {store.showBooks.map((libro, i) => (
                        <div className="card shadow-sm  m-3" style={{ width: "220px", height: "300" }} key={i}>
                            <div className="d-flex justify-content-center">
                                <img className="card-img-top" style={{ maxWidth: "100%", maxHeight: "300px" }} src={libro.photo} alt={`Portada de ${libro.title}`} />
                            </div>
                            <div className="card-body">
                                <h6 className="card-title">{libro.title}</h6>
                                <p className="card-text">{libro.author}</p>
                                <p className="card-text">${libro.price}</p>
                            </div>
                            <div className="d-flex justify-content-between align-items-center m-1">
                                <Link to={`/allBooks/bookDetails/${libro.id}`} className="btn btn-dark">Ver detalles</Link>
                                <i className="fa-regular fa-heart fa-2x"></i>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};