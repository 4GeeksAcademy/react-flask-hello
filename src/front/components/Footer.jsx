import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Footer() {
  return (
    <footer className="bg-dark text-white py-4">
      <Container>
        <Row className="mb-3 text-center">
          <Col className="text-start">
            <Button variant="outline-light" className="fw-bold">Sobre nosotros</Button>
          </Col>
          <Col className="text-center">
            <Button variant="outline-light" className="fw-bold">Servicios</Button>
          </Col>
          <Col className="text-end">
            <Button variant="outline-light" className="fw-bold">Contacto</Button>
          </Col>
        </Row>
        <hr className="border-light" />
        <p className="text-center mb-0 text-secondary">
          &copy; Flow {new Date().getFullYear()}. Todos los derechos reservados.
        </p>
      </Container>
    </footer>
  );
}