import React, { useEffect, useState } from "react";
import useGlobalReducer from "../../hooks/useGlobalReducer";
import "./historial.css";
import historialBg from "../aboutus/img/historial.jpg"; // ajusta si tu ruta cambia

export const Historial = () => {
  const [historial, setHistorial] = useState([]);
  const [filtroTexto, setFiltroTexto] = useState("");
  const [filtroFecha, setFiltroFecha] = useState("");
  const { dispatch } = useGlobalReducer();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("historialCompras")) || [];
    setHistorial(data);
  }, []);

  const handleRepetirCompra = (productos) => {
    productos.forEach((prod) => {
      dispatch({
        type: "addToCarro",
        payload: { ...prod, quantity: prod.quantity },
      });
    });
    alert("Productos añadidos nuevamente al carro ✅");
  };

  const norm = (s) =>
    (s ?? "")
      .toString()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

  const getTitle = (p) => p?.title || p?.name || "";

  const historialFiltrado = historial.filter((compra) => {
    const coincideFecha = filtroFecha ? norm(compra.fecha).includes(norm(filtroFecha)) : true;
    const coincideTexto = filtroTexto
      ? compra.productos.some((prod) => norm(getTitle(prod)).includes(norm(filtroTexto)))
      : true;
    return coincideFecha && coincideTexto;
  });

  return (
    <section
      className="historial full-bleed"
      style={{ backgroundImage: `url(${historialBg})` }}
    >
      <div className="historial__overlay">
        <header className="historial__head container">
          <div className="historial__title">
            <h1>Historial de compras</h1>
            <p>Revisa tus pedidos y vuelve a añadirlos al carrito en un clic.</p>
          </div>

          <div className="historial__filters" role="search">
            <div className="field">
              <label htmlFor="f-texto">Producto</label>
              <input
                id="f-texto"
                type="text"
                placeholder="Buscar por producto…"
                value={filtroTexto}
                onChange={(e) => setFiltroTexto(e.target.value)}
              />
            </div>

            <div className="field">
              <label htmlFor="f-fecha">Fecha</label>
              <input
                id="f-fecha"
                type="text"
                placeholder="Ej: 2025-08-06"
                value={filtroFecha}
                onChange={(e) => setFiltroFecha(e.target.value)}
              />
            </div>
          </div>
        </header>

        {historialFiltrado.length === 0 ? (
          <div className="empty container">
            <div className="empty__icon">🕹️</div>
            <h2>No hay compras que coincidan</h2>
            <p>Prueba ajustando los filtros o realiza tu primera compra.</p>
          </div>
        ) : (
          <div className="historial__grid container">
            {historialFiltrado.map((compra, index) => (
              <article key={index} className="card">
                <div className="card__header">
                  <span className="chip chip--date">{compra.fecha}</span>
                  <span className="chip chip--total">
                    Total <strong>${compra.total.toFixed(2)}</strong>
                  </span>
                </div>

                <ul className="card__list">
                  {compra.productos.map((prod, i) => (
                    <li key={i}>
                      <span className="prod">{getTitle(prod)}</span>
                      <span className="qty">x{prod.quantity}</span>
                      <span className="price">${Number(prod.price).toFixed(2)}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className="btn btn--primary"
                  onClick={() => handleRepetirCompra(compra.productos)}
                  aria-label="Repetir compra"
                >
                  Repetir compra
                </button>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
