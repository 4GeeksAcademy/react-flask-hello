import { useEffect } from "react";
import { NavbarUser } from "../components/NavbarUser";


export const InicioUser = () => {



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
      console.log(data)
  })
  .catch((error)=>{error})
  }

    useEffect(() => {
      traer_ordenes_de_servicio()
    }, [])


  const orders = [
    {
      id: '0101011',
      vehiculo: 'Peugeot ABC - 001',
      servicios: 'Cambio de aceite, Cambio de Bujías, Balanceo de...',
      fecha: '13/06/2025',
      estado: 'En Proceso',
    },
    {
      id: '0101010',
      vehiculo: 'Peugeot ABC - 001',
      servicios: 'Revisión y Reemplazo de Filtros',
      fecha: '05/05/2025 - 06/05/2025',
      estado: 'Finalizado',
    },
    {
      id: '0101009',
      vehiculo: 'Chevrolet AZD - 123',
      servicios: 'Chequeo de Batería',
      fecha: '21/02/2025',
      estado: 'Ingresado',
    },
    {
      id: '0101008',
      vehiculo: 'Peugeot ABC - 001',
      servicios: 'Cambio de Luces',
      fecha: '17/01/2025 - 18/01/2025',
      estado: 'Finalizado',
    },
    {
      id: '0101007',
      vehiculo: 'Chevrolet AZD - 123',
      servicios: 'Revisión y ajuste de suspensión, Rotación de...',
      fecha: '10/12/2024 - 13/12/2024',
      estado: 'Finalizado',
    },
  ];

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
                <th>Servicios</th>
                <th>Fecha</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((orden) => (
                <tr key={orden.id}>
                  <td>{orden.id}</td>
                  <td>{orden.vehiculo}</td>
                  <td>{orden.servicios}</td>
                  <td>{orden.fecha}</td>
                  <td>{getEstadoBadge(orden.estado)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};