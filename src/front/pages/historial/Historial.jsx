import React, { useEffect, useState } from "react";
import useGlobalReducer from "../../hooks/useGlobalReducer";

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
      dispatch({ type: "addToCarro", payload: { ...prod, quantity: prod.quantity } });
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
    <div className="p-6 text-black">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Historial de Compras</h1>

      {/* Filtros */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Buscar por producto..."
          value={filtroTexto}
          onChange={(e) => setFiltroTexto(e.target.value)}
          className="px-3 py-2 border rounded w-64"
        />
        <input
          type="text"
          placeholder="Filtrar por fecha (ej: 2025-08-06)"
          value={filtroFecha}
          onChange={(e) => setFiltroFecha(e.target.value)}
          className="px-3 py-2 border rounded w-64"
        />
      </div>

      {historialFiltrado.length === 0 ? (
        <p className="text-gray-600">No hay compras que coincidan con tu búsqueda.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {historialFiltrado.map((compra, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition flex flex-col justify-between"
            >
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  Fecha: {compra.fecha}
                </h2>
                <p className="text-gray-700 mb-4 font-semibold">
                  Total: ${compra.total.toFixed(2)}
                </p>
                <ul className="list-disc list-inside text-sm text-gray-600 mb-4">
                  {compra.productos.map((prod, i) => (
                    <li key={i}>
                      {getTitle(prod)} - ${prod.price} x {prod.quantity}
                    </li>
                  ))}
                </ul>
              </div>
              <button
                onClick={() => handleRepetirCompra(compra.productos)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mt-auto"
              >
                Repetir compra
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
