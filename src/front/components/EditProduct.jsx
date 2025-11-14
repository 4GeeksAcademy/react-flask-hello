import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import productServices from "../services/product.services";
import useGlobalReducer from "../hooks/useGlobalReducer";
import CloudinaryComponent from "./cloudinary";

const EditProduct = () => {

    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();
    const [producto, setProducto] = useState(store.producto);
    
    const handleEdit = (e) => {
        e.preventDefault();
        if (store.producto?.nombre_producto) {
            productServices.editar_productos(producto).then((data) => {
                if (data.productos) {
                    dispatch({type: "editar_producto", payload: data.productos})
                    localStorage.setItem('productos',JSON.stringify(data.productos))
                    navigate('/mi_tienda')
                }
                if (!data.success) {
                    alert(data.error)
                }
            })
        }
    }
    const handleChange = (e) => {
        const { name, value } = e.target
        setProducto({ ...producto, [name]: value })
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
          <h3 className="fw-semibold py-2 mb-0">🛒Editar productos</h3>
        </div>

        <form onSubmit={handleEdit}>
          {/* --- Bloque superior --- */}
          <div className="mb-4">
            <div className="mb-3">
              <label htmlFor="nombre" className="form-label fw-semibold">
                Nombre del Producto
              </label>
              <input
                type="text"
                className="form-control"
                id="nombre"
                placeholder=""
                required
                name="nombre_producto"
                onChange={handleChange}
                value={producto.nombre_producto}
              />
            </div>

            <div className="mb-3 border border-danger rounded p-3" >
              <label htmlFor="imagen" className="form-label fw-semibold">
                Imagen del Producto
              <img src={producto.imagenes} alt={producto.nombre_producto || 'carga una imagen'} />
              </label>

              <CloudinaryComponent product={true} returnUrl={setProducto} state={producto} product_id={producto.id} />
              <div className="form-text">
                Formatos admitidos: JPG, PNG, WEBP — Máx. 5MB
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="descripcion" className="form-label fw-semibold">
                Descripción
              </label>
              <textarea
                id="descripcion"
                className="form-control border border-danger"
                rows="3"
                placeholder="Agrega una breve descripción del producto o servicio..."
                name="descripcion_producto"
                onChange={handleChange}
                value={producto.descripcion_producto}
              ></textarea>
            </div>
          </div>

          {/* --- Bloque inferior --- */}
          <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
            <h5 className="text-danger border-bottom pb-2 mb-3">
              📦 Detalles del Producto
            </h5>

            <div className="row g-3">
              <div className="col-md-6">
                <label htmlFor="categoria" className="form-label fw-semibold">
                  Categoría
                </label>
                <select id="categoria"
                  name="categoria_producto"
                  onChange={handleChange}
                  value={producto.categoria_producto}
                  className="form-select border-danger focus-ring focus-ring-danger" defaultValue="">
                  <option value="" disabled >
                    Selecciona una categoría
                  </option>
                  <option value="ropa">Ropa</option>
                  <option value="electronica">Electrónica</option>
                  <option value="hogar">Hogar</option>
                  <option value="belleza">Belleza</option>
                  <option value="deportes">Deportes</option>
                  <option value="otros">Otros</option>
                </select>
              </div>


              <div className="col-md-6">
                <label htmlFor="dimensiones" className="form-label fw-semibold">
                  Dimensiones
                </label>
                <input
                  type="text"
                  className="form-control border border-danger"
                  id="dimensiones"
                  placeholder="Ej: 10x20x100 cm"
                  name="dimensiones"
                  onChange={handleChange}
                  value={producto.demensiones}
                />
              </div>


              <div className="col-md-4">
                <label htmlFor="peso" className="form-label fw-semibold">
                  Peso (kg)
                </label>
                <input
                  type="number"
                  step="0.1"
                  className="form-control border border-danger"
                  id="peso"
                  placeholder="Ej: 0.25"
                  name="peso"
                  onChange={handleChange}
                  value={producto.peso}
                />
              </div>

              <div className="col-md-4">
                <label htmlFor="precio" className="form-label fw-semibold">
                  Precio (€)
                </label>
                <input
                  type="number"
                  step="1"
                  className="form-control border border-danger"
                  id="precio"
                  placeholder="Ej: 25.99"
                  name="precio"
                  onChange={handleChange}
                  value={producto.precio}
                />
              </div>
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
}
export default EditProduct