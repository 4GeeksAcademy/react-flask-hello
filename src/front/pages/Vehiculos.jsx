import React, { useEffect, useState } from "react"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Navbar } from "../components/Navbar"
import { VehicleCard } from "../components/VehicleCard.jsx";

export const Vehiculos = () => {

  const [infoVehiculos, setInfoVehiculos] = useState({})

  function getVehicles() {
    console.log("estoy trayendo info de vehiculos")
    fetch(import.meta.env.VITE_BACKEND_URL + "/all_vehicles", {
      method: "GET",
      headers: {
      "Content-Type": "application/json",}
    })
      .then((response) => {
        if (!response.ok) {
          alert('Error al traer la informacion')}
          return response.json()
        
      })
      .then((data) => {
        console.log("Estoy trayendo informacion") 
        console.log(data.vehiculos)
        setInfoVehiculos(data.vehiculos) 
      })
      .catch((error) => {error})
  }

useEffect(()=>{
  getVehicles()
}, [])

  return (
    <div>
      <Navbar />

      <div className='container text-center mt-5 mb-3'>
        <h1 className="d-inline-block px-5 py-2 border border-primary-subtle rounded-pill text-light" style={{ backgroundColor: '#003366' }}>Mis Vehiculos</h1>
        <div className='d-flex flex-column py-3'>


          <VehicleCard />
        
        
        </div>

      </div>
    </div>
  )

}; 