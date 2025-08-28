import { Link } from "react-router-dom";
import { useStore } from "../hooks/useGlobalReducer";
import { AdminCard } from "../components/AdminCard";

export const Admin = () => {
  const { store /*, actions*/ } = useStore();

  const filterList = ["Todo", "Pendientes", "Abiertas", "Cerradas"];
  const tableHeader = ["ID","Título","Usuario","Estado","Prioridad","Categoría","Fecha creación"];
  const apiVars = ["id","title","user","status","priority","category","created_at"];

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
              {tableHeader.map((h, i) => <th key={i} scope="col">{h}</th>)}
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {apiVars.map((v, i) => <td key={i}>{v}</td>)}
              <td>—</td>
            </tr>
          </tbody>
        </table>
      </div>

      <br />
      <Link to="/"><button className="btn btn-primary">Back home</button></Link>
    </div>
  );
};

export default Admin;