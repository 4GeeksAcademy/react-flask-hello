import { useEffect, useState } from "react";
import axios from "axios";


export default function ClientModal({ onClientSelect }) {
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    // Cargar clientes desde la API
    axios.get("/api/clients")
      .then((res) => {
        setClients(res.data);
        setFilteredClients(res.data);
      })
      .catch((err) => console.error("Error al cargar clientes:", err));
  }, []);

  // Filtro por búsqueda
  useEffect(() => {
    const filtered = clients.filter((client) =>
      client.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredClients(filtered);
  }, [search, clients]);

  return (
    <div className="modal fade" id="clientModal" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Seleccionar Cliente</h5>
            <button className="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div className="modal-body">
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Buscar cliente..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <ul className="list-group">
              {filteredClients.map((client) => (
                <li
                  key={client.id}
                  className="list-group-item list-group-item-action"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    onClientSelect(client); // callback al padre si se quiere usar
                    const modal = bootstrap.Modal.getInstance(
                      document.getElementById("clientModal")
                    );
                    modal.hide();
                  }}
                >
                  {client.name}
                </li>
              ))}
              {filteredClients.length === 0 && (
                <li className="list-group-item text-muted">No hay resultados</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
