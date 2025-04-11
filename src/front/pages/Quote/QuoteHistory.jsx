// 👇 ❇️ Riki for the group success 11 Abril 👊

import React, { useEffect, useState } from "react";
import useGlobalReducer from "../../hooks/useGlobalReducer";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PdfDocument from "../../components/Quote/PdfDocument";

const QuoteHistory = () => {
  const { store } = useGlobalReducer();
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
                const area = q.field || "N/A";

                return (
                  <tr key={q.id}>
                    <td>{q.created_at}</td>
                    <td>{cultivo}</td>
                    <td>{area}</td>
                    <td>{q.cost.toFixed(2)}</td>
                    <td>
                      <PDFDownloadLink
                        document={
                          <PdfDocument
                            user={`Usuario #${q.user_id}`}
                            field={area}
                            cropType={cultivo}
                            hectares={"N/A"} // Puedes parsear desde q.description si quieres
                            services={q.description}
                            frequency={"Mensual"}
                            pricePerHectare={q.cost}
                            total={q.cost}
                            validUntil={"2025-06-30"}
                          />
                        }
                        fileName={`presupuesto_${q.id}.pdf`}
                        className="btn btn-outline-primary btn-sm"
                      >
                        Descargar PDF
                      </PDFDownloadLink>
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
