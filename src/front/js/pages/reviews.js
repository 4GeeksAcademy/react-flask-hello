import React, { useState } from "react";
import "../../styles/reviews.css";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';

const Reviews = () => {
  const { id } = useParams(); // Obtener el ID del libro de los parámetros de la URL
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  // Función para manejar el envío del comentario
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes enviar el comentario y la calificación a tu backend
    console.log("Comentario:", comment);
    console.log("Calificación:", rating);
    // Limpia el formulario después del envío
    setComment("");
    setRating(0);
  };

  // Función para establecer la calificación
  const handleRatingChange = (value) => {
    setRating(value);
  };

  // Función para renderizar los iconos de estrellas
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FontAwesomeIcon
          key={i}
          icon={i <= rating ? solidStar : regularStar}
          onClick={() => handleRatingChange(i)}
          style={{ cursor: 'pointer' }}
        />
      );
    }
    return stars;
  };

  return (
    <Container>
      <Row>
        <Col className="col-6">
          {/* Mostrar la portada del libro en la primera columna */}
          {/* Puedes agregar aquí la portada del libro si lo deseas */}
        </Col>
        <Col className="col-6">
          {/* Mostrar el formulario de comentario en la segunda columna */}
          <Card>
            <Card.Body>
              <h1>Título del Libro</h1>
              <p>Autor del Libro</p>
              {/* Formulario de comentario */}
              <Form onSubmit={handleSubmit} className="comentarios">
                <div controlId="comment">
                  <label className="form-check-label py-2">Deja tu comentario</label>
                  <textarea
                    as="textarea"
                    rows={3}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="form-control"
                  />
                </div>
                <div className="mb-3" controlId="rating">
                  <label className="form-check-label py-2">Calificación</label>
                  <div>
                    {renderStars()}
                  </div>
                </div>
                <div className="d-grid gap-2">
                  <Button className="btn btn-success btnReviews" type="submit">
                    Send review
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Reviews;
