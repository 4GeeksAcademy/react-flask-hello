import React from "react";

const Entrenadores = () => {

    const selectedTrainer = {
        image: "https://randomuser.me/api/portraits/men/75.jpg",
        name: "Pepe",
        datos: "Estoy especializado en Crossfit.",
        titulos: "Ciencias del deporte",
        selected: true,
    };

    const otherTrainers = [
        {
            image: "https://randomuser.me/api/portraits/women/65.jpg",
            name: "Lola",
            datos: "Estoy especializada en Yoga y danza clasica.",
            titulos: "Ciencias del deporte",
            selected: false,
        },
        {
            image: "https://randomuser.me/api/portraits/men/76.jpg",
            name: "Juan",
            datos: "Estoy especializado en musculacion y cardio.",
            titulos: "Ciencias del deporte",
            selected: false,
        },
    ]; 

    return (
        <div className="fondo">
            <div className="entrenador-page container mt-5 ">
                {/* Header */}
                <section className="hero text-center py-5">
                    <h1 className="display-4 ">Entrenadores</h1>
                </section>

                {/* Body */}
                <section className="planes my-5">
                    <div className="trainer-section text-light py-5">
                        <h2 className="text-center mb-4">Entrenador Seleccionado</h2>
                        <div className="container mb-5">
                            <div className="trainer-card-1 d-flex align-items-center p-3 rounded shadow">
                                <img src={selectedTrainer.image} alt="Entrenador" className="trainer-img me-3" />
                                <div className="flex-grow-1">
                                    <p><strong>NAME</strong><br />{selectedTrainer.name}</p>
                                    <p><strong>DATOS PERSONALES</strong><br />{selectedTrainer.datos}</p>
                                    <p><strong>TÍTULOS</strong><br />{selectedTrainer.titulos}</p>
                                </div>
                                <button className="btn btn-light">Seleccionado</button>
                            </div>
                        </div>

                        <h2 className="text-center mb-4">Otros Entrenadores</h2>
                        <div className="container">
                            <div className="row gy-4">
                                {otherTrainers.map((trainer, index) => (
                                    <div className="col-md-6" key={index}>
                                        <div className="trainer-card-1 d-flex align-items-center p-3 rounded shadow">
                                            <img src={trainer.image} alt="Entrenador" className="trainer-img me-3" />
                                            <div className="flex-grow-1">
                                                <p><strong>NAME</strong><br />{trainer.name}</p>
                                                <p><strong>DATOS PERSONALES</strong><br />{trainer.datos}</p>
                                                <p><strong>TÍTULOS</strong><br />{trainer.titulos}</p>
                                            </div>
                                            <button className="btn btn-outline-light p-2">Solicitar</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}; 

export default Entrenadores;