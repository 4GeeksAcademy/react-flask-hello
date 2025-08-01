import React from 'react'
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";



export const VehicleCard = (props) => {


  const navigate = useNavigate()
  function eliminarVehiculo(id_vehiculo) {

    const token = localStorage.getItem("jwt_token")
    fetch(import.meta.env.VITE_BACKEND_URL + `eliminar_vehiculo/${id_vehiculo}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token //localStorage.getItem('token') // JWT
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        if (data.msg === 'Vehículo eliminado correctamente') {
          //alert('Vehículo eliminado con éxito')
          console.log("Navegando a /vehiculos...")
          props.onDelete();
          //navigate('/vehiculos') //window.location.href = '/vehiculos'
          console.log("despues de navigate")
        } else {
          alert(data.msg)
        }
      })
      .catch(error => {
        console.error('Error:', error)
        //alert('Hubo un error al intentar eliminar el vehículo')
      })
  }
  return (
    <div>
      <div className="card border border-2 border-primary mb-3 rounded-4" style={{ Width: "100%" }}>
        <div className="row g-0">
          <div className="col-md-4 d-flex align-items-center justify-content-center">
            <img src="https://i.pinimg.com/736x/eb/21/8f/eb218ff389898aae7ae7b28894860ec5.jpg" className="p-2 m-2 img-fluid rounded-start" alt="..." />
          </div>
          <div className="col-md-6">
            <div className="card-body">
              <h3 className="card-title d-flex justify-content-start ms-5 mt-3">Matricula {props.matricula}</h3>
              <h5 className="card-text d-flex justify-content-start text-body-secondary ms-5 mt-4">Marca: {props.marca}</h5>
              <h5 className="card-text d-flex justify-content-start text-body-secondary ms-5 mt-2">Modelo: {props.modelo}</h5>
              <h5 className="card-text d-flex justify-content-start text-body-secondary ms-5 mt-2">Año: {props.year}</h5>
            </div>
          </div>
          <div className="col-md-2 p-4">


            <button className='btn btn-light my-2 mx-5'><i className="fa-solid fa-pencil"></i></button>
            <button onClick={() => {
              console.log(props.id_vehiculo)
              eliminarVehiculo(props.id_vehiculo)
            }} className='btn btn-light my-2 mx-5'><i className="fa-solid fa-trash"></i></button>


          </div>
        </div>
      </div>

    </div>

    

  )
}

