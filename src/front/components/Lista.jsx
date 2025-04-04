import React, { useState } from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";

const ClientesList = () => {
  const [clientes, setClientes] = useState([
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

  return (
    <Container className="mt-4">
      <h2>Lista de Clientes</h2>

      <Row>
        {clientes.map((cliente) => (
          <Col key={cliente.id} md={4} className="mb-3">
            <Card>
              <Card.Body>
                <Card.Title>{cliente.nombre} {cliente.apellido}</Card.Title>
                <Card.Text>
                  <strong>DNI:</strong> {cliente.cliente_dni} <br />
                  <strong>Teléfono:</strong> {cliente.telefono} <br />
                  <strong>Email:</strong> {cliente.email} <br />
                </Card.Text>
               </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ClientesList;
