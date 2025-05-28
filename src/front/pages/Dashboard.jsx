import React from "react";
import { Button, Card } from "react-bootstrap";

const Dashboard = () => {
  return (
    <div className="dashboard-container d-flex flex-column align-items-center text-white py-5 px-3 fade-in">
      <h1 className="mb-3 text-center slide-down">Tus Eventos</h1>
      <p className="no-events-text text-center fade-in-delay">No tienes eventos aún...</p>

      <Button variant="danger" className="create-event-btn mb-5 fade-in-delay">
        Crear nuevo evento
      </Button>

      <h2 className="next-events text-center mb-4 fade-in-delay">Próximos Eventos</h2>

      <div className="events-section d-flex flex-wrap justify-content-center gap-4">
        {[1, 2, 3].map((event, index) => (
          <Card key={index} className="event-card text-white slide-up">
            <Card.Body>
              <Card.Title>Evento #{event}</Card.Title>
              <Card.Text>
                Descripción breve del evento. Aquí puedes poner el lugar, hora o tipo.
              </Card.Text>
              <Button className="ver-detalles-btn" size="sm">
                Ver detalles
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

