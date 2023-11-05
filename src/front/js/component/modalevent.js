import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";

const ModalEvent = (props) => {

    const { store, actions } = useContext(Context)
    const [fechaActual, setFechaActual] = useState("");
    const [fechaInicio, setFechaInicio] = useState("");
    const [fechaFinal, setFechaFinal] = useState("");
    const [fechaLimite, setFechaLimite] = useState("");
    const [editar, setEditar] = useState(false);
    const formulario = document.getElementById("formEvent");
    const [eventFormData, setEventFormData] = useState(props.operacion=="Evento Nuevo"? {
      nombre_evento: "",
      descr_corta: "",
      fecha_ini: "",
      fecha_fin: "",
      ubicacion: "",
      logotipo: "",
      descr_larga: "",
      reglas: "",
      fecha_lim: "",
      hora_lim: '23:59',
      email_contacto: "",
      tel_contacto: "",
      nombre_contacto: "",
      costo: 0,
      id: ""
    }:store.userEvent[props.indice]);
      
      function cambiarFormatoFecha(fechaAnt){
        let day = fechaAnt.getDate().toString();
        if (day.length==1)
          day = "0"+ day;
        let year = fechaAnt.getFullYear();
        let month = fechaAnt.getMonth()+1;
        month = month.toString();
        if (month.length==1)
        month = "0"+ month;
        let nuevaFecha = year+"-"+month+"-"+day;
        return nuevaFecha;
      }

      useEffect(()=>{
        if (props.operacion=="Editar Evento"){
          setEventFormData(store.userEvent[props.indice]);
          console.log(eventFormData.fecha_ini)
          setFechaInicio(store.userEvent[props.indice].fecha_ini);
          setFechaFinal(store.userEvent[props.indice].fecha_fin);
          setFechaLimite(store.userEvent[props.indice].fecha_lim);
        } else {
          let eventData = {...eventFormData};
          for (let value in eventData){
            eventData[value] = "";
            if (value=="costo")
              eventData[value] = 0;
            if (value=="hora_lim")
              eventData[value] = "23:59";
          }
          setEventFormData(eventData);
          let currentDate = new Date();
          let actual = cambiarFormatoFecha(currentDate);
          setFechaActual(actual);
          setFechaInicio(actual);
          setFechaFinal(actual);
          setFechaLimite(actual);
        }
      }, [props.indice]);

    const handleEventChange = (e) => {
      console.log("TARGET", e.target);
      const { name, value } = e.target;
      setEventFormData({
        ...eventFormData,
        [name]: value,
      });
      if (name == "fecha_ini"){
          setFechaInicio(value);
          setFechaLimite(value);
          setFechaFinal(value)
        }
      if (name == "fecha_fin"){
        setFechaFinal(value);
        setFechaLimite(value);
      }
      if (name == "fecha_lim"){
        setFechaLimite(value);
      }
      setEditar(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.target)
        const nombre_evento=data.get("nombre_evento")
        const fecha_ini=data.get("fecha_ini")
        const fecha_fin=data.get("fecha_fin")
        const fecha_lim=data.get("fecha_lim")
        if (props.operacion=="Editar Evento" && !editar){
          console.log("no es necesario editar");
          alert("Evento actualizado");
          formulario.reset();
        }else if (fechaLimite>fechaFinal){
          alert("La fecha límite no debe ser mayor a la fecha de terminación");
          setFechaLimite(fechaFinal);
        } else if (fecha_ini=="" || fecha_fin=="" || fecha_lim==""){
            alert("No debe de haber datos vacíos")
          } else if (nombre_evento.length <3) {
            alert("El nombre debe tener al menos 2 caracteres")
          } else {
              let resp ="";
              let oper ="";
              if (props.operacion=="Evento Nuevo"){
                const {newEvent} = actions;
                resp = await newEvent(eventFormData);
                oper = "creado";
              } else {
                //Si estamos editando el evento
                const {editEvent} = actions;
                resp = await editEvent(eventFormData, props.indice);
                oper = "actualizado";
              }
              console.log({resp})
              console.log(resp.code)
              if (resp=="Ok"){
                //MODAL
                alert("Evento " + oper + " exitosamente");
                /*if (props.operacion=="Evento Nuevo"){
                  let text = "Registro exitoso\n¿Quieres agregar otro evento?";
                  if (confirm(text) == false) {
                    staticBackdrop.hide();
                  }
                } else {
                  alert("Registro exitoso")
                }*/
                formulario.reset();
              } else {
                alert("Error al registrar Evento")
              }
              //cleanEventData();
              formulario.reset();
              //window.location.reload(false)
              //preguntar si desea agregar otro evento?
            }
      };

    return(
        <div className="row">
            <form onSubmit={handleSubmit} id="formEvent">
                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="nombre_evento">
                          Nombre del Evento
                        </label>
                        <div className="form-outline mb-4">
                          <input
                            type="text"
                            id="nombre_evento"
                            name="nombre_evento"
                            maxLength="50"
                            value={eventFormData.nombre_evento}
                            className="form-control white-background-input"
                            onChange={handleEventChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="descr_corta">
                          Descripción corta
                        </label>
                        <div className="form-outline mb-4">
                        <textarea
                            type="text"
                            id="descr_corta"
                            name="descr_corta"
                            value={eventFormData.descr_corta}
                            rows="2"
                            maxLength="100"
                            className="form-control white-background-input"
                            onChange={handleEventChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="row mb-4">
                          <div className="col">
                            <div className="form-outline">
                              <label className="form-label" htmlFor="fecha_ini">
                                Fecha de inicio
                              </label>
                              <div className="form-outline">
                                <input
                                  type="date"
                                  id="fecha_ini"
                                  min={fechaActual}
                                  name="fecha_ini"
                                  value={fechaInicio}
                                  className="form-control white-background-input"
                                  onChange={handleEventChange}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col">
                            <div className="form-outline">
                              <label className="form-label" htmlFor="fecha_fin">
                                Fecha de terminación
                              </label>
                              <div className="form-outline">
                                <input
                                  type="date"
                                  id="fecha_fin"
                                  min={fechaInicio}
                                  name="fecha_fin"
                                  value={fechaFinal}
                                  className="form-control white-background-input"
                                  onChange={handleEventChange}
                                />
                              </div>
                            </div>
                          </div>
                      </div>

                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="ubicacion">
                          Dirección
                        </label>
                        <div className="form-outline mb-4">
                          <input
                            type="text"
                            id="ubicacion"
                            name="ubicacion"
                            value={eventFormData.ubicacion}
                            maxLength="100"
                            className="form-control white-background-input"
                            onChange={handleEventChange}
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="logotipo">
                          Logotipo
                        </label>
                        <div className="form-outline mb-4">
                          <input
                            type="text"
                            id="logotipo"
                            name="logotipo"
                            value={eventFormData.logotipo}
                            maxLength="150"
                            className="form-control white-background-input"
                            onChange={handleEventChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="descr_larga">
                          Descripción larga
                        </label>
                        <div className="form-outline mb-4">
                          <textarea
                            type="text"
                            id="descr_larga"
                            name="descr_larga"
                            value={eventFormData.descr_larga}
                            rows="3"
                            maxLength="250"
                            className="form-control white-background-input"
                            onChange={handleEventChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="reglas">
                          Reglas
                        </label>
                        <div className="form-outline mb-4">
                          <input
                            type="text"
                            id="reglas"
                            name="reglas"
                            value={eventFormData.reglas}
                            maxLength="150"
                            className="form-control white-background-input"
                            onChange={handleEventChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="nombre_contacto">
                          Nombre del contacto
                        </label>
                        <div className="form-outline mb-4">
                          <input
                            type="text"
                            id="nombre_contacto"
                            name="nombre_contacto"
                            value={eventFormData.nombre_contacto}
                            maxLength="150"
                            className="form-control white-background-input"
                            onChange={handleEventChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="row mb-4">
                        <div className="col">
                          <div className="form-outline">
                            <label className="form-label" htmlFor="email_contacto">
                              Email de contacto
                            </label>
                            <div className="form-outline">
                              <input
                                type="email"
                                id="email_contacto"
                                name="email_contacto"
                                value={eventFormData.email_contacto}
                                maxLength="50"
                                className="form-control white-background-input"
                                onChange={handleEventChange}
                                required
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col">
                          <div className="form-outline">
                            <label className="form-label" htmlFor="tel_contacto">
                              Teléfono de contacto
                            </label>
                            <div className="form-outline">
                              <input
                                type="text"
                                id="tel_contacto"
                                name="tel_contacto"
                                value={eventFormData.tel_contacto}
                                maxLength="15"
                                className="form-control white-background-input"
                                onChange={handleEventChange}
                                required
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row mb-4">
                        <div className="col">
                          <div className="form-outline">
                            <label className="form-label" htmlFor="fecha_lim">
                              Fecha límite
                            </label>
                            <div className="form-outline">
                              <input
                                type="date"
                                id="fecha_lim"
                                name="fecha_lim"
                                value={fechaLimite}
                                max={fechaFinal}
                                className="form-control white-background-input"
                                onChange={handleEventChange}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col">
                          <div className="form-outline">
                            <div className="form-outline">
                              <label className="form-label" htmlFor="fecha_lim">
                                Hora límite
                              </label>
                              <input
                                type="time"
                                id="hora_lim"
                                name="hora_lim"
                                value={eventFormData.hora_lim}
                                className="form-control white-background-input"
                                onChange={handleEventChange}
                                required
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col">
                          <div className="form-outline">
                            <label className="form-label" htmlFor="costo">
                              Costo
                            </label>
                            <div className="form-outline">
                              <input
                                type="number"
                                id="costo"
                                name="costo"
                                value={eventFormData.costo}
                                min = "1"
                                step="0.01"
                                placeholder="$"
                                className="form-control white-background-input"
                                onChange={handleEventChange}
                                required
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='text-center'>
                        <button type="submit" className="btn btn-primary btn-block mx-4 mb-4" data-bs-dismiss={props.operacion=="Editar Evento"? "modal":""}>
                          Guardar
                        </button>
                        <button type="button" className="btn btn-secondary btn-block mb-4" data-bs-dismiss="modal">Cancelar</button>
                      </div>
              </form>
        </div>
);
}

export default ModalEvent;