import { useEffect, useState } from "react";
import { NavbarUser } from "../components/NavbarUser";


export const InicioUser = () => {

  const [ordenDeTrabajo, setOrdenDeTrabajo] = useState([])

  function traer_ordenes_de_servicio(){

  const token = localStorage.getItem("jwt_token")
  fetch(import.meta.env.VITE_BACKEND_URL + "ordenes_de_trabajo", {
    method: "GET",
      headers: {
        "Content-Type": "application/json",
        "authorization": 'Bearer ' + token
     }
  })
  .then((response)=>{
    if(!response.ok) alert("Error al traer la informacion")
      return response.json()
  })
  .then((data)=>{
      console.log(data.ordenes_de_trabajo)
      setOrdenDeTrabajo(data.ordenes_de_trabajo)
  })
  .catch((error)=>{error})
  }

    useEffect(() => {
      traer_ordenes_de_servicio()
    }, [])

  const getEstadoBadge = (estado) => {
    if (estado === 'En Proceso') {
      return <span className="badge rounded-pill bg-warning">En Proceso</span>;
    }
    else if (estado == 'Ingresado'){
      return <span className="badge rounded-pill bg-danger">Ingresado</span>;
      }
    else 
      return <span className="badge rounded-pill bg-success text-light">Finalizado</span>;
  };

  return (
    <div>
      <NavbarUser />

      <div className="container mt-4">
        <div className="text-center mb-3">
          <button className="btn btn-info text-white px-4 py-2 fw-bold">Generar Nueva Órden</button>
        </div>

        <div className="table-responsive">
          <table className="table table-bordered table-hover text-center align-middle">
            <thead className="table-light">
              <tr>
                <th>Nro. de Órden</th>
                <th>Vehículo</th>
                <th>Mecanico</th>
                <th>Servicios</th>
                <th>Fecha de ingreso</th>
                <th>Fecha de salida</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {ordenDeTrabajo.map((orden) => (
                <tr key={orden.id}>
                  <td>{orden.id_ot}</td>
                  <td>{orden.matricula_vehiculo}</td>
                  <td>{orden.nombre_mecanico}</td>
                  <td>{orden.servicios_asociados.map(s => s.servicio.name_service).join(", ")}</td>
                  <td>{orden.fecha_ingreso}</td>
                  <td>{orden.fecha_final}</td>
                  <td>{getEstadoBadge(orden.estado_servicio)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};