import React, { useEffect, useState } from "react";
import "../../styles/entrenador.css";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import userServices from "../../services/userServices.js";

const Entrenadores = () => {
    const [allTrainers, setAllTrainers] = useState([]);
    const [mensajeCambio, setMensajeCambio] = useState(null);

    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();

    const fetchUserInfo = async () => {
        try {
            const user = await userServices.getUserInfo();
            dispatch({ type: "get_user_info", payload: user });
        } catch (error) {
            console.error("Error al refrescar el usuario:", error);
        }
    };

    useEffect(() => {
        const fetchTrainers = async () => {
            try {
                const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/professionals");
                const data = await response.json();
                const onlyProfessionals = data.filter(user => user.is_professional === true);
                setAllTrainers(onlyProfessionals);
            } catch (error) {
                console.error("Error fetching trainers:", error);
            }
        };
        fetchTrainers();
    }, []);

    const handleSelectTrainer = async (trainer) => {
        try {
            console.log("👉 Intentando seleccionar:", trainer.nombre);

            if (!store.user?.subscription || store.user.subscription.length === 0) {
                return navigate('/Tarifas');
            }

            const resp = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/professionals/enroll_user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ profesional_id: trainer.id })
            });

            if (resp.status === 401) return navigate("/login");

            if (resp.ok) {
                console.log("✅ Enroll_user OK");

                const resVinculo = await userServices.vincularProfesional(store.user.id, trainer.id);
                console.log("🔄 Resultado vinculación:", resVinculo);

                if (!resVinculo.success) {
                    console.error("❌ No se pudo vincular el profesional:", resVinculo.error);
                }

                const updatedUser = await userServices.getUserInfo();
                console.log("🆕 Usuario actualizado:", updatedUser);

                dispatch({ type: "get_user_info", payload: updatedUser });

                setMensajeCambio({
                    anterior: store.user?.profesionales_contratados?.[0],
                    nuevo: trainer
                });

                setTimeout(() => setMensajeCambio(null), 4000);
            } else {
                console.error("❌ Fallo en /enroll_user");
            }

        } catch (error) {
            console.error("Error al seleccionar entrenador:", error);
        }
    };



    const irADetalle = (id) => {
        navigate(`/entrenador/${id}`);
    };

    return (
        <div className="fondo">
            <div className="entrenador-page container mt-5">
                <section className="hero text-center py-5">
                    <h1 className="display-4">Entrenadores</h1>
                </section>

                {mensajeCambio && (
                    <div className="alerta-entrenador text-center mx-auto my-3">
                        <p>✅ Has cambiado de entrenador:</p>
                        <div className="d-flex justify-content-center align-items-center gap-3 mt-2 flex-wrap">
                            <div>
                                <p className="mb-1">Anterior:</p>
                                <img
                                    src={mensajeCambio.anterior?.imagen || "https://i.pravatar.cc/100"}
                                    alt="Entrenador anterior"
                                    className="trainer-img"
                                />
                                <p className="mt-2">{mensajeCambio.anterior?.nombre || "Ninguno"}</p>
                            </div>

                            <div className="animacion-transicion" />

                            <div>
                                <p className="mb-1">Nuevo:</p>
                                <img
                                    src={mensajeCambio.nuevo?.imagen || "https://i.pravatar.cc/100"}
                                    alt="Entrenador nuevo"
                                    className="trainer-img"
                                />
                                <p className="mt-2">{mensajeCambio.nuevo?.nombre}</p>
                            </div>
                        </div>
                    </div>
                )}

                {store.user?.profesionales_contratados?.[0] && (
                    <div className="trainer-card-1 trainer-destacado p-4 rounded shadow d-flex justify-content-center align-items-center">
                        <div className="entrenador-grid">
                            <div className="col-izquierda">
                                <p><strong>Nombre:</strong><br />{store.user.profesionales_contratados[0].nombre || "Sin nombre"} {store.user.profesionales_contratados[0].apellido || ""}</p>
                                <p><strong>Descripción:</strong><br />Entrenador con experiencia en fuerza y resistencia.</p>
                            </div>

                            <div className="col-centro text-center">
                                <img
                                    src={store.user.profesionales_contratados[0].imagen || "https://i.pravatar.cc/300"}
                                    alt={`Imagen de ${store.user.profesionales_contratados[0].nombre}`}
                                    className="trainer-img-grande"
                                />
                                <div className="estado-seleccionado mt-3">Seleccionado</div>
                            </div>

                            <div className="col-derecha">
                                <p><strong>Email:</strong><br />{store.user.profesionales_contratados[0].email}</p>
                                <p><strong>Especialidad:</strong><br />{store.user.profesionales_contratados[0].profession_type || "No especificada"}</p>
                            </div>
                        </div>
                    </div>
                )}

                {allTrainers.filter(t => store.user?.profesionales_contratados?.[0]?.id !== t.id).length > 0 && (
                    <h1 className="text-center mb-4">Otros Entrenadores</h1>
                )}

                <div className="container">
                    <div className="row gy-4">
                        {allTrainers
                            .filter(t => store.user?.profesionales_contratados?.[0]?.id !== t.id)
                            .map((trainer, index) => (
                                <div className="col-md-6" key={index}>
                                    <div className="trainer-card-1 d-flex flex-column p-3 rounded shadow h-100 justify-content-between">
                                        <div className="d-flex align-items-center">
                                            <img
                                                src={trainer.imagen || "https://i.pravatar.cc/200"}
                                                alt={`Imagen de ${trainer.nombre}`}
                                                className="trainer-img me-3"
                                            />
                                            <div className="flex-grow-1">
                                                <p className="text-black"><strong>Nombre:</strong><br />{trainer.nombre || "Sin nombre"} {trainer.apellido || ""}</p>
                                                <p className="text-black"><strong>Email:</strong><br />{trainer.email}</p>
                                                <p className="text-black"><strong>Especialidad:</strong><br />{trainer.profession_type || "No especificada"}</p>
                                            </div>
                                        </div>
                                        <div className="text-center mt-3 d-flex gap-2 justify-content-center">
                                            <button
                                                className="btn-solicitar-entrenador"
                                                onClick={() => handleSelectTrainer(trainer)}
                                            >
                                                Solicitar
                                            </button>
                                            <button
                                                className="btn-mas-info"
                                                onClick={() => irADetalle(trainer.id)}
                                            >
                                                Más info
                                            </button>
                                        </div>
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
