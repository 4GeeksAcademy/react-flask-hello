import React from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const SingleProduct = () => {
  const { store, dispatch } = useGlobalReducer();

  return (
    <>
    
      <div className="container">
        <ul className="list-group">
          {store &&
            store.producto?.map((product) => {
              return (
                <Link to={"/tienda/" + product.id}>
                  <li
                    key={product.id}
                    className="list-group-item d-flex justify-content-between"
                    style={{ background: product.background }}
                  >
                    <img src={product.imagenes}/>
                    <strong>{product.nombre_producto}</strong>
                  </li>
                </Link>
              );
            })}
        </ul>
      </div>
    </>
  );
};
