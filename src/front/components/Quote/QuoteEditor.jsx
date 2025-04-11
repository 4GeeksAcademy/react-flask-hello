// 👇 ❇️ Riki for the group success 10 Abril 👊

import React, { useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PdfDocument from "./PdfDocument";
import { useNavigate } from "react-router-dom"; // Para redirigir

const QuoteEditor = () => {
    const navigate = useNavigate();
    const [frequency, setFrequency] = useState("mensual");
    const [quoteTotal, setQuoteTotal] = useState(null);
    const [showDownload, setShowDownload] = useState(false);

    // Datos simulados (puedes adaptarlos con props o context)
    const user_id = 1;
    const field_id = 1;
    const hectares = 10;
    const cropType = "olivo";
    const services = ["fotogrametría"];
    const pricePerHectare = 13.2;
    const user = "Riki Teethdog";
    const field = "Parcela 1";

    const handleCalculate = () => {
        const factor =
            frequency === "puntual" ? 1 :
                frequency === "mensual" ? 0.9 : 0.8;

        const total = (pricePerHectare * factor * hectares).toFixed(2);
        setQuoteTotal(total);
        setShowDownload(true);
    };

    const handleAccept = async () => {
        const payload = {
            hectares,
            cropType,
            services,
            frequency,
            field_id,
            user_id
        };

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/presupuesto`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                const data = await response.json();
                alert("✅ Presupuesto guardado correctamente.");
                navigate("/dash_user"); // Redirige al dashboard
            } else {
                const error = await response.json();
                alert("❌ Error al guardar: " + error.error);
            }
        } catch (err) {
            alert("❌ Error al conectar con el servidor.");
            console.error(err);
        }
    };

    return (
        <div className="p-6 bg-white rounded-2xl shadow-lg max-w-xl mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-[#4682B4]">🌾 Presupuesto de Servicios</h2>

            <p><strong>Cultivo:</strong> {cropType}</p>
            <p><strong>Área:</strong> {hectares} hectáreas</p>
            <p><strong>Servicios:</strong> {services.join(", ")}</p>

            <label className="block mt-4 font-semibold">Periodicidad:</label>
            <select
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                className="mt-1 p-2 border rounded w-full"
            >
                <option value="puntual">Puntual</option>
                <option value="mensual">Mensual</option>
                <option value="trimestral">Trimestral</option>
            </select>

            <button
                className="mt-6 px-4 py-2 bg-green-600 text-white rounded font-bold"
                onClick={handleCalculate}
            >
                Calcular presupuesto
            </button>

            {quoteTotal && (
                <div className="mt-4 space-y-3">
                    <p><strong>Total estimado:</strong> {quoteTotal} €</p>

                    <PDFDownloadLink
                        document={
                            <PdfDocument
                                user={user}
                                field={field}
                                cropType={cropType}
                                hectares={hectares}
                                services={services.join(', ')}
                                frequency={frequency}
                                pricePerHectare={pricePerHectare}
                                total={quoteTotal}
                                validUntil="2025-05-10"
                            />
                        }
                        fileName="presupuesto_dronfarm.pdf"
                        className="inline-block px-4 py-2 bg-[#4682B4] text-white rounded"
                    >
                        {({ loading }) => loading ? 'Generando PDF...' : '📄 Descargar PDF'}
                    </PDFDownloadLink>

                    <button
                        className="px-4 py-2 bg-[#198754] text-white rounded font-bold"
                        onClick={handleAccept}
                    >
                        ✅ Aceptar presupuesto
                    </button>
                </div>
            )}
        </div>
    );
};

export default QuoteEditor;
