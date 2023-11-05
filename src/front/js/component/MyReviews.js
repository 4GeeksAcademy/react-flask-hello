import React, { useContext } from "react";
import { Context } from "../store/appContext";
import useReviewManagement from "../hooks/useReviewManagement";
import Likes from "./Likes";
import { Link } from "react-router-dom";
import FavoriteReview from './FavoriteReview'

const MyReviews = ({ searchQuery }) => {
  const { store, actions } = useContext(Context)
  const userId = store.user.id;
  const userReviews = store.reviews.filter((review) => review.user.id === userId);
  const { handleUpdate, handleSave, handleDelete, reviews, editContent, editContentId, editTitle, handleEditContent } = useReviewManagement();


  return (
    <div className='cards-review'>
      {userReviews
        .filter(
          (review) =>
            review.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            review.comment_text
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
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
                  <h5 className="card-title title-review break-word">{review.title}</h5>
                )}
              </div>
              <div className="comment-review">
                {editContentId === review.id ? (
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
                    <button onClick={() => handleSave(review.id)}>Validar</button>
                  </>
                ) : (
                  <p className="card-text">{review.comment_text}</p>
                )}
              </div>
            </div>
            {store.user.id === review.user.id && (
              <div className="btn-options d-flex justify-content-end">
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
  );
};

export default MyReviews;