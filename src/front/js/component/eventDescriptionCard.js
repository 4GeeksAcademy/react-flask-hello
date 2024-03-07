import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";
import { LoginModal } from "./LoginModal";
import { SignUpModal } from "./SignUpModal";
import { useNavigate } from 'react-router-dom';
import { DeleteEventModal } from "./DeleteEventModal";

export const EventDescriptionCard = (props) => {
    const navigate = useNavigate();
    const { store, actions } = useContext(Context);
    const [modalState, setModalState] = useState({
        showModal: false,
        showModalUpdate: false,
        showModalDelete: false,
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
        setModalState({ showModalDelete: true });
    }

    const updateEvent = async () => {
        await actions.obtenerOneEvento(props.id_evento);
        navigate(`/event/${props.id_evento}`);
    }

    // Verificar si la fecha del evento no ha pasado
    const eventoPendiente = fechaObjeto > new Date();


    return (
        <div className="container d-flex flex-column justify-content-center mt-md-5 ">
            <div className="card border-0" style={{ maxWidth: "840px" }}>
                <div className="row">
                    <div className="col-md-6">
                        <img src={props.img} className="img-fluid rounded-start col-12" alt="..." />
                    </div>
                    <div className="col-md-6 ">
                        <div className="card-body pt-0">
                            <h2 className="card-title"><strong>{props.evento}</strong></h2>
                            <p className="card-text"><small className="text-body-secondary">{fechaFormateada}</small></p>
                            <h3><strong>Description:</strong></h3>
                            <p>{props.descripcion}</p>
                            <p><strong>City: :</strong> {props.ciudad}</p>
                            <p><strong>Ubication:</strong> {props.ubicacion}</p>
                            <p><strong>Price:</strong> {props.precio}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="d-flex flex-row flex-wrap my-3">
                {eventoPendiente ? (
                    <>
                        <div className="col-12 col-md-4 d-flex justify-content-center mb-3">
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
                        <div className="d-flex flex-row col-12 col-md-6 justify-content-center mb-3">
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
                        <div className="d-flex flex-column gap-1 col-12 col-md-2">
                            <button className={props.user_creador == store.user?.id ? "btn btn-300 to-be-hoved text-white " : "d-none"} onClick={updateEvent}>Update</button>
                            <button className={props.user_creador == store.user?.id ? "btn btn-danger" : "d-none"} onClick={handleDelete}>Delete</button>
                        </div>
                    </>
                ) : (
                    <div className="alert alert-danger" role="alert">
                        <h1>"The event has ended"</h1>
                    </div>
                )}
            </div>


            <LoginModal show={modalState.showModal} onClose={() => setModalState({ showModal: false })} />
            <SignUpModal show={modalState.showModalUpdate} onClose={() => setModalState({ showModalUpdate: false })} />
            <DeleteEventModal show={modalState.showModalDelete} onClose={() => setModalState({ showModalDelete: false })} id_evento={props.id_evento}/>
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
