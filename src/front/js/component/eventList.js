import React, { useContext, useState, useEffect } from "react";
import '../../styles/accountpage.css'
import "../../styles/eventList.css";
import { Context } from "../store/appContext";
import { useLocation } from "react-router-dom";
const EventList = () => {

    const { store, actions } = useContext(Context)
    const [userEvents, setUserEvents] = useState(null);
    const params = useLocation();

    let eventData =[]
    useEffect(()=>{
        console.log("ID USUARIO:", params.state.id)
        if (params){
            actions.getUserEvent(params.state.id).then(data=>setUserEvents(data))
            eventData = [...userEvents]
        }
      }, [])

      
      if (!eventData){
          eventData = [
              {
                "id": 1,
                "nombre_evento": 'JAM ON IT',
                "descr_corta":  "",
                "fecha_ini": '13/11/2023',
                "fecha_fin": '13/11/2024',
                "ubicacion": 'Colombia',
                "logotipo":  "",
                "descr_larga":  "",
                "reglas":  "",
                "fecha_lim":  "",
                "email_contacto":  "",
                "tel_contacto":  "",
                "nombre_contacto":  "",
                "costo": 0
              }
          ];
      }
    const [selectedEvent, setSelectedEvent] = useState(eventData[0]);
    const handleEdit = (e) => {
        setSelectedEvent(eventData.find(t => t.id == e.target.id))
    }

    const deleteTodo = (id) => {
        const newTodos = todoArray.filter(todo => todo.id == id)
        setTodoArrays(newTodos)
    }
    const handleChange = (e, propertyName) => {
        const currentEvent = Object.assign({}, selectedEvent);
        currentEvent[propertyName] = e.target.value;
        setSelectedEvent(currentEvent)
    }
    return (
        <div className="fatherBody">
            <div className="row">
                <div className="col-3"> </div>
                <div className="col-3"> </div>
                <div className="col-3"> <button id="buttonNew" className="btn btn-primary">
                    Nuevo
                </button> </div>
                <div className="col-3"> </div>
            </div>

            <table className="table align-middle mb-0 bg-white" id='theEventstable'>
                <thead className="bg-light">
                    <tr>
                        <th>Nombre del Evento</th>
                        <th>Ubicación</th>
                        <th>Fecha límite</th>
                        <th>Costo</th>
                    </tr>
                </thead>
                <tbody>

                    {eventData.map((theEvent) => (
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
                                        <p className="text-muted mb-0">{theEvent.ubicacion}</p>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <p className="fw-normal mb-1">{theEvent.ubicacion}</p>
                            </td>
                            <td>{theEvent.fecha_lim}</td>
                            <td>{theEvent.costo}</td>
                                <td>
                                    <div className="row">
                                        <div className="col-4">
                                            <button id={theEvent.id} onClick={(e) => handleEdit(e)} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                                Editar
                                            </button>
                                        </div>
                                        <div className="col-4">
                                            <button className="btn btn-primary" onClick={() => deleteTodo(theEvent.id)}>
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
                            <h5 className="modal-title" id="staticBackdropLabel">Editar</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="row">
                                    <form className="form-floating">
                                        <input onChange={(e) => handleChange(e, "nombre_evento")} type="text" className="form-control" id="eventName" placeholder="nombre" value={selectedEvent.nombre_evento} />
                                        <label htmlFor="eventName">Nombre:</label>
                                    </form>
                                </div>
                                <div className="row">
                                    <form className="form-floating">
                                        <input onChange={(e) => handleChange(e, "descr_corta")} type="text" className="form-control" id="eventDescription" placeholder="nombre" value={selectedEvent.descr_corta} />
                                        <label htmlFor="eventDescription">Descripcion corta:</label>
                                    </form>

                                </div>
                                <div className="row">
                                    <form className="form-floating">
                                        <input onChange={(e) => handleChange(e, "fecha_ini")} type="text" className="form-control" id="eventDate" placeholder="Fecha de inicio" value={selectedEvent.fecha_ini} />
                                        <label htmlFor="eventDate">Fecha de inicio:</label>
                                    </form>
                                </div>
                                <div className="row">
                                    <form className="form-floating">
                                        <input onChange={(e) => handleChange(e, "fecha_fin")} type="text" className="form-control" id="eventEndDate" placeholder="fecha final" value={selectedEvent.fecha_fin} />
                                        <label htmlFor="eventEndDate">Fecha de final:</label>
                                    </form>
                                </div>
                                <div className="row">
                                    <form className="form-floating">
                                        <input onChange={(e) => handleChange(e, "ubicacion")} type="text" className="form-control" id="eventLocation" placeholder="Ubicacion" value={selectedEvent.ubicacion} />
                                        <label htmlFor="eventLocation">Location:</label>
                                    </form>

                                </div>
                                <div className="row">
                                    <form className="form-floating">
                                        <input onChange={(e) => handleChange(e, "logotipo")} type="text" className="form-control" id="eventLogo" placeholder="Logotipo" value={selectedEvent.logotipo} />
                                        <label htmlFor="eventLogo">Logo:</label>
                                    </form>

                                </div>
                                <div className="row">
                                    <form className="form-floating">
                                        <input onChange={(e) => handleChange(e, "descr_larga")} type="text" className="form-control" id="eventDecriptionLong" placeholder="Descripcion larga" value={selectedEvent.descr_larga} />
                                        <label htmlFor="eventDescriptionLong">Descripción larga:</label>
                                    </form>

                                </div>
                                <div className="row">
                                    <form className="form-floating">
                                        <input onChange={(e) => handleChange(e, "reglas")} type="text" className="form-control" id="eventRules" placeholder="Reglas" value={selectedEvent.reglas} />
                                        <label htmlFor="eventRules">Reglas:</label>
                                    </form>

                                </div>
                                <div className="row">
                                    <form className="form-floating">
                                        <input onChange={(e) => handleChange(e, "fecha_lim")} type="text" className="form-control" id="eventLimiteDate" placeholder="Fecha limite" value={selectedEvent.fecha_lim} />
                                        <label htmlFor="eventLimiteDate">Fecha limite:</label>
                                    </form>

                                </div>
                                <div className="row">
                                    <form className="form-floating">
                                        <input onChange={(e) => handleChange(e, "nombre_contacto")} type="text" className="form-control" id="eventContactName" placeholder="Nombre de contacto" value={selectedEvent.nombre_contacto} />
                                        <label htmlFor="eventContactName">Nombre de contacto:</label>
                                    </form>
                                </div>
                                <div className="row">
                                    <form className="form-floating">
                                        <input onChange={(e) => handleChange(e, "email_contacto")} type="text" className="form-control" id="eventContactEmail" placeholder="Email de contacto" value={selectedEvent.email_contacto} />
                                        <label htmlFor="eventContactEmail">Email de contacto:</label>
                                    </form>
                                </div>
                                <div className="row">
                                    <form className="form-floating">
                                        <input onChange={(e) => handleChange(e, "tel_contacto")} type="text" className="form-control" id="eventContactTel" placeholder="Tel de contacto" value={selectedEvent.tel_contacto} />
                                        <label htmlFor="eventContactTel">Teléfono de contacto:</label>
                                    </form>
                                </div>
                                <div className="row">
                                    <form className="form-floating">
                                        <input input onChange={(e) => handleChange(e, "costo")} type="text" className="form-control" id="eventCost" placeholder="Costo de inscripcion" value={selectedEvent.costo} />
                                        <label htmlFor="eventCost">Costo de inscripción:</label>
                                    </form>

                                </div>

                            </div>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Cambiar</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default EventList;


