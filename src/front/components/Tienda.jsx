import React, { useEffect, useState } from "react";

import logo from "../assets/img/Logo.png"
import useGlobalReducer from "../hooks/useGlobalReducer";
import userServices from "../services/user.services";
import CloudinaryComponent from "./cloudinary";
import tiendaServices from "../services/tienda.services";
export const Tienda = () => {

  const { store, dispatch } = useGlobalReducer()
  const [edit, setEdit] = useState(false)
  const [tiendaData, setTiendaData] = useState(store.user)

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
      userServices.profile_update(tiendaData).then(data => {
        if (data.user) dispatch({ type: "update_user", payload: data.user })
      })
  
    }

    useEffect(() => {
      tiendaServices.miTienda().then(data => console.log(data))
    } , [])

  return(
    <>
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light py-5">
      <div className="card shadow-lg border-0 rounded-4" style={{ maxWidth: "900px", width: "100%" }}>
        <div
            className="card-header text-white rounded-top-4 d-flex justify-content-between align-items-center"
            style={{
              background: "linear-gradient(90deg, #ff0000 0%, #f21010 50%, #a00000 100%)",

            }}
          >
            <h3 className="mb-0 fw-semibold text-center py-2">Tienda Name</h3>
            <button className="btn text-white" onClick={handleEdit}>{edit ? <span className="fa fa-save"></span> : <span className="fa fa-pen"></span>}</button>
          </div>
          <div className="card-body p-5 ">
            <form className="needs-validation" noValidate onSubmit={handleSubmit}>
              <div className="d-flex justify-content-start align-items-center">
                  <img
                    src={tiendaData.avatar || 'https://secure.gravatar.com/avatar/?s=80&d=mm&r=g'}
                    alt={tiendaData.nombre || 'avatar'}
                    onError={e => {
                      e.target.onerror = null;
                      setTiendaData({ ...tiendaData, avatar: 'https://secure.gravatar.com/avatar/?s=80&d=mm&r=g' });
                    }}
                    style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '0%' }}
                  />
                  <h1 className="ms-5 ">Tienda Name</h1>
              </div>
            <h5 className="text-danger border-bottom pb-2 my-3">¿Quienes somos?</h5>
            <textarea name="tienda-desc" id="tienda-desc" className="form-control " rows={6}></textarea>
            <h5 className="text-danger border-bottom pb-2 my-3">Productos o Servicios</h5>
            
            {//añadir singles de productos
            }
            </form>
          </div>
      </div>
    </div>
    </>
  )


}