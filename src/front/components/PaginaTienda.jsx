import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./PaginaTienda.css";

export const PaginaTienda = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [tienda, setTienda] = useState(null);

  useEffect(() => {
    const fetchTienda = async () => {
      try {
        const response = await fetch(`/api/tienda/${id}`);
        if (!response.ok) throw new Error("Error al cargar la tienda");
        const data = await response.json();
        setTienda(data);
      } catch (error) {
        setTienda({
          nombre: `Tienda ${id}`,
          descripcion: "Descubre productos únicos y experiencias increíbles.",
          imagen: "/images/default-store.jpg",
          productos: [
            { id: 1, nombre: "Producto A", precio: "25 €" },
            { id: 2, nombre: "Producto B", precio: "40 €" },
            { id: 3, nombre: "Producto C", precio: "15 €" },
          ],
        });
      } finally {
        setLoading(false);
      }
    };

    fetchTienda();
  }, [id]);

  if (loading) {
    return (
      <div className="pagina-tienda-loading">
        <div className="spinner"></div>
        <p>Cargando tienda...</p>
      </div>
    );
  }

  return (
    <div className="pagina-tienda">
      <section className="tienda-hero">
        <img
          src={tienda?.imagen}
          alt={tienda?.nombre}
          className="tienda-imagen"
        />
        <div className="tienda-info">
          <h1>{tienda?.nombre}</h1>
          <p>{tienda?.descripcion}</p>
        </div>
      </section>

      <section className="tienda-productos">
        <h2>Productos destacados</h2>
        <div className="productos-grid">
          {tienda?.productos.map((p) => (
            <div key={p.id} className="producto-card">
              <h3>{p.nombre}</h3>
              <p>{p.precio}</p>
              <button className="comprar-btn">Comprar</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};



