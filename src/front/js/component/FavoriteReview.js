import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHeart, faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { faHeartCrack } from "@fortawesome/free-solid-svg-icons";
library.add(faHeart, faTrashAlt);

const FavoriteReview = ({ reviewId }) => {
  const { store, actions } = useContext(Context);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (Array.isArray(store.favorites)) { // Vérification du type
      setIsFavorite(store.favorites.some(favorite => favorite.review_id?.id === reviewId));
    }
  }, [store.favorites, reviewId]);

  const handleAddToFavorite = async () => {
    await actions.addFavoriteReview(reviewId);
    setIsFavorite(true);
  };

  const handleDeleteFavorite = async () => {
    await actions.deleteFavoriteReview(reviewId);
    window.location.reload()
    setIsFavorite(false);
  };

  return (
    <div>
      {!isFavorite ? (
        <span style={{ cursor: 'pointer' }} onClick={handleAddToFavorite}>
          <FontAwesomeIcon icon={faHeart} size="lg" />
        </span>
      ) : (
        <span style={{ cursor: 'pointer' }} onClick={handleDeleteFavorite}>
          <FontAwesomeIcon icon={faHeartCrack} size="lg" color="red" />
        </span>
      )}
    </div>
  );
};

export default FavoriteReview;
