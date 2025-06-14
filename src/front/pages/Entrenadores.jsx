import React, { useEffect, useState } from "react";
import "../../styles/entrenador.css";

const Entrenadores = () => {
    const [trainers, setTrainers] = useState([]);

    useEffect(() => {
        const fetchTrainers = async () => {
            try {
                const response = await fetch("https://shiny-potato-q7pwpgqg69vpfxgq9-3001.app.github.dev/api/professionals");
                const data = await response.json();
                setTrainers(data);
            } catch (error) {
                console.error("Error fetching trainers:", error);
            }
        };

        fetchTrainers();
    }, []);

    const selectedTrainer = trainers[0];
    const otherTrainers = trainers.slice(1);

    return (
        <div className="fondo">
            <div className="entrenador-page container mt-5">
                <section className="hero text-center py-5">
                    <h1 className="display-4">Entrenadores</h1>
                </section>
 
                {selectedTrainer && (
                    <>
                        <h1 className="text-center mb-4">Entrenador Seleccionado</h1>
                        <div className="container-1 mb-5">
                            <div className="trainer-card-1 d-flex align-items-center p-3 rounded shadow">
                                <img
                                    src={selectedTrainer.image}
                                    alt="Entrenador "
                                    className="trainer-img me-3"
                                />
                                <div className="flex-grow-1">
                                    <p className="text-black">
                                        <strong>Nombre:</strong><br />{selectedTrainer.name}
                                    </p>
                                    <p className="text-black">
                                        <strong>Especialidad:</strong><br />{selectedTrainer.datos}
                                    </p>
                                    <p className="text-black">
                                        <strong>Títulos:</strong><br />{selectedTrainer.titulos}
                                    </p>
                                </div>
                                <button className="btn btn-outline-dark">Seleccionado</button>
                            </div>
                        </div>
                    </>
                )}

                <h1 className="text-center mb-4">Otros Entrenadores</h1>
                <div className="container">
                    <div className="row gy-4">
                        {otherTrainers.map((trainer, index) => (
                            <div className="col-md-6" key={index}>
                                <div className="trainer-card-1 d-flex align-items-center p-3 rounded shadow">
                                    <img src={trainer.image} alt="Entrenador" className="trainer-img me-3" />
                                    <div className="flex-grow-1">
                                        <p className="text-black"><strong>Nombre:</strong><br />{trainer.name}</p>
                                        <p className="text-black"><strong>Especialidad:</strong><br />{trainer.datos}</p>
                                        <p className="text-black"><strong>Títulos:</strong><br />{trainer.titulos}</p>
                                    </div>
                                    <button className="btn btn-outline-dark p-2 ms-3">Solicitar</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Entrenadores;
