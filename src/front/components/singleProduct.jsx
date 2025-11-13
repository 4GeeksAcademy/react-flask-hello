import React from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const SingleProduct = () => {
  const { store, dispatch } = useGlobalReducer();

  return (
    <>
    
     <div className="container my-4 ">
      {/* Nombre del producto */}
      <div className="bg-light rounded p-2 mb-1 text-center">
        <h4 className="m-0">Product name</h4>
      </div>

      <div className="row g-3">
       
        <div className="col-md-8">
          {/* Imagen */}
          <div className="bg-danger bg-opacity-25 rounded d-flex align-items-center justify-content-center mb-3 me-3" style={{ height: "300px", width:"300px"}}>
            <span className="fw-bold">Images</span>
          </div>

          {/* Categoría */}
          <h6 className="fw-bold">Categoría</h6>
          <div className="bg-danger bg-opacity-25 rounded p-3">
            <h6 className="fw-bold">Descripcion</h6>
            <ul className="list-unstyled mb-0">
              <li className="bg-light rounded p-5 mb-2"></li>
              
            </ul>
          </div>
        </div>

        {/* Sección derecha (Detalles y QR) */}
        <div className="col-md-4 d-flex flex-column justify-content-between">
          {/* Detalles */}
          <div className="bg-danger bg-opacity-25 rounded p-3 mb-3">
            <h5 className="fw-bold">Nombre</h5>
            <p className="mb-1 small">Estado - Color - Tamaño</p>
            <p className="fw-bold mb-1">PRECIO</p>
            <div className="d-grid gap-2">
              <button className="btn btn-outline-danger">Tienda</button>
              <button className="btn btn-outline-danger">Guardar</button>
              <button className="btn btn-danger">Comprar</button>
            </div>
          </div>

          {/* Generar QR */}
          <div className="bg-danger bg-opacity-25 rounded p-3 text-center">
            <h6 className="fw-bold">GENERAR QR</h6>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};
