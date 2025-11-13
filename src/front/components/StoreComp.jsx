import React, { useState } from "react";
import tiendaServices from "../services/tienda.services";
import useGlobalReducer from "../hooks/useGlobalReducer";
import CloudinaryComponent from "./cloudinary";
import { useNavigate } from "react-router-dom";


export const StoreComp = () => {

  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate()
  const [tiendaData, setTiendaData] = useState(store.tienda || {
    nombre_tienda: "",
    descripcion_tienda: "",
    categoria_principal: "",
    telefono_comercial: "",
    redes_sociales: "",
    logo_url: ""
  });
  const defaultLogo = 'https://res.cloudinary.com/dqupxyrvx/image/upload/v1762548593/tfw6vouoljoki3eq75wp.png'
  const handleSubmit = (e) => {
    e.preventDefault();
    if (store.tienda?.nombre_tienda) {
      //llamar a editar tienda
      tiendaServices.editar_tienda(tiendaData).then((data) => {
        if (data.tienda) {
          dispatch({ type: "editar_tienda", payload: data.tienda })
          localStorage.setItem('tienda', JSON.stringify(data.tienda))
          navigate('/mi_tienda')
        }
        if (!data.success) {
          alert(data.error)
        }
      })

    } else {
      tiendaServices.crearTienda(tiendaData).then((data) => {
        if (data.tienda) {
          dispatch({ type: "crear_tienda", payload: data.tienda })
          localStorage.setItem('tienda', JSON.stringify(data.tienda))
          navigate('/mi_tienda')
        }
      })
    }

  };

  const handleChange = (e) => {
    const { name, value } = e.target
    setTiendaData({ ...tiendaData, [name]: value })
  }


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
          <h3 className="fw-semibold py-2 mb-0">🛒 {store.tienda?.nombre_tienda ? 'Editar Tienda' : 'Crear Tienda'}</h3>
        </div>

        <form onSubmit={handleSubmit}>
          {/* --- Bloque superior --- */}
          <div className="d-flex justify-content-between align-items-center">
            <img width={'300px'} src={tiendaData.logo_url || defaultLogo} alt={tiendaData.nombre_tienda} />

            <div className="p-4 border border-danger rounded-4 bg-light" style={{ maxWidth: "500px", width: "100%" }}>
              <label htmlFor="imagen" className="form-label fw-bold text-danger">
                Logo de la tienda
              </label>
              <CloudinaryComponent tienda={true} data={tiendaData} returnUrl={setTiendaData} />
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
                name="nombre_tienda"
                onChange={handleChange}
                value={tiendaData.nombre_tienda}
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
                name="cif"
                onChange={handleChange}
                value={tiendaData.cif}
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
                name="categoria_principal"
                onChange={handleChange}
                value={tiendaData.categoria_principal}
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
                name="telefono_comercial"
                onChange={handleChange}
                value={tiendaData.telefono_comercial}
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
                name="redes_sociales"
                onChange={handleChange}
                value={tiendaData.redes_sociales}
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
                name="descripcion_tienda"
                onChange={handleChange}
                value={tiendaData.descripcion_tienda}
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