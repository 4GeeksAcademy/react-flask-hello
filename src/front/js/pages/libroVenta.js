import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";


export const LibroVenta = () => {
    const { store, actions } = useContext(Context);
    const [showBook, setShowBook] = useState([]);
   console.log(actions)
   try {
    actions.searchLibros(window.location.search.replace("?q=", ""), (e) => {setShowBook(e)})
    // setshowBook(actions.showBook)
    // if(window.location.search)
    // window.location.href = "/libroVenta"
   }
  catch(e) {

  }

    return (
        <div>
            <div className="container-fluid">
                <div className="text-center m-3 mt-5 mb-5">
                    <h1>LIBROS EN VENTA</h1>
                </div>
                <div className="d-flex flex-wrap justify-content-center">
                    {showBook.map((libro, i) => (
                        <div className="card shadow-sm p-3 m-3" style={{ width: "300px", height: "400px" }} key={i}>
                            {/* <img  className="card-img-top" alt={store.showBook.title} /> */}
                            <div className="card-body">
                                <h5 className="card-title">Titulo: {libro.title}</h5>
                                <p className="card-text">Descripción: {libro.description}</p>
                                <p className="card-text">Autor: {libro.author}</p>
                                <p className="card-text">Categoria: {libro.cathegory}</p>
                                <p className="card-text">Páginas: {libro.number_of_pages}</p>
                                <p className="card-text">Precio: {libro.price}</p>
                                <Link to={`/detalle-libro/${libro.id}`} className="btn btn-dark">Ver detalles</Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};