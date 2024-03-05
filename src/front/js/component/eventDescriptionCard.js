import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";
import { LoginModal } from "./LoginModal";
import { SignUpModal } from "./SignUpModal";
import { useNavigate } from 'react-router-dom';
export const EventDescriptionCard = (props) => {
    const navigate = useNavigate();
    const { store, actions } = useContext(Context);
    const [modalState, setModalState] = useState({
        showModal: false,
        showModalUpdate: false,
    });

    useEffect(() => {
        const fetchUser = async () => {
            if (store.auth) {
                await actions.obtenerInfoUsuario()
            }
        }
        fetchUser()
    }, []);

    const fechaString = props.fecha;
    const fechaObjeto = new Date(fechaString);
    const fechaFormateada = fechaObjeto.toLocaleDateString();

    const handleInscription = async () => {
        if (store.user.id_eventos?.includes(parseInt(props.id_evento))) {
            await actions.dejarDeAsistirEvento(props.id_evento);
        }
        else {
            await actions.inscripcionEvento(props.id_evento)

        }

    }

    function updateModalState() {
        setModalState({ showModal: true });
    }

    const handleDelete = async () => {
        await actions.eliminarEvento(props.id_evento);
        navigate('/');
    }

    const updateEvent = async () => {
        await actions.obtenerOneEvento(props.id_evento);
        navigate(`/event/${props.id_evento}`);
    }

    // Verificar si la fecha del evento no ha pasado
    const eventoPendiente = fechaObjeto > new Date();


    return (
        <div className="container d-flex flex-column align-items-center justify-content-center mt-5">
            <div className="card border-0" style={{ maxWidth: "840px" }}>
                <div className="row">
                    <div className="col-md-4">
                        <img src={props.img} className="img-fluid rounded-start" alt="..." />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body pt-0">
                            <h2 className="card-title"><strong>{props.evento}</strong></h2>
                            <p className="card-text"><small className="text-body-secondary">{fechaFormateada}</small></p>
                            <h3><strong>Description</strong></h3>
                            <p>{props.descripcion}</p>
                            <p><strong>Ciudad:</strong> {props.ciudad}</p>
                            <p><strong>Ubicación:</strong> {props.ubicacion}</p>
                            <p><strong>Precio:</strong> {props.precio}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="d-flex flex-row justify-content-around align-items-center mb-3 gap-5">
                {eventoPendiente ? (
                    <>
                        <div>
                            {store.auth ? (
                                <button
                                    onClick={handleInscription}
                                    type="button"
                                    className={
                                        store.user?.id_eventos?.includes(parseInt(props.id_evento))
                                            ? 'btn btn-danger btn-lg'
                                            : props.asistentes >= props.maximo
                                                ? 'btn btn-300 btn-lg disabled'
                                                : 'btn btn-400 btn-lg'
                                    }
                                    disabled={
                                        !store.user?.id_eventos?.includes(parseInt(props.id_evento)) &&
                                        props.asistentes >= props.maximo
                                    }
                                >
                                    {store.user?.id_eventos?.includes(parseInt(props.id_evento))
                                        ? 'LEAVE EVENT'
                                        : 'JOIN EVENT'}
                                </button>
                            ) : (
                                <button className="btn btn-400" onClick={updateModalState}>
                                    JOIN US!
                                </button>
                            )}
                        </div>
                        <div className="d-flex flex-row">
                            <div className="p-2">
                                <button type="button" className="btn btn-300">
                                    <span className="badge text-bg-secondary">{props.asistentes}</span>
                                </button>
                            </div>
                            <div className="pt-3">
                                <p>of</p>
                            </div>
                            <div className="p-2">
                                <button type="button" className="btn btn-300">
                                    <span className="badge text-bg-secondary">{props.maximo}</span>
                                </button>
                            </div>
                            <div className="pt-3">
                                <p>To complete</p>
                            </div>
                        </div>
                        <div className="d-flex flex-column gap-1 p-2">
                            <button className={props.user_creador == store.user?.id ? "btn btn-danger" : "d-none"} onClick={handleDelete}>Delete Event</button>
                            <button className={props.user_creador == store.user?.id ? "btn btn-400" : "d-none"} onClick={updateEvent}>Update Event</button>
                        </div>
                    </>
                ) : (
                    <div className="alert alert-danger" role="alert">
                        <h1>"El evento ha finalizado"</h1>
                    </div>
                )}
            </div>


            <LoginModal show={modalState.showModal} onClose={() => setModalState({ showModal: false })} />
            <SignUpModal show={modalState.showModalUpdate} onClose={() => setModalState({ showModalUpdate: false })} />
        </div>
    );
}

EventDescriptionCard.propTypes = {
    evento: PropTypes.string,
    descripcion: PropTypes.string,
    asistentes: PropTypes.number,
    maximo: PropTypes.number,
    fecha: PropTypes.string,
    img: PropTypes.string
}
