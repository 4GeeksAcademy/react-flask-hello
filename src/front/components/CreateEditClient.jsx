import React from "react";

import logo from "../assets/img/Logo.png"

export const CreateEditClient = () => {

  return (
    <>
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light py-5">
      <div className="card shadow-lg border-0 rounded-4" style={{ maxWidth: "900px", width: "100%" }}>
        <div
          className="card-header text-white rounded-top-4"
          style={{
           background: "linear-gradient(90deg, #ff0000 0%, #f21010 50%, #a00000 100%)",

          }}
        >
          <h3 className="mb-0 fw-semibold text-center py-2">🧾 Crear Cliente</h3>
        </div>

        <div className="card-body p-4">
          <form className="needs-validation" noValidate>
            {/* --- Datos personales --- */}
            <h5 className="text-danger border-bottom pb-2 mb-3">Datos Personales</h5>
            <div className="row g-3">
              <div className="col-md-6">
                <label htmlFor="nombre" className="form-label fw-semibold">
                  Nombre
                </label>
                <input type="text" className="form-control" id="nombre" placeholder="Ej: Juan" required />
              </div>

              <div className="col-md-6">
                <label htmlFor="apellido" className="form-label fw-semibold">
                  Apellido
                </label>
                <input type="text" className="form-control" id="apellido" placeholder="Ej: Pérez" required />
              </div>

              <div className="col-md-6">
                <label htmlFor="nickname" className="form-label fw-semibold">
                  NickName
                </label>
                <input type="text" className="form-control" id="nickname" placeholder="Ej: Spidy" required />
              </div>

              <div className="col-md-6">
                <label htmlFor="telefono" className="form-label fw-semibold">
                  Teléfono
                </label>
                <input type="tel" className="form-control" id="telefono" placeholder="+34 600 000 000" />
              </div>

              <div className="col-md-4">
                <label htmlFor="tipoCliente" className="form-label fw-semibold">
                  Tipo de Usuario
                </label>
                <select id="tipoCliente" className="form-select">
                  <option>Seleccione...</option>
                  <option value="particular">Cliente</option>
                  <option value="empresa">Empresa</option>
                  
                </select>
              </div>

              <div className="col-md-4">
                <label htmlFor="dni" className="form-label fw-semibold">
                  DNI / NIF / Pasaporte
                </label>
                <input type="text" className="form-control" id="dni" />
              </div>

              <div className="col-md-4">
                <label htmlFor="fechaNacimiento" className="form-label fw-semibold">
                  Fecha de Nacimiento
                </label>
                <input type="date" className="form-control" id="fechaNacimiento" />
              </div>
            </div>

            {/* --- Dirección --- */}
            <h5 className="text-danger border-bottom pb-2 mt-4 mb-3">Dirección</h5>
            <div className="row g-3">
              <div className="col-12">
                <label htmlFor="direccion" className="form-label fw-semibold">
                  Dirección
                </label>
                <input type="text" className="form-control" id="direccion" placeholder="Calle, número, ciudad" />
              </div>

              <div className="col-md-6">
                <label htmlFor="ciudad" className="form-label fw-semibold">
                  Ciudad
                </label>
                <input type="text" className="form-control" id="ciudad" />
              </div>

              <div className="col-md-3">
                <label htmlFor="codigoPostal" className="form-label fw-semibold">
                  Código Postal
                </label>
                <input type="text" className="form-control" id="codigoPostal" />
              </div>

              <div className="col-md-3">
                <label htmlFor="pais" className="form-label fw-semibold">
                  País
                </label>
                <input type="text" className="form-control" id="pais" defaultValue="España" />
              </div>
            </div>

            {/* --- Empresa y estado --- */}
            <h5 className="text-danger border-bottom pb-2 mt-4 mb-3">Información Adicional</h5>
            <div className="row g-3">
              <div className="col-md-6">
                <label htmlFor="empresa" className="form-label fw-semibold">
                  Empresa (opcional)
                </label>
                <input type="text" className="form-control" id="empresa" />
              </div>

              <div className="col-md-6">
                <label htmlFor="estado" className="form-label fw-semibold">
                  Estado
                </label>
                <select id="estado" className="form-select">
                  <option value="activo">Activo</option>
                  <option value="inactivo">Inactivo</option>
                  <option value="pendiente">Pendiente</option>
                </select>
              </div>

              <div className="col-12">
                <label htmlFor="preferencias" className="form-label fw-semibold">
                  Preferencias
                </label>
                <input type="text" className="form-control" id="preferencias" placeholder="Ej: facturación electrónica" />
              </div>

              <div className="col-12">
                <label htmlFor="notas" className="form-label fw-semibold">
                  Notas
                </label>
                <textarea id="notas" className="form-control" rows="3" placeholder="Observaciones del cliente..." />
              </div>

              <div className="col-md-6">
                <label htmlFor="avatar" className="form-label fw-semibold">
                  Foto de Perfil
                </label>
                <input className="form-control" type="file" id="avatar" accept="image/*" />
              </div>
            </div>

            {/* --- Botones --- */}
            <div className="mt-5 text-end">
              <button type="reset" className="btn btn-outline-secondary me-2">
                <i className="bi bi-arrow-counterclockwise"></i> Limpiar
              </button>
              <button type="submit" className="btn btn-danger px-4">
                <i className="bi bi-save"></i> Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  
</>
  );
};