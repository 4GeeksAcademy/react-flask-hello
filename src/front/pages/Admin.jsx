// Import necessary components from react-router-dom and other parts of the application.
import { Link, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";  // Custom hook for accessing the global state.
import { AdminCard } from "../components/AdminCard"
export const Admin = () => {
  // Access the global state and dispatch function using the useGlobalReducer hook.
  const { store, dispatch } = useGlobalReducer()
  const {id} = useParams()
  const filterList = ["Todo", "Pendientes", "Abiertas", "Cerradas"]
  const tableHeader = ["ID", "Título", "Usuario", "Estado", "Prioridad", "Categoría", "Fecha creación"]
  const apiVars = ["id", "title", "user", "status", "priority", "category", "created_at"]

  return (
    <div className="container">
      <h2>Panel de Administrador</h2>
      <AdminCard id={id} />
      <div className="border-top">
        <div className="fs-4">Gestión de disputas</div>
        <p>Administra y resuelve las disputas de los usuarios</p>

        <div className="btn-group" role="group" aria-label="Basic outlined example">
          {filterList.map((filtro, index) =>
            <div className="text-decoration-none d-flex" key={index}>
              <button type="button" className="btn btn-outline-secondary rounded-pill mx-1">{filtro}</button>
            </div>)}
        </div>

        <table className="table">

          <thead>
            <tr>
              {tableHeader.map((header, index) =>
                <th key={index} scope="col">{header}</th>)}
              <th scope="col">Acciones</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              {apiVars.map((fet, index) =>
                <td key={index} >{fet}</td>
              )}
              <td>
                <div className="btn-group rounded-pill bg-secondary p-1" role="group" aria-label="Basic outlined example">
                  <button type="button" className="btn text-white rounded-pill "><small>Enviar Caso</small></button>
                  <button type="button" className="btn text-white rounded-pill bg-dark "><small>Cerrar caso</small></button>
                </div>
              </td>
            </tr>
          </tbody>

        </table>
      </div>
      <br />

      <Link to="/">
        <button className="btn btn-primary">Back home</button>
      </Link>
    </div>
  );
};