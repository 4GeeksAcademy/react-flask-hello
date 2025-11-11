import React, {useState} from "react";
import tiendaServices from "../services/tienda.services";
import useGlobalReducer from "../hooks/useGlobalReducer";


export const StoreComp = () => {

  const {store,dispatch} = useGlobalReducer();
  const [tiendaData,setTiendaData] = useState(store.tienda);

  const handleSubmit = (e) => {
    e.preventDefault();
    tiendaServices.crearTienda(tiendaData).then((data) => {
      if (data.tienda) dispatch({type: "crear_tienda", payload: data.tienda})
    })
    alert("Formulario de producto enviado (solo vista previa).");
  };


  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light py-5">
      <div
        className="card shadow-lg border-0 rounded-4 p-4"
        style={{ maxWidth: "850px", width: "100%" }}
      >
        <div
          className="card-header text-white text-center rounded-4 mb-4"
          style={{
            background:
              "linear-gradient(90deg, #ff0000 0%, #ff7a00 50%, #fff200 100%)",
          }}
        >
          <h3 className="fw-semibold py-2 mb-0">🛒 Crear Tienda</h3>
        </div>

        <form onSubmit={handleSubmit}>
          {/* --- Bloque superior --- */}
                  <div className="d-flex justify-content-center">
            <div className="p-4 border border-danger rounded-4 bg-light" style={{ maxWidth: "500px", width: "100%" }}>
              <label htmlFor="imagen" className="form-label fw-bold text-danger">
                Imagen o logo de la tienda
              </label>
              <input
                className="form-control border-danger"
                type="file"
                id="imagen"
                accept="image/*"
              />
              <div className="form-text text-muted mt-2">
                Formatos admitidos: <strong>JPG, PNG, WEBP</strong> — Máx. <strong>5MB</strong>
              </div>
            </div>
          </div>
          
          <div className="mb-4">
            <div className="mb-3">
              <label htmlFor="nombre" className="form-label fw-semibold">
                Nombre de la Tienda
              </label>
              <input
                type="text"
                className="form-control border-danger"
                id="nombre"
                placeholder=""
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="cif" className="form-label fw-semibold">
                CIF
              </label>
              <input
                type="text"
                className="form-control border-danger"
                id="cif"
                placeholder=""
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="categoria" className="form-label fw-semibold">
                Categoria
              </label>
              <input
                type="text"
                className="form-control border-danger"
                id="categoria"
                placeholder=""
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="telefono" className="form-label fw-semibold">
                Telefono
              </label>
              <input
                type="text"
                className="form-control border-danger"
                id="telefono"
                placeholder=""
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="redes_sociales" className="form-label fw-semibold">
                Redes Sociales
              </label>
              <input
                type="text"
                className="form-control border-danger"
                id="redes_sociales"
                placeholder=""
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="descripcion" className="form-label fw-semibold">
                Descripción
              </label>
              <textarea
                id="descripcion"
                className="form-control border border-danger"
                rows="3"
                placeholder="Agrega una breve descripción de tu tienda o servicio que quieres ofertar..."
              ></textarea>
            </div>
          </div>

  





          {/* --- Botones --- */}
          <div className="text-end mt-4">
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
  );
};