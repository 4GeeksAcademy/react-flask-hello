import React from "react";
import { Link } from "react-router-dom";

const ClientesList = ({ search }) => {
  const [clientes, setClientes] = React.useState([
    {
      id: 1,
      nombre: "Juan",
      apellido: "Pérez",
      cliente_dni: "12345678",
      telefono: "555-1234",
      email: "juan.perez@example.com",
    },
    {
      id: 2,
      nombre: "María",
      apellido: "González",
      cliente_dni: "87654321",
      telefono: "555-5678",
      email: "maria.gonzalez@example.com",
    },
    {
      id: 3,
      nombre: "Carlos",
      apellido: "López",
      cliente_dni: "45678912",
      telefono: "555-9876",
      email: "carlos.lopez@example.com",
    },

  ]);

  
  const filteredClientes = clientes.filter(
    (cliente) =>
      cliente.nombre.toLowerCase().includes(search.toLowerCase()) ||
      cliente.cliente_dni.includes(search)
  );

  return (
    <div className="container">
      <h2>Lista de Clientes</h2>
      <div className="row">
        {filteredClientes.length > 0 ? (
          filteredClientes.map((cliente) => (
            <div key={cliente.id} className="col-md-12 mb-3">
              <Link to={`/cliente/${cliente.id}`} style={{ textDecoration: 'none' }}>
                <div className="card" >
                  <div className="card-body">
                    <h5 className="card-title">
                      {cliente.nombre} {cliente.apellido}
                    </h5>
                    <p className="card-text">
                      <strong>DNI:</strong> {cliente.cliente_dni} <br />
                      <strong>Teléfono:</strong> {cliente.telefono} <br />
                      <strong>Email:</strong> {cliente.email} <br />
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <p>No se encontraron clientes.</p>
        )}
      </div>
    </div>
  );
};

export default ClientesList;
