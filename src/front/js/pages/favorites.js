import React, { useContext, useEffect } from "react";
import { Row } from "react-bootstrap";
import { Context } from "../store/appContext";


export const FavoritesPage = () => {
  const { store, actions } = useContext(Context);
  const { favorites } = store;
  const isLoggedIn = store.token !== null;

  useEffect(() => {
    actions.loadFavorites(store.token);
  }, []);

  const addToFavorites = (book) => {
    actions.addToFavorites(book);
  };

  const removeFromFavorites = (bookKey) => {
    actions.removeFromFavorites(bookKey);
  };

  const isFavorite = (bookKey) => {
    return favorites && favorites.some((book) => book.key === bookKey);
  };

  return (
    <>
      {favorites && favorites.length > 0 ? (
        <div>
          <h1>Mis favoritos</h1>
          <Row xs={1} md={4} className="g-5">
            {favorites.map((book) => (
              <BookComponent
                key={book.key}
                book={book}
                addToFavorites={addToFavorites}
                removeFromFavorites={removeFromFavorites}
                isFavorite={isFavorite}
                isLoggedIn={isLoggedIn}
              />
            ))}
          </Row>
        </div>
      ) : null}
    </>
  );
};

const BookComponent = ({
  book,
  addToFavorites,
  removeFromFavorites,
  isFavorite,
  isLoggedIn
}) => {
  const handleAddToFavorites = () => {
    addToFavorites(book);
  };

  const handleRemoveFromFavorites = () => {
    removeFromFavorites(book.key);
  };

  return (
    <div>
      <p>{book.title}</p>
      {isLoggedIn && (
        <div>
          <BookCard
            key={book.key}
            book={book}
            isFavorite={isFavorite}
            addToFavorites={addToFavorites}
            removeFromFavorites={removeFromFavorites}
          />
          <button onClick={isFavorite(book.key) ? handleRemoveFromFavorites : handleAddToFavorites}>
            {isFavorite(book.key) ? "Remove from Favorites" : "Add to Favorites"}
          </button>
        </div>
      )}
    </div>
  );
};

const BookCard = ({
  book,
  isFavorite,
  addToFavorites,
  removeFromFavorites
}) => {
  const handleFavoriteClick = () => {
    if (isFavorite(book.key)) {
      removeFromFavorites(book.key);
    } else {
      addToFavorites(book);
    }
  };

  return (
    <div>
      <p>{book.title}</p>
      <button onClick={handleFavoriteClick}>
        {isFavorite(book.key) ? "Remove from Favorites" : "Add to Favorites"}
      </button>
    </div>
  );
};
