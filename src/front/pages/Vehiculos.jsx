import React, { useEffect, useState } from "react"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Navbar } from "../components/Navbar"
import { VehicleCard } from "../components/VehicleCard.jsx";

export const Vehiculos = () => {

  const [infoVehiculos, setInfoVehiculos] = useState([])

  function getVehicles() {
    console.log("estoy trayendo info de vehiculos")
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTc1MzIwMzQ5NSwianRpIjoiZTllOWRhMmMtMTUwZi00N2MwLWEyNjktOTEwMDBmZTkzNDY0IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6ImFuZHJlYUBub2xhc2NvLmNvbSIsIm5iZiI6MTc1MzIwMzQ5NSwiY3NyZiI6ImU5NDE4NDZkLThhYTUtNGM2Yy05NmU3LTUyYTk3ZjQ2NzUzMSIsImV4cCI6MTc1MzIwNDM5NX0.qHQC6Crdtt00qkKAoA7q_nvWPabK3DWRCLM-jTJTHag"

    fetch(import.meta.env.VITE_BACKEND_URL + "/mis_vehiculos", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "authorization": 'Bearer ' + token
      }
    })
      .then((response) => {
        if (!response.ok) {
          alert('Error al traer la informacion')
        }
        return response.json()

      })
      .then((data) => {
        console.log("Estoy trayendo informacion")
        console.log(data.vehiculos)
        console.log(data)
        setInfoVehiculos(data.vehiculos)
      })
      .catch((error) => { error })
  }

  function getAllVehicles() {
    console.log("estoy trayendo info de vehiculos")
    fetch(import.meta.env.VITE_BACKEND_URL + "/all_vehicles", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then((response) => {
        if (!response.ok) {
          alert('Error al traer la informacion')
        }
        return response.json()

      })
      .then((data) => {
        console.log("Estoy trayendo informacion")
        console.log(data.vehiculos)
        setInfoVehiculos(data.vehiculos)
      })
      .catch((error) => { error })
  }

  useEffect(() => {
    getVehicles()
    //getAllVehicles()
  }, [])

  return (
    <div>
      <Navbar />

      <div className='container text-center mt-5 mb-3'>
        <div>
          <h1 className="d-inline-block px-5 py-2 border border-primary-subtle rounded-pill text-light" style={{ backgroundColor: '#003366' }}>Mis Vehiculos</h1>
        </div>
        
        <button className="btn btn-primary btn-lg mt-5 mb-2">Crear nuevo vehiculo</button>
        
        <div className='d-flex flex-column py-3'>
          {
            infoVehiculos.map((vehiculo, index) => {

              return (
                <VehicleCard matricula={vehiculo.matricula} marca={vehiculo.marca} modelo={vehiculo.modelo} year={vehiculo.year} id_vehiculo={vehiculo.id_vehiculo} />
              )

            })

          }

        </div>

      </div>
    </div>
  )

}; 