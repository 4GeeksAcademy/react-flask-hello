import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../store/appContext.js';
import { useParams } from 'react-router-dom';
import FavoriteReview from '../component/FavoriteReview.js';
import Likes from '../component/Likes.js';

const SingleReviewView = () => {
  const { store, actions } = useContext(Context);
  const params = useParams();
  const [review, setReview] = useState({})


  useEffect(() => {
    const loadData = async () => {
      setReview(await actions.getReviewById(params.review_id));
    }
    loadData()
    // console.log("Fetch for all reviews in single review view is working");
  }, []);
  return (
    <div className='content-single-review card-review'>
      <div className='img-single-review'>
        <img src={review?.review_image} alt="" />
      </div>
      <div className='content-title-comment'>
        <div className='title-single-review div-title-review'>
          <h1 className='card-title title-review'>{review?.title}</h1>
        </div>
        <div className='comment-single-review comment-review'>
          <p className='card-text'>{review?.comment_text}</p>
        </div>
      </div>
      <div className="likes card-likes">
        <span className="author-review">
          Publicado por : <span>{review?.user?.username}</span>{" "}
        </span>
        <div className="icons-review d-flex align-items-center justify-content-around">
          <span className="me-3">
            <FavoriteReview reviewId={review.id} />
          </span>
          <Likes reviewId={review.id} />
        </div>
      </div>

    </div>
  )
}

export default SingleReviewView