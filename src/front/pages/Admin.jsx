// src/front/pages/Admin.jsx
import { Link } from "react-router-dom";
import { useStore } from "../hooks/useGlobalReducer";
import { AdminCard } from "../components/AdminCard";

export const Admin = () => {
  const { store /*, actions*/ } = useStore();

  const filterList = ["Todo", "Pendientes", "Abiertas", "Cerradas"];
  const tableHeader = [
    "ID",
    "Título",
    "Usuario",
    "Estado",
    "Prioridad",
    "Categoría",
    "Fecha creación",
    "Acciones",
  ];
  const apiVars = ["id", "title", "user", "status", "priority", "category", "created_at"];

  return (
    <div className="container">
      <h2>Panel de Administrador</h2>

      <AdminCard />

      <div className="border-top">
        <div className="fs-4">Gestión de disputas</div>
        <p>Administra y resuelve las disputas de los usuarios</p>

        <div className="btn-group" role="group" aria-label="filtros">
          {filterList.map((filtro, i) => (
            <button key={i} type="button" className="btn btn-outline-secondary rounded-pill mx-1">
              {filtro}
            </button>
          ))}
        </div>

        <table className="table">
          <thead>
            <tr>
              {tableHeader.map((h, i) => (
                <th key={i} scope="col">
                  {h}
                </th>
              ))}
            </tr>
          </thead>

        <tbody>
            {/* Fila de ejemplo: reemplazar por data real cuando conectes la API */}
            <tr>
              {apiVars.map((key, i) => (
                <td key={i}>{key}</td>
              ))}
              <td>
                <div
                  className="btn-group rounded-pill bg-secondary p-1"
                  role="group"
                  aria-label="acciones-disputa"
                >
                  <button type="button" className="btn text-white rounded-pill">
                    <small>Enviar caso</small>
                  </button>
                  <button type="button" className="btn text-white rounded-pill bg-dark">
                    <small>Cerrar caso</small>
                  </button>
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

export default Admin;
