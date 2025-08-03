import { Link } from "react-router-dom";

export const Productos = ({ productos }) => {
  if (!productos || productos.length === 0) {
    return <p>No hay productos disponibles.</p>;
  }

  return (
    <div className="container mt-4">
      <div className="row g-4">
        {productos.map((producto) => (
          <div key={producto.id} className="col-6 col-sm-4 col-md-3 col-lg-custom">
            <div className="card h-100">
              <img
                src={producto.imagen || "https://via.placeholder.com/150"}
                className="card-img-top"
                alt={producto.nombre}
              />
              <div className="card-body">
                <h5 className="card-title">{producto.nombre}</h5>
                <p className="card-text">{producto.descripcion}</p>
                <p className="card-text">
                  <small className="text-muted">${producto.precio}</small>
                </p>
                <Link to={`/vistaproducto/${producto.id}`} className="btn btn-primary">
                  Ver Detalles
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
