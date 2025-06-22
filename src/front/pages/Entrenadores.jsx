import React, { useEffect, useState } from "react";
import "../../styles/entrenador.css";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import userServices from "../../services/userServices.js";

const Entrenadores = () => {
    const [allTrainers, setAllTrainers] = useState([]);
    const [mensajeCambio, setMensajeCambio] = useState(null);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [filtroNombre, setFiltroNombre] = useState("");
    const [filtroEspecialidad, setFiltroEspecialidad] = useState("Todas");

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

            setIsTransitioning(true);
            window.scrollTo({ top: 0, behavior: "smooth" });

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
                dispatch({ type: "get_user_info", payload: updatedUser });

                setMensajeCambio({
                    anterior: store.user?.profesionales_contratados?.[0],
                    nuevo: trainer
                });

                setTimeout(() => {
                    setMensajeCambio(null);
                    setIsTransitioning(false);
                }, 3000);
            } else {
                console.error("❌ Fallo en /enroll_user");
                setIsTransitioning(false);
            }

        } catch (error) {
            console.error("Error al seleccionar entrenador:", error);
            setIsTransitioning(false);
        }
    };

    const irADetalle = (id) => {
        navigate(`/entrenador/${id}`);
    };

    const especialidades = [
        "Todas",
        ...new Set(allTrainers.map(t => t.profession_type).filter(Boolean))
    ];

    const trainersFiltrados = allTrainers
        .filter(t => store.user?.profesionales_contratados?.[0]?.id !== t.id)
        .filter(t =>
            (t.nombre?.toLowerCase() || "").includes(filtroNombre.toLowerCase()) &&
            (filtroEspecialidad === "Todas" || t.profession_type === filtroEspecialidad)
        );

    const limpiarFiltros = () => {
        setFiltroNombre("");
        setFiltroEspecialidad("Todas");
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
                                    src={mensajeCambio.anterior?.imagen || "/logoCrema1.png"}
                                    alt="Entrenador anterior"
                                    className="trainer-img"
                                />
                                <p className="mt-2">{mensajeCambio.anterior?.nombre || "Ninguno"}</p>
                            </div>
                            <div className="animacion-transicion" />
                            <div>
                                <p className="mb-1">Nuevo:</p>
                                <img
                                    src={mensajeCambio.nuevo?.imagen || "/logoCrema1.png"}
                                    alt="Entrenador nuevo"
                                    className="trainer-img"
                                />
                                <p className="mt-2">{mensajeCambio.nuevo?.nombre}</p>
                            </div>
                        </div>
                    </div>
                )}

                {!isTransitioning && store.user?.profesionales_contratados?.[0] && (
                    <div className="trainer-card-1 trainer-destacado p-4 rounded shadow d-flex justify-content-center align-items-center">
                        <div className="entrenador-grid">
                            <div className="col-izquierda">
                                <p><strong>Nombre:</strong><br />{store.user.profesionales_contratados[0].nombre || "Sin nombre"} {store.user.profesionales_contratados[0].apellido || ""}</p>
                                <p><strong>Descripción:</strong><br />{store.user.profesionales_contratados[0].descripcion || "Sin descripción."}</p>
                                <p><strong>Experiencia:</strong><br />{store.user.profesionales_contratados[0].experiencia ?? "No indicada"} años</p>
                            </div>

                            <div className="col-centro text-center">
                                <img
                                    src={store.user.profesionales_contratados[0].imagen || "/logoCrema1.png"}
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

                <div className="filtros-entrenadores d-flex gap-2 justify-content-center align-items-center flex-wrap mt-4">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Buscar por nombre..."
                        value={filtroNombre}
                        onChange={e => setFiltroNombre(e.target.value)}
                        style={{ maxWidth: "250px" }}
                    />
                    <select
                        className="form-select"
                        value={filtroEspecialidad}
                        onChange={e => setFiltroEspecialidad(e.target.value)}
                        style={{ maxWidth: "250px" }}
                    >
                        {especialidades.map((esp, idx) => (
                            <option key={idx} value={esp}>{esp}</option>
                        ))}
                    </select>
                    <button
                        className="btn-limpiar-filtros"
                        onClick={limpiarFiltros}
                    >
                        Limpiar filtros
                    </button>
                </div>

                {trainersFiltrados.length > 0 && (
                    <h1 className="text-center mb-4 mt-4">Otros Entrenadores</h1>
                )}

                <div className="container">
                    <div className="row gy-4">
                        {trainersFiltrados.map((trainer, index) => (
                            <div className="col-md-6" key={index}>
                                <div className="trainer-card-1 d-flex flex-column p-3 rounded shadow h-100 justify-content-between">
                                    <div className="d-flex align-items-center">
                                        <img
                                            src={trainer.imagen || "/logoCrema1.png"}
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