import React, { useContext, useEffect, useLayoutEffect } from 'react';
import { Context } from '../store/appContext';
import useReviewManagement from "../hooks/useReviewManagement";
import Likes from './Likes';
import FavoriteReview from './FavoriteReview';
import { Link } from 'react-router-dom';

const AllFavoritesReviews = ({ searchQuery }) => {
  const { store, actions } = useContext(Context)
  const { handleUpdate, handleSave, handleDelete, favorites, reviews, editContent, editContentId, editTitle, handleEditContent } = useReviewManagement();

  useEffect(() => {
    actions.getFavoriteReview()
  }, [])

  return (
    <div>
      {/* Publicar las cartas que ya existen */}
      <div className="cards-review">
        {store.favorites && store.favorites.length >= 1 && store.favorites
          .filter(
            (favorite) =>
              favorite.review_id?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
              favorite.review_id?.comment_text
                .toLowerCase()
                .includes(searchQuery.toLowerCase())
          )
          .sort((a, b) => b.id - a.id)
          .map((favorite) => (
            <div
              key={favorite.review_id?.id}
              className="card card-review text-white mt-4 container"
            >
              <div className="img-review">
                <Link to={`/review/${favorites.review_id?.id}`}>
                  <img src={favorites.review_id?.review_image} className="card-img-top" alt="imagen de reseña" />
                </Link>
              </div>
              <div className='content-title-comment'>
                <div className="div-title-review">
                  {editContentId === favorite.review_id?.id ? (
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => handleEditContent(e.target.value)}
                    />
                  ) : (
                    <h5 className="card-title title-review">{favorite.review_id?.title}</h5>
                  )}
                </div>
                <div className='comment-review'>
                  {editContentId === favorite.review_id?.id ? (
                    <>
                      <div className="comment-review">
                        <textarea
                          autoFocus={true}
                          value={editContent}
                          onChange={(e) => handleEditContent(e.target.value)}
                          rows="7"
                          cols="38"
                          maxLength="300"
                          style={{ resize: "none" }}
                        ></textarea>
                      </div>
                      <button onClick={() => handleSave(favorite.review_id?.id)}>Validar</button>
                    </>
                  ) : (
                    <p className="card-text">{favorite.review_id?.comment_text}</p>
                  )}
                </div>
              </div>
              {store.user.id === favorite.user_id && (
                <div className="btn-options d-flex justify-content-end">
                  <button
                    className="btn-up-review"
                    onClick={() => handleUpdate(favorite.review_id?.id)}
                  >
                    &#9998;
                  </button>
                  <button
                    className="btn-delete-review"
                    onClick={() => handleDelete(favorite.review_id?.id)}
                  >
                    &#10008;
                  </button>
                </div>
              )}
              <div className="likes card-likes">
                <span className="author-review">
                  Publicado por : <span>{favorite.review_id?.user.username}</span>{" "}
                </span>
                <div className="icons-review d-flex align-items-center justify-content-around">
                  <span className="me-3">
                    <FavoriteReview reviewId={favorite.review_id?.id} />
                  </span>
                  <Likes reviewId={favorite.review_id?.id} />
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
export default AllFavoritesReviews;