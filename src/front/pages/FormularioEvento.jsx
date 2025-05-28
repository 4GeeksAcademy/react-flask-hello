import React from "react";

const FormularioEvento = () => {
  return (
    <div className="homepage-container pt-5 pb-5 d-flex justify-content-center"> {/* centrado horizontal */}
      <div className="container" style={{ maxWidth: "900px" }}>
        <h1 className="text-center mb-4">Crear evento</h1>

        <form id="eventForm" className="row g-3 p-4 rounded shadow" style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
          {/* p-4, rounded y shadow para sombra y bordes redondeados */}
          {/* fontFamily para usar tipografía similar al form de registro */}

          <div className="col-lg-6 col-12">
            <label htmlFor="nombre" className="form-label">Nombre del evento*</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              required
              className="form-control"
            />
          </div>

          <div className="col-lg-6 col-12">
            <label htmlFor="fechaHora" className="form-label">Fecha y hora*</label>
            <input
              type="datetime-local"
              id="fechaHora"
              name="fechaHora"
              required
              className="form-control"
            />
          </div>

          <div className="col-12">
            <label htmlFor="ubicacion" className="form-label">Ubicación</label>
            <input
              type="text"
              id="ubicacion"
              name="ubicacion"
              className="form-control"
              placeholder=""
            />
          </div>

          <div className="col-12">
            <label htmlFor="descripcion" className="form-label">Descripción</label>
            <textarea
              id="descripcion"
              name="descripcion"
              rows="3"
              className="form-control"
              placeholder="Opcional"
            ></textarea>
          </div>

          <div className="col-12">
            <label htmlFor="invitados" className="form-label">
              Correos electrónicos para invitaciones (separados por coma)
            </label>
            <input
              type="text"
              id="invitados"
              name="invitados"
              className="form-control"
              placeholder="ejemplo1@mail.com, ejemplo2@mail.com"
            />
          </div>

          <div className="col-lg-6 col-12">
            <label htmlFor="maxInvitados" className="form-label">Cantidad máxima de invitados</label>
            <input
              type="number"
              id="maxInvitados"
              name="maxInvitados"
              min="1"
              className="form-control"
              placeholder="Opcional"
            />
          </div>

          <div className="col-lg-6 col-12">
            <label htmlFor="tipoActividad" className="form-label">Tipo de actividad</label>
            <select id="tipoActividad" name="tipoActividad" className="form-select">
              <option value="">Seleccionar...</option>
              <option value="asado">Asado</option>
              <option value="boda">Boda</option>
              <option value="cumpleaños">Cumpleaños</option>
              <option value="otro">Otro</option>
            </select>
          </div>

          <div className="col-lg-6 col-12">
            <label htmlFor="vestimenta" className="form-label">Tipo de vestimenta recomendada</label>
            <input
              type="text"
              id="vestimenta"
              name="vestimenta"
              className="form-control"
              placeholder="Opcional"
            />
          </div>

          <div className="col-lg-6 col-12 d-flex align-items-center">
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                id="aceptaColaboradores"
                name="aceptaColaboradores"
                defaultChecked
              />
              <label className="form-check-label" htmlFor="aceptaColaboradores">
                Acepta colaboradores
              </label>
            </div>
          </div>

          <div className="col-12">
            <label htmlFor="servicios" className="form-label">Servicios necesarios</label>
            <input
              type="text"
              id="servicios"
              name="servicios"
              className="form-control"
              placeholder="Ej: fotógrafo, cocinero (separar por coma)"
            />
          </div>

          <div className="col-12">
            <label htmlFor="recursos" className="form-label">Recursos necesarios</label>
            <input
              type="text"
              id="recursos"
              name="recursos"
              className="form-control"
              placeholder="Ej: comida, bebida, mesas (separar por coma)"
            />
          </div>

          <div className="col-12 d-flex justify-content-center mt-4">
            <button type="submit" className="btn btn-primary btn-enviarForm-evento">
              Crear Evento
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormularioEvento;

