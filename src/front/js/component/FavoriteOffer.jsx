import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHeart, faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { faHeartCrack } from "@fortawesome/free-solid-svg-icons";
library.add(faHeart, faTrashAlt);

const FavoriteReview = ({ offerId }) => {
  const { store, actions } = useContext(Context);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (Array.isArray(store.favorites)) { // Vérification du type
      setIsFavorite(store.favorites.some(favorite => favorite.offer_id?.id === offerId));
    }
  }, [store.favorites, offerId]);

  const handleAddToFavorite = async () => {
    await actions.addFavoriteOffer(offerId);
    setIsFavorite(true);
  };

  const handleDeleteFavorite = async () => {
    await actions.deleteFavoriteOffer(offerId);
    window.location.reload()
    setIsFavorite(false);
  };

  return (
    <div className="heart">
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
