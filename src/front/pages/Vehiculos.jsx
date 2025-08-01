import React, { useEffect, useState } from "react"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Navbar } from "../components/Navbar"
import { NavbarMecanico } from "../components/NavbarMecanico.jsx"
import { VehicleCard } from "../components/VehicleCard.jsx";
import { matchPath, useNavigate } from "react-router-dom";

export const Vehiculos = () => {

  const navigate = useNavigate()
  const [infoVehiculos, setInfoVehiculos] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [mensajeModal, setMensajeModal] = useState("¡Registro creado de manera exitosa!");

  const [infoNewCar, setInfoNewCar] = useState({
    matricula: "",
    marca: "",
    modelo: "",
    year: "",
    user_id: ""
  })

  function handleAfterDelete() {

    setMensajeModal("¡Vehículo eliminado correctamente!");
    const modal = new bootstrap.Modal(document.getElementById('modalExito'));
    modal.show(); // Mostrar el modal en lugar de alert
    getVehicles(); // vuelve a cargar la lista
  }

  function getVehicles() {
    console.log("estoy trayendo info de vehiculos")
    const token = localStorage.getItem("jwt_token")

    fetch(import.meta.env.VITE_BACKEND_URL + "/mis_vehiculos", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "authorization": 'Bearer ' + token
      }
    })
      .then((response) => {
        if (!response.ok) {
          setMensajeModal("¡Error al traer la informacion!");
          const modal = new bootstrap.Modal(document.getElementById('modalExito'));
          modal.show(); // Mostrar el modal en lugar de alert
          //alert('Error al traer la informacion')
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
        setMensajeModal("Error al traer la informacion");
        const modal = new bootstrap.Modal(document.getElementById('modalExito'));
        modal.show(); // Mostrar el modal en lugar de alert
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

  function crearVehiculo(e) {
    e.preventDefault()
    console.log(infoNewCar)
    console.log("estoy creando vehiculos")
    const token = localStorage.getItem("jwt_token")

    fetch(import.meta.env.VITE_BACKEND_URL + "crear_mis_vehiculos", {
      method: "POST",
      body: JSON.stringify(infoNewCar),
      headers: {
        'Content-Type': 'application/json',
        "authorization": 'Bearer ' + token
      }
    })
      .then((response) => {
        if (!response.ok) {
          setMensajeModal("¡El registro ha fallado, revise la informacion e intente de nuevo!");
          const modal = new bootstrap.Modal(document.getElementById('modalExito'));
          modal.show(); // Mostrar el modal en lugar de alert
        }
        return response.json()
      })
      .then((data) => {
        console.log(data.msg)
        setMensajeModal("¡Vehículo registrado correctamente!");
        const modal = new bootstrap.Modal(document.getElementById('modalExito'));
        modal.show(); // Mostrar el modal en lugar de alert
        getVehicles()
        setShowModal(false)
      })
      .catch((error) => { error })
  }

  useEffect(() => {
    getVehicles()
    //getAllVehicles()
  }, [])

  return (
    <div>
      <NavbarMecanico />

      <div className='container text-center mt-5 mb-3'>
        <div>
          <h1 className="d-inline-block px-5 py-2 border border-primary-subtle rounded-pill text-light" style={{ backgroundColor: '#003366' }}>Mis Vehiculos</h1>
        </div>

        <div>

          <button onClick={() => { setShowModal(true) }} type="button" class="btn btn-primary btn-lg mt-4"
            data-bs-whatever="@mdo">Registra un nuevo vehiculo</button>
          <div className={`modal fade ${showModal == true ? "show d-block" : ""} `} id="exampleModal" tabindex="-1"
            aria-labelledby="exampleModalLabel" aria-hidden={!showModal}>
            <div className="modal-dialog">
              <div className="modal-content" style={{ backgroundColor: '#214f84' }}>
                <div className="modal-header">
                  <h1 className="modal-title fs-5 text-light" id="exampleModalLabel">Registro de nuevo vehiculo</h1>
                  <button onClick={() => { setShowModal(false) }} type="button" className="btn-close" aria-label="Close"></button>
                </div>
                <div className="modal-body text-start">
                  <form onSubmit={crearVehiculo}>
                    <div className="mb-3">
                      <label for="matricula" className="col-form-label text-light text-start">Matricula:</label>
                      <input type="text" className="form-control" id="matricula"
                        onChange={(e) => setInfoNewCar({ ...infoNewCar, matricula: e.target.value })} />
                    </div>
                    <div className="mb-3">
                      <label for="marca" className="col-form-label text-light text-start">Marca:</label>
                      <input type="text" className="form-control" id="marca"
                        onChange={(e) => setInfoNewCar({ ...infoNewCar, marca: e.target.value })} />
                    </div>
                    <div className="mb-3">
                      <label for="modelo" className="col-form-label text-light text-start">Modelo:</label>
                      <input type="text" className="form-control" id="modelo"
                        onChange={(e) => setInfoNewCar({ ...infoNewCar, modelo: e.target.value })} />
                    </div>
                    <div className="mb-3">
                      <label for="year" className="col-form-label text-light text-start">Año:</label>
                      <input type="text" className="form-control" id="year"
                        onChange={(e) => setInfoNewCar({ ...infoNewCar, year: e.target.value })} />
                    </div>
                    <div className="modal-footer">
                      <button onClick={() => setShowModal(false)} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                      <button type="submit" className="btn btn-primary">Registrar</button>
                    </div>
                  </form>
                </div>

              </div>
            </div>
          </div>
          {showModal && (
            <div
              className="modal-backdrop fade show"
              onClick={() => { setShowModal(false) }} // Cierra al hacer clic en el backdrop
            />
          )}
        </div>

        <div className='d-flex flex-column py-3'>
          {
            infoVehiculos.map((vehiculo, index) => {

              return (
                <VehicleCard matricula={vehiculo.matricula} marca={vehiculo.marca} modelo={vehiculo.modelo} year={vehiculo.year} id_vehiculo={vehiculo.id_vehiculo} onDelete={handleAfterDelete} />
              )

            })

          }

        </div>

      </div>



      <div class="modal fade" id="modalExito" tabindex="-1" aria-labelledby="modalExitoLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content border-primary">
            <div class="modal-header modal-colors text-white">
              <h5 class="modal-title" id="modalExitoLabel">Éxito</h5>
              <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Cerrar"></button>
            </div>
            <div className="modal-body">
              {mensajeModal}
            </div>
            <div class="modal-footer">
              <button type="button" class="btn modal-colors text-light" data-bs-dismiss="modal">Aceptar</button>
            </div>
          </div>
        </div>
      </div>
    </div>



  )

}; 