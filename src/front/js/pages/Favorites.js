import React, { useState, useContext } from 'react';
import { Context } from '../store/appContext';
import AllFavoritesReviews from '../component/AllFavoritesReviews'
import AllFavoritesOffers from '../component/AllFavoritesOffers'
import SearchReview from '../component/SearchReview';
const Favorites = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { store, actions } = useContext(Context)

  const handleSearch = (query) => {
    setSearchQuery(query);
  };
  return (
    <>
      <SearchReview />
      {store.favorites.length >= 1 ? (
        <>
          <div className='fav-offers text-center mt-5'>
            <h3>Mis ofertas favoritas:</h3>
            <AllFavoritesOffers searchQuery={searchQuery} />
          </div>
          <div className='fav-reviews mt-5 text-center mt-5'>
            <h3>Mis reseñas favoritas:</h3>
            <AllFavoritesReviews searchQuery={searchQuery} />
          </div>
        </>
      ) : (
        <h2 className='text-center mt-5'>No tienes ningún favorito todavía!!</h2>
      )}
    </>
  );
};

export default Favorites;