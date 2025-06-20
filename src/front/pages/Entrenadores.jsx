import React, { useEffect, useState } from "react";
import "../../styles/entrenador.css";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

const Entrenadores = () => {
    const [trainers, setTrainers] = useState([]);
    const [selectedTrainer, setSelectedTrainer] = useState(null);
    const { store } = useGlobalReducer();
    const navigate = useNavigate();

    useEffect(() => {


        const fetchTrainers = async () => {
            try {
                const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/professionals");
                const data = await response.json();
                const onlyProfessionals = data.filter(user => user.is_professional === true);
                setTrainers(onlyProfessionals);
            } catch (error) {
                console.error("Error fetching trainers:", error);
            }
        };

        fetchTrainers();
    }, []);

    const otherTrainers = trainers;

    const handleSelectTrainer = async (trainer) => {
        try {
    if (store.user.subscription.length==0)  return navigate('/Tarifas')
            const resp = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/professionals/enroll_user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ profesional_id: trainer.id })
            });
            if (resp.status === 401) {
                navigate("/login");
                return;
            };
            if (resp.ok) {
                setTrainers(prev => {
                    const remainingTrainers = prev.filter(t => t !== trainer);
                    return [trainer, ...remainingTrainers];
                });
                setSelectedTrainer(trainer);
            }
        } catch (error) {
            console.error("Error al guardar entrenador:", error);
        }
    }



    return (
        <div className="fondo">
            <div className="entrenador-page container mt-5">
                <section className="hero text-center py-5">
                    <h1 className="display-4">Entrenadores</h1>
                </section>

                {selectedTrainer && (
                    <>
                        <div className="trainer-card-1 trainer-destacado p-4 rounded shadow d-flex justify-content-center align-items-center">
                            <div className="entrenador-grid">
                                {/* Columna izquierda */}
                                <div className="col-izquierda">
                                    <p><strong>Nombre:</strong><br />{selectedTrainer.nombre} {selectedTrainer.apellido}</p>
                                    <p><strong>Descripción:</strong><br />Entrenador con experiencia en fuerza y resistencia.</p>
                                </div>

                                {/* Imagen en el centro */}
                                <div className="col-centro text-center">
                                    <img
                                        src={selectedTrainer.image || "https://i.pravatar.cc/300"}
                                        alt={`Imagen de ${selectedTrainer.nombre}`}
                                        className="trainer-img-grande"
                                    />
                                    <div className="estado-seleccionado mt-3">Seleccionado</div>
                                </div>

                                {/* Columna derecha */}
                                <div className="col-derecha">
                                    <p><strong>Email:</strong><br />{selectedTrainer.email}</p>
                                    <p><strong>Especialidad:</strong><br />{selectedTrainer.datos}</p>
                                </div>
                            </div>
                        </div>

                    </>
                )}

                <h1 className="text-center mb-4">Otros Entrenadores</h1>
                <div className="container">
                    <div className="row gy-4">
                        {otherTrainers.map((trainer, index) => (
                            <div className="col-md-6" key={index}>
                                <div className="trainer-card-1 d-flex flex-column p-3 rounded shadow h-100 justify-content-between">
                                    <div className="d-flex align-items-center">
                                        <img
                                            src={trainer.image || "https://i.pravatar.cc/200"}
                                            alt={`Imagen de ${trainer.nombre}`}
                                            className="trainer-img me-3"
                                        />
                                        <div className="flex-grow-1">
                                            <p className="text-black"><strong>Nombre:</strong><br />{trainer.nombre} {trainer.apellido}</p>
                                            <p className="text-black"><strong>Email:</strong><br />{trainer.email}</p>
                                            <p className="text-black"><strong>Especialidad:</strong><br />{trainer.datos}</p>
                                        </div>
                                    </div>
                                    <div className="text-center mt-3">
                                        <button
                                            className="btn btn-outline-dark"
                                            onClick={() => handleSelectTrainer(trainer)}
                                        >
                                            Solicitar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Entrenadores;
