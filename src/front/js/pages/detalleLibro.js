import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

import { Context } from "../store/appContext";

export const DetalleLibro = () => {
  const { store, actions } = useContext(Context);
  const { id } = useParams();
  const [libro, setLibro] = useState([]);

  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(`http://localhost:3001/api/detalle-libro/${id}`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setLibro(data);
        console.log("conseguí el libro");
        console.log("oneBook:", data);
      })
      .catch((error) => console.log("error", error));
  }, [id]);

  return (
    <div>
      <div className="container-fluid d-flex">
        <div
          className="card shadow-sm p-3 m-3"
          style={{ width: "300px", height: "400px" }}
        >
          <img
            src=""
            className="card-img-top"
            alt="Hollywood Sign on The Hill"
          />
        </div>
        <div className="m-3 mt-5 mb-5">
          <h1>LIBROS EN VENTA</h1>
          <hr className="dropdown-divider" />
          <br></br>
          <div className="row">
            <div className="col-3">
              <h5 className="text-dark mb-3">Autor</h5>
              <p className="text-dark mb-3">Descripción</p>
              <p className="text-dark mb-3">Categoria</p>
              <p className="text-dark mb-3">Páginas</p>
              <p className="text-dark mb-3">Precio</p>
            </div>
            <div className="col-3 ms-3">
              <h5 className="text-dark mb-3">:{libro.title}</h5>
              <p className="text-dark mb-3">:</p>
              <p className="text-dark mb-3">:</p>
              <p className="text-dark mb-3">:</p>
              <p className="text-dark mb-3">:</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
