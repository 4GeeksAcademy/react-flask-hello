import React, { useState, useEffect, useContext, createContext } from "react";
import "../../styles/home.css";
import { Container, Row, Col, Card, Carousel, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

// Creación del contexto para los favoritos.
const FavoritesContext = createContext({
  favorites: [],
  addToFavorites: () => { },
  removeFromFavorites: () => { },
  isFavorite: () => false,
});

// Componente principal Home que muestra los libros.
export const Home = () => {
  const { store, actions } = useContext(Context);
  const [popularBooks, setPopularBooks] = useState([]);
  const [romanceBooks, setRomanceBooks] = useState([]);
  const [suspenseBooks, setSuspenseBooks] = useState([]);
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  // Verificamos si el usuario ha iniciado sesión.
  const isLoggedIn = store.token !== null;

  // Funciones para manejar los favoritos.
  const addToFavorites = (book) => {
    if (!favorites.find((b) => b.key === book.key)) {
      setFavorites([...favorites, book]);
    }
  };

  const removeFromFavorites = (bookKey) => {
    setFavorites(favorites.filter((book) => book.key !== bookKey));
  };

  const isFavorite = (bookKey) => {
    return Boolean(favorites.find((book) => book.key === bookKey));
  };

  // Efecto para cargar libros por categoría al montar el componente.
  useEffect(() => {
      const fetchData = async () => {
          const popular = await actions.fetchBooksByCategory('popular');
          const romance = await actions.fetchBooksByCategory('romance');
          const suspense = await actions.fetchBooksByCategory('suspense');
          setPopularBooks(popular);
          setRomanceBooks(romance);
          setSuspenseBooks(suspense);
      };
      fetchData();
  }, [actions]);
  
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Función para dividir los libros en grupos para el carrusel.
  const chunkBooks = (books, size) => {
    const chunked = [];
    for (let i = 0; i < books.length; i += size) {
      chunked.push(books.slice(i, i + size));
    }
    return chunked;
  };

  return (
    <Container>
      <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites, isFavorite, isLoggedIn }}>
        {popularBooks.length > 0 && (
          <BookCarousel title="Popular Books" books={chunkBooks(popularBooks, 4)} />
        )}
        {romanceBooks.length > 0 && (
          <BookCarousel title="Romance Books" books={chunkBooks(romanceBooks, 4)} />
        )}
        {suspenseBooks.length > 0 && (
          <BookCarousel title="Suspense Books" books={chunkBooks(suspenseBooks, 4)} />
        )}
        {isLoggedIn && (
        <div>
          <h2>Mis Libros Favoritos</h2>
          <Row xs={1} md={4} className="g-5">
            {favorites.map((book) => (
              <BookCard key={book.key} book={book} />
            ))}
          </Row>
        </div>
      )}
      </FavoritesContext.Provider>
    </Container>
  );
};

// Componente para mostrar el carrusel de libros.
const BookCarousel = ({ title, books }) => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <div className="mb-5">
      <h2>{title}</h2>
      <Carousel activeIndex={index} onSelect={handleSelect} indicators={false} nextLabel="" prevLabel="" interval={null}>
        {books.map((bookGroup, idx) => (
          <Carousel.Item key={idx}>
            <Row xs={1} md={4} className="g-5">
              {bookGroup.map((book) => (
                <BookCard book={book} key={book.key} />
              ))}
            </Row>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

// Componente para mostrar cada libro en el carrusel.
const BookCard = ({ book }) => {
  const { isLoggedIn, addToFavorites, removeFromFavorites, isFavorite } = useContext(FavoritesContext);
  const [isClicked, setIsClicked] = useState(false);

  const handleFavoriteClick = () => {
    if (isFavorite(book.key)) {
      removeFromFavorites(book.key);
    } else {
      addToFavorites(book);
    }
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 10);
  };

  const favoriteIcon = isFavorite(book.key) ? faHeartSolid : faHeartRegular;

  return (
    <Col className="col-5" key={book.key}>
      <Card className="d-flex flex-column h-100">
        <Card.Img width={10} height={350} src={`https://covers.openlibrary.org/b/id/${book.cover_id ? book.cover_id : 'default'}-M.jpg`} />
        <Card.Body className="d-flex flex-column justify-content-between">
          <Card.Title>{book.title}</Card.Title>
          <Card.Text>{book.authors[0]?.name}</Card.Text>
          <div className="d-flex justify-content-between">
            <Link to={`/books${book.key}`}>
              <Button variant="dark">Learn more</Button>
            </Link>
            {isLoggedIn && (
              <Button
                className={`btn btn-outline-light ${isClicked ? "" : ""}`}
                onMouseDown={(event) => {
                  event.preventDefault();
                }}
                onClick={handleFavoriteClick}
              >
                <FontAwesomeIcon icon={favoriteIcon} />
              </Button>
            )}
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Home;
