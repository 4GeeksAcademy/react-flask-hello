import React, { useEffect, useState, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext"; // Importa el contexto para verificar autenticación
import "../../styles/view_all_reports.css";

export const ViewReports = () => {
    const { babyId } = useParams(); // Obtenemos el babyId de los parámetros de la URL
    const [reports, setReports] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [babyName, setBabyName] = useState(""); // Nuevo estado para el nombre del bebé

    const { store } = useContext(Context); // Accede al contexto para verificar el estado de autenticación
    const navigate = useNavigate();

    useEffect(() => {
        // Redirige al login si no hay un token en el contexto
        if (!store.token) {
            navigate('/login');
            return;
        }

        const fetchReportsAndBabyName = async () => {
            const reportsUrl = `${process.env.BACKEND_URL}api/baby/${babyId}/reports`; // URL actualizada
            const babyUrl = `${process.env.BACKEND_URL}api/babies`; // URL para obtener los bebés

            try {
                // Obtener el nombre del bebé
                const babyResponse = await fetch(babyUrl, { 
                    headers: {
                        'Authorization': `Bearer ${store.token}` // Incluye el token en la solicitud
                    }
                });
                if (!babyResponse.ok) {
                    const errorText = await babyResponse.text();
                    console.error("Error fetching babies:", errorText);
                    setError(`Error fetching babies: ${errorText}`);
                    return;
                }

                const babies = await babyResponse.json();
                const baby = babies.find(b => b.id === parseInt(babyId));
                if (baby) {
                    setBabyName(baby.name);
                } else {
                    setError("Baby not found");
                    return;
                }

                // Obtener los informes
                const reportsResponse = await fetch(reportsUrl, { 
                    headers: {
                        'Authorization': `Bearer ${store.token}` // Incluye el token en la solicitud
                    }
                });
                if (!reportsResponse.ok) {
                    const errorText = await reportsResponse.text();
                    console.error("Error fetching reports:", errorText);
                    setError(`Error ${reportsResponse.status}: ${errorText}`);
                    return;
                }

                const result = await reportsResponse.json();
                result.sort((a, b) => new Date(b.date) - new Date(a.date));

                setReports(result);
            } catch (error) {
                console.error("Network error:", error);
                setError('Network error: ' + error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchReportsAndBabyName();
    }, [babyId, store.token, navigate]);

    if (loading) return <p>Loading...</p>;

    return (
        <div className="background-container">
            <div className="vr-container">
                <h2 className="vr-title">{babyName || "Loading..."}'s Reports</h2>
                {error && <div className="error">{error}</div>}
                {reports.length > 0 ? (
                    <div className="vr-reports-container">
                        <div className="vr-reports-wrapper">
                            {reports.map(report => (
                                <div className="card vr-card" key={report.id}>
                                    {report.date}
                                    <div className="vr-card-body card-body">
                                        <div className="vr-card-column">
                                            <p><strong>Bedtime:</strong> {report.bedtime} hours</p>
                                            <p><strong>Meals:</strong> {report.meals}</p>
                                            <p><strong>Diapers:</strong> {report.diapers}</p>
                                            <p><strong>Walks:</strong> {report.walks}</p>
                                            <p><strong>Water:</strong> {report.water} liters</p>
                                        </div>
                                        <div className="vr-card-column">
                                            <p><strong>Medications:</strong> {report.meds ? "Yes" : "No"}</p>
                                            <p><strong>Kindergarten:</strong> {report.kindergarden ? "Yes" : "No"}</p>
                                            <p><strong>Extra Notes:</strong> {report.extra}</p>
                                        </div>
                                    </div>
                                    <div className="vr-card-footer card-footer">
                                        <Link to={`/edit_report/${babyId}/${report.id}`} className="btn vr-btn btn-primary">Edit Report</Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <p>No reports available.</p>
                )}
            </div>
        </div>
    );
};