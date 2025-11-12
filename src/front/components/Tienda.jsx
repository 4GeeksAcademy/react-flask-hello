import React, { useEffect, useState } from "react";

import logo from "../assets/img/Logo.png"
import useGlobalReducer from "../hooks/useGlobalReducer";
import userServices from "../services/user.services";
import CloudinaryComponent from "./cloudinary";
import tiendaServices from "../services/tienda.services";
import { Link, useNavigate } from "react-router-dom";
export const Tienda = () => {

  const { store, dispatch } = useGlobalReducer()
  
  const navigate = useNavigate()
  const handleEdit = () => {
    if (edit) {
      if (JSON.stringify(store.tienda) !== JSON.stringify(tiendaData)) {
        handleSubmit(new Event('submit'));
      }
    }
    setEdit(!edit);
  }

  const handleSubmit = e => {
    e.preventDefault();
    tiendaServices.crearTienda(tiendaData).then(data => {
      if (data.tienda) dispatch({ type: "upload_tienda", payload: data.tienda })
    })

  }



  return (
    <>

      <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light py-5">
        <div className="card shadow-lg border-0 rounded-4" style={{ maxWidth: "900px", width: "100%" }}>
          <div
            className="card-header text-white rounded-top-4 d-flex justify-content-between align-items-center"
            style={{
              background: "linear-gradient(90deg, #ff0000 0%, #f21010 50%, #a00000 100%)",

            }}
          >
            <h3 className="mb-0 fw-semibold text-center py-2">{store.tienda?.nombre_tienda}</h3>
            <button className="btn text-white" onClick={()=>navigate('/crear_tienda')}>Editar <span className="fa fa-pen"></span> </button>
          </div>
          <div className="card-body p-5 ">
            <form className="needs-validation" noValidate onSubmit={handleSubmit}>
              <div className="d-flex justify-content-start align-items-center">
                <img
                  src={store.tienda?.logo_url || 'https://secure.gravatar.com/avatar/?s=80&d=mm&r=g'}
                  alt={store.tienda?.nombre_tienda || 'avatar'}
                  onError={e => {
                    e.target.onerror = null;
                  }}
                  style={{ width: '200px', height: '150px', objectFit: 'cover', borderRadius: '0%' }}
                />
                <h1 className="ms-5 ">{store.tienda?.nombre_tienda}</h1>
              </div>
              <h5 className="text-danger border-bottom pb-2 my-3">¿Quienes somos?</h5>
              <p name="tienda-desc" id="tienda-desc" className="form-text fs-4">
                {store.tienda?.descripcion_tienda}
              </p>
              <h5 className="text-danger border-bottom pb-2 my-3">Productos o Servicios</h5>
              <div className="d-flex justify-content-end">
                  {/* Crear pagina para crear/editar producto */}
                  <Link to={'/nuevo_producto'}  className="btn btn-danger px-4 float-end">+ Producto</Link>
              </div>
              {//añadir singles de productos
              }

              {store.tienda?.productos?.length > 0 ? (
                store.tienda?.productos.map((prod) => (
                  //actualizar link para que el atributo to tenga la direccion donde se vean
                  //los detalles del producto
                  <Link className="nav-link" key={prod.id} to={"/single/"+prod.id}>

                    <div  className="card my-3 shadow-sm border-1 d-flex align-content-center  flex-row">
                      <img src={prod.imagenes} alt={prod.nombre_producto} className="rounded-start p-0 m-0" width={'250px'} />
                      <div className="text-center px-3">
                        <h6 className="text-start mt-3">{prod.nombre_producto}</h6>
                        <p className="p-0 m-0 text-start">dimensiones: ${prod.dimensiones}</p>

                        <p className="p-0 m-0 text-start mb-3">precio: ${prod.precio.toFixed(2)}</p>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="text-center text-muted">No hay productos aún.</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  )


}