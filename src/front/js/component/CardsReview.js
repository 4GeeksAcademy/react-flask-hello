import React, { useContext } from "react";
import { Context } from "../store/appContext";
import Likes from "./Likes";
import useReviewManagement from "../hooks/useReviewManagement";
import FavoriteReview from "./FavoriteReview";
import { Link } from "react-router-dom";

const CardsReview = ({ searchQuery }) => {
  const { store } = useContext(Context);
  const { handleUpdate, handleSave, handleDelete, reviews, editContent, editContentId, editTitle, handleEditContent } = useReviewManagement();

  return (
    <div>
      {/* Publicar las cartas que ya existen */}
      <div className="cards-review">
        {store.reviews
          .filter(
            (review) =>
              review.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              review.comment_text.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .sort((a, b) => b.id - a.id)
          .map((review) => (
            <div
              key={review.id}
              className="card card-review text-white mt-4 container"
            >
              <div className="img-review">
                <Link to={`/review/${review.id}`}>
                  <img src={review.review_image} className="card-img-top" alt="imagen de reseña" />
                </Link>
              </div>

              <div className="content-title-comment">
                <div className="div-title-review">
                  {editContentId === review.id ? (
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => handleEditContent(e.target.value)}
                    />
                  ) : (
                    <h5 className="card-title title-review">{review.title}</h5>
                  )}
                </div>
                <div className="comment-review">
                  {editContentId === review.id ? (
                    <>
                      <textarea
                        autoFocus={true}
                        value={editContent}
                        onChange={(e) => handleEditContent(e.target.value)}
                        rows="7"
                        cols="38"
                        maxLength="300"
                        style={{ resize: "none" }}
                      ></textarea>
                      <button onClick={() => handleSave(review.id)}>Validar</button>
                    </>
                  ) : (
                    <p className="card-text">{review.comment_text}</p>
                  )}
                </div>
              </div>

              {store.user.id === review.user.id && (
                <div className="btn-review-options d-flex justify-content-end">
                  <button
                    className="btn-up-review"
                    onClick={() => handleUpdate(review.id)}
                  >
                    &#9998;
                  </button>
                  <button
                    className="btn-delete-review"
                    onClick={() => handleDelete(review.id)}
                  >
                    &#10008;
                  </button>
                </div>
              )}

              <div className="likes card-likes">
                <span className="author-review">
                  Publicado por : <span>{review.user.username}</span>{" "}
                </span>
                <div className="icons-review d-flex align-items-center justify-content-around">
                  <span className="me-3">
                    <FavoriteReview reviewId={review.id} />
                  </span>
                  <Likes reviewId={review.id} />
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CardsReview;
