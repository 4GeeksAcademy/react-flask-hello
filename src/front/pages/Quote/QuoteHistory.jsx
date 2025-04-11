// 👇 ❇️ Riki for the group success 11 Abril 👊

import React, { useEffect, useState, useContext } from "react";
import { Context } from "../store/appContext";


const QuoteHistory = () => {
  const { store } = useContext(Context);
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const resp = await fetch(`${process.env.BACKEND_URL}/usuario/${store.user.id}/presupuestos`);
        const data = await resp.json();
        setQuotes(data);
      } catch (err) {
        console.error("Error al obtener presupuestos:", err);
      }
    };

    if (store.user?.id) fetchQuotes();
  }, [store.user]);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Historial de Presupuestos</h2>
      {quotes.length === 0 ? (
        <p>No hay presupuestos disponibles.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-success">
              <tr>
                <th>Fecha</th>
                <th>Cultivo</th>
                <th>Área</th>
                <th>Coste (€)</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {quotes.map((q) => {
                const cultivo = q.description?.split("|")[0]?.trim();
                return (
                  <tr key={q.id}>
                    <td>{q.created_at}</td>
                    <td>{cultivo}</td>
                    <td>{q.field}</td>
                    <td>{q.cost.toFixed(2)}</td>
                    <td>
                      <button className="btn btn-outline-secondary btn-sm" disabled>
                        Descargar PDF
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default QuoteHistory;
