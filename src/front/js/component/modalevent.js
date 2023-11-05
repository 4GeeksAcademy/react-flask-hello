import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";

const modalEvent = () => {

    const { store, actions } = useContext(Context)

    return(
                <div>
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
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                            <button type="button" className="btn btn-primary">Guardar</button>
                        </div>
                </div>
    );
}

export default modalEvent;