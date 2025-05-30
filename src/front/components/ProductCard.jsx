// src/components/ProductCard.jsx
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer"; // o la ruta correcta

export default function ProductCard({ producto }) {
  const { dispatch } = useGlobalReducer();

  const agregarAlCarrito = () => {
    dispatch({ type: 'agregar_al_carrito', payload: producto });
  };

  return (
    <div className="card h-100">
      <img
        src={producto.imagen}
        className="card-img-top"
        alt={producto.nombre}
        style={{ objectFit: "cover", height: "150px" }}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{producto.nombre}</h5>
        <p className="card-text">Precio: €{producto.precio.toFixed(2)}</p>
        <div className="mt-auto d-flex justify-content-between">
          <button className="btn btn-primary btn-sm" onClick={agregarAlCarrito}>
            Añadir al carrito
          </button>
          <Link to={`/producto/${producto.id}`} className="btn btn-outline-secondary btn-sm">
            Detalle
          </Link>
        </div>
      </div>
    </div>
  );
}

