import React, { useContext, useEffect } from 'react';
import { Context } from '../store/appContext';
import { Link } from 'react-router-dom';
import FavoriteReview from './FavoriteReview';

const HomeReviewCard = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.getReviews();
        // console.log("Fetch for all reviews is working")
    }, []);

    return (
        <div>
            <div className="home-offer-h1-review">
                <h4><strong>Lo que más gustó a otros clientes:</strong> revisa las últimas reseñas</h4>
            </div>

            <div className='homeReviewCard'>

                {store.reviews
                    .slice(0, 10)
                    .sort(() => Math.random() - 0.5) // Orden aleatorio
                    .map((review) =>

                        <div className='card-transition-review'>
                            <div key={review.id} className="card-home-review"  >
                                <div className='nothing'></div>
                                <div>
                                    <span className='fav-home-review'>
                                        <FavoriteReview reviewId={review.id} />
                                    </span>
                                </div>
                                <div className='content-link'>
                                    <Link to={`/review/${review.id}`} >
                                        <div className="card img-home-review d-flex" >
                                            <img src={review.review_image} className="card-img" alt="..." ></img>
                                        </div>
                                        <div className="title-home-review">
                                            <div>
                                                <h5 className="card-title break-word"><i>"{review.title}"</i></h5>
                                            </div>
                                            <p className='author-home-review'>por <span>
                                                {review.user.username}</span> </p>
                                        </div>

                                    </Link>
                                </div>
                            </div>

                        </div>

                    )}
            </div>

        </div >

    );
};

export default HomeReviewCard;

