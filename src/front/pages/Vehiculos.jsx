import React, { useEffect, useState } from "react"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Navbar } from "../components/Navbar"
import { VehicleCard } from "../components/VehicleCard.jsx";
import { matchPath } from "react-router-dom";

export const Vehiculos = () => {

  const [infoVehiculos, setInfoVehiculos] = useState([])
  
 const [infoNewCar, setInfoNewCar] = useState({
  matricula: "",
  marca: "",
  modelo: "",
  year: "",
  user_id: ""
})

  function getVehicles() {
    console.log("estoy trayendo info de vehiculos")
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTc1MzI3NTk3MiwianRpIjoiMDQ1NmI4MWUtY2U2My00NTRkLWI5YWQtZWQzM2IyMzUxZTVkIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6ImFuZHJlYUBub2xhc2NvLmNvbSIsIm5iZiI6MTc1MzI3NTk3MiwiY3NyZiI6ImI0MTE3NGU1LTMzNDQtNGNlNC1iNTNiLTExYjdjM2VhNzQzOCIsImV4cCI6MTc1MzI4MzE3Mn0.vL472QHCcoXFW-Mq9yghZfxJCTcpxWtHvHM0bbsjbhA" // localStorage.getItem("token-jwt")

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
        console.log("Estoy trayendo informacion de los vehiculos")
        console.log(data.vehiculos[0].user_id)
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

  function crearVehiculo(e){
    e.preventDefault()
    console.log(infoNewCar)
    console.log("estoy creando vehiculos")
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTc1MzI3NTk3MiwianRpIjoiMDQ1NmI4MWUtY2U2My00NTRkLWI5YWQtZWQzM2IyMzUxZTVkIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6ImFuZHJlYUBub2xhc2NvLmNvbSIsIm5iZiI6MTc1MzI3NTk3MiwiY3NyZiI6ImI0MTE3NGU1LTMzNDQtNGNlNC1iNTNiLTExYjdjM2VhNzQzOCIsImV4cCI6MTc1MzI4MzE3Mn0.vL472QHCcoXFW-Mq9yghZfxJCTcpxWtHvHM0bbsjbhA" // localStorage.getItem("token-jwt")
    
    fetch(import.meta.env.VITE_BACKEND_URL + "crear_mis_vehiculos", {
      method: "POST",
      body: JSON.stringify(infoNewCar),
      headers : {
        'Content-Type': 'application/json',
        "authorization": 'Bearer ' + token
      }
    })
    .then((response)=>{
      if(!response.ok) throw new Error("El error al crear registro de nuevo vehiculo")
      return response.json()
    })
    .then((data)=> {
      console.log(data)
      alert("Registro creado de manera exitosa")
      window.location.href = '/vehiculos'
      })
    .catch((error)=>{error})
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

        <div>

          <button type="button" class="btn btn-primary btn-lg mt-4" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">Open modal for @mdo</button>
          <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content" style={{ backgroundColor: '#214f84'}}>
                <div className="modal-header">
                  <h1 className="modal-title fs-5 text-light" id="exampleModalLabel">Registro de nuevo vehiculo</h1>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body text-start">
                  <form onSubmit={crearVehiculo}>
                    <div className="mb-3">
                      <label for="matricula" className="col-form-label text-light text-start">Matricula:</label>
                      <input type="text" className="form-control" id="matricula"
                        onChange={(e) => setInfoNewCar({ ...infoNewCar, matricula: e.target.value })}/>
                    </div>
                    <div className="mb-3">
                      <label for="marca" className="col-form-label text-light text-start">Marca:</label>
                      <input type="text" className="form-control" id="marca" 
                        onChange={(e) => setInfoNewCar({ ...infoNewCar, marca: e.target.value })}/>
                    </div>
                    <div className="mb-3">
                      <label for="modelo" className="col-form-label text-light text-start">Modelo:</label>
                      <input type="text" className="form-control" id="modelo" 
                        onChange={(e) => setInfoNewCar({ ...infoNewCar, modelo: e.target.value })}/>
                    </div>
                    <div className="mb-3">
                      <label for="year" className="col-form-label text-light text-start">Año:</label>
                      <input type="text" className="form-control" id="year" 
                        onChange={(e) => setInfoNewCar({ ...infoNewCar, year: e.target.value })}/>
                    </div>
                    <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="submit" className="btn btn-primary">Registrar</button>
                </div>
                  </form>
                </div>
                
              </div>
            </div>
          </div>

        </div>





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