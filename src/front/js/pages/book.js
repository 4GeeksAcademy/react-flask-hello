import React, { useState, useEffect, useContext, useCallback } from "react";
import { useParams, Link } from "react-router-dom"; // Importa Link desde react-router-dom
import { Container, Row, Form, Button } from "react-bootstrap";
import { Context } from "../store/appContext";
import debounce from 'lodash.debounce';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';



export const BookDetails = () => {

    const { id } = useParams();
    const { store, actions } = useContext(Context);
    const [comment, setComment] = useState("");
    const [bookDetails, setBookDetails] = useState(null);
    const [author, setAuthor] = useState(null);
    const [rating, setRating] = useState(0);

    useEffect(() => {
        fetchBookDetails();
    }, [id]);

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

    const fetchBookDetails = async () => {
        try {
            const response = await fetch(`https://openlibrary.org/works/${id}.json`);
            if (!response.ok) {
                throw new Error("Error fetching book details");
            }
            const data = await response.json();
            setBookDetails(data);
            if (data && data.authors && data.authors[0]) {
                authorDetails(data.authors[0].author.key);
            }
        } catch (error) {
            console.error('Error fetching book details:', error);
        }
    };

    const authorDetails = useCallback(debounce(async (authorKey) => {
        try {
            const details = await fetch(`https://openlibrary.org${authorKey}.json`);
            const authorData = await details.json();
            setAuthor(authorData);
        } catch (error) {
            console.error("Error fetching author details:", error);
        }
    }, 500), []);

    // Render loading state until bookDetails and author are fetched
    if (!bookDetails || !author) {
        return <div>Cargando...</div>;
    } else {
        return (
            <Container>
                <div className="container-fluid review d-flex bg-light"> 
                    <div className="row">
                    <div className="col-lg-3 col-sm-12 col-md-12">
                        <img className="img-fluid" src={`https://covers.openlibrary.org/b/id/${bookDetails.covers}-L.jpg`} alt="Portada del libro" />
                    </div>
                    <div className="col-lg-4 col-sm-12 col-md-12">
                        <h2>{bookDetails.title}</h2>
                        <p>Autor: {author.name}</p>
                        <p>Año de publicación: {bookDetails.first_publish_date}</p>
                        <p>Descripción: {typeof bookDetails.description === 'string' ? bookDetails.description : bookDetails.description?.value}</p>
                        <p>ISBN: {bookDetails.isbn}</p>
                        {/*<Link to={`/books/works/${id}/reviews`}>
                            <button className="btn btn-success">LEAVE A REVIEW</button>
                        </Link>*/}
                    </div>
                    <div className="col-lg-5 col-sm-12 col-md-12">
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
                    </div>
                    </div>
                   
                    
                </div>
            </Container>
        );
    }
};

export default BookDetails;
