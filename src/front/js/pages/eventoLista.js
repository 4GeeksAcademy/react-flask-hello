import React, { useContext, useState, useEffect } from "react";
import '../../styles/accountpage.css'
import "../../styles/eventList.css";
import { Context } from "../store/appContext";
import ModalEvent from "../component/modalevent"
import { Link, useNavigate } from "react-router-dom";
const EventoLista = () => {

    const { store, actions } = useContext(Context)
    const navigate = useNavigate();

    useEffect(()=>{
        if (!store.accessToken) {
            navigate("/");
          }
      }, [store.accessToken]);

    const [selectedEvent, setSelectedEvent] = useState(0);
    const [operation, setOperation] = useState("Evento Nuevo");
    const [indice, setIndice] = useState(null);
    const [idEvento, setIdEvento] = useState(0);
    const [eventToDelete, setEventToDelete] = useState(null);
    const [eventIdDelete, setEventIdDelete] = useState(null);

    useEffect(()=>{
        actions.getUserEvent()
        setOperation("Evento Nuevo");
      }, []);

    const handleEdit = (e, index, id_evento) => {
        //setSelectedEvent(eventData.find(t => t.id == e.target.id))
        setOperation("Editar Evento");
        setIndice(index);
        setIdEvento(id_evento);
    }

    const deleteEvento = (id, nombre, index) => {
        /*const newTodos = todoArray.filter(todo => todo.id == id)
        setTodoArrays(newTodos)*/
        setEventIdDelete(id);
        setEventToDelete(nombre);
        setIndice(index);
    }
    const createEvento = () => {
        setOperation("Evento Nuevo");
        setIndice("n");
    }
    const handleChange = (e, propertyName) => {
        /*const currentEvent = Object.assign({}, selectedEvent);
        currentEvent[propertyName] = e.target.value;
        setSelectedEvent(currentEvent)*/
    }
    return (
        <div className="contSuperior fatherBody" style={{minHeight:"500px"}}>
            <div className="row text-center mb-3">
                <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                    <Link to="/cuenta">
                        <button className="btn btn-primary me-md-2" type="button">Volver a Perfil</button>
                    </Link>
                    <button className="btn btn-primary" onClick={() => createEvento()} data-bs-toggle="modal" data-bs-target="#staticBackdrop" type="button">Crear Evento</button>
                </div>
            </div>
            <table className="table align-middle mb-0 bg-white" id='theEventstable'>
                <thead className="bg-light">
                    <tr>
                        <th>Nombre del Evento</th>
                        <th>Dirección</th>
                        <th>Fecha de Inicio</th>
                        <th>Fecha de Término</th>
                        <th>Fecha límite</th>
                        <th>Costo</th>
                    </tr>
                </thead>
                <tbody>
                    {store.userEvent.map((theEvent, index) => (
                        <tr key={theEvent.id}>
                            <td>
                                <div className="d-flex align-items-center">
                                    <img
                                        src={`https://mdbootstrap.com/img/new/avatars/${theEvent.id}.jpg`}
                                        alt=""
                                        style={{ width: '45px', height: '45px' }}
                                        className="rounded-circle"
                                    />
                                    <div className="ms-3">
                                        <p className="fw-bold mb-1"></p>
                                        <p className="text-muted mb-0">{theEvent.nombre_evento}</p>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <p className="fw-normal mb-1">{theEvent.ubicacion}</p>
                            </td>
                            <td>{theEvent.fecha_ini}</td>
                            <td>{theEvent.fecha_fin}</td>
                            <td>{theEvent.fecha_lim}</td>
                            <td>{theEvent.costo}</td>
                                <td>
                                    <div className="row">
                                        <div className="col-4">
                                            <button id={theEvent.id} onClick={(e) => handleEdit(e, index, theEvent.id)} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                                Editar
                                            </button>
                                        </div>
                                        <div className="col-4">
                                            <button className="btn btn-primary" onClick={() => deleteEvento(theEvent.id, theEvent.nombre_evento, index)} data-bs-toggle="modal" data-bs-target="#staticBackdrop1">
                                                Eliminar
                                            </button>
                                        </div>
                                        <div className="col-4">
                                            <button className="btn btn-primary">
                                                Participantes
                                            </button>
                                        </div>
                                    </div>
                                </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
           <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">{operation}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <ModalEvent operacion={operation} indice={indice} idEvent={idEvento}/>
                        </div>
                        <div className="modal-footer">
                            {/*<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                            <button type="button" className="btn btn-primary">Guardar</button>*/}
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="staticBackdrop1" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdrop1Label" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdrop1Label">Eliminar Evento</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            ¿Estás seguro que quieres eliminar el evento {eventToDelete}?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                            <button type="button" className="btn btn-primary" onClick={() => actions.deleteEvent(eventIdDelete, indice)} data-bs-dismiss="modal">Eliminar</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default EventoLista;


