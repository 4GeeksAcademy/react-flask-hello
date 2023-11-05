import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../store/appContext.js';
import { Link, useParams } from 'react-router-dom';
import GeneralInfoDiv from '../component/GeneralInfoDiv.jsx';
import ReviewsDoubleModal from '../component/ReviewsDoubleModal.jsx'

const SingleOfferView = () => {
    const { store, actions } = useContext(Context);
    const params = useParams();
    const [offer, setOffer] = useState({})
    const [reviews, setReviews] = useState([])


    function goBack() {
        window.history.back();
    }

    useEffect(() => {
        const loadData = async () => {
            setOffer(await actions.getOfferById(params.offer_id));
            setReviews(await actions.getReviewsByOfferId(params.offer_id))

        }
        loadData()
        // console.log("Fetch for all offers in single offer view is working");
    }, []);

    // console.log(reviews) 

    return (
        <div className='single-offer-view'>
            <div className='general container '>
                <div className='d-flex justify-content-between up-card-buttons '>
                    <span className="go-results" onClick={goBack}>&#10094; Ir a resultados</span>
                    {store.user.username ? (
                        <Link to='/opciones-de-pago' >
                            <button type="submit" className='btn-primary upbutton buy-home-up'>Comprar</button>
                        </Link>
                    ) : null}

                </div>
                <div className='images'>
                    <img className='single-image' src={offer?.offer_image} alt="" /><img src="" alt="" /><img src="" alt="" />
                </div>

                <div className='text-offer-area'>
                    <div className='mt-3'>
                        <h3>{offer?.offer_title}</h3>
                    </div>


                    <div>
                        {offer?.offer_little_description}
                    </div>

                    <div className='mt-3'>
                        {offer?.offer_description}
                    </div>

                    <div className='mt-3'>
                        <h4>Mira las opciones de esta actividad y ¡elige la tuya!</h4>
                        <span>Precio para usuario normal: {offer?.normal_user_price}</span><br />
                        <span>Precio de usuario premium: {offer?.premium_user_price}</span>
                    </div>

                    <div className='mt-3'>
                        {/* <h4>Que saber antes de comprar</h4>

                    <div className='d-flex'>
                        <h4>¿Qué incluye?</h4>
                        <h4>¿Qué no incluye?</h4>
                    </div>

                    <div className='mt-3'><h4>Medidas de higiene y seguridad</h4></div> */}

                        <div><h4>Política de cancelación
                        </h4>
                            <p>Cancela gratis esta actividad hasta 1 día antes de realizarla. Podrás revisar las opciones de cambios y cancelaciones que tienes en nuestra sección <Link to="/terms">
                                <strong> términos y condiciones</strong>
                            </Link> </p>
                        </div>

                        {/* <div>
                        <h4>¿Quiénes no podrían realizar esta actividad?</h4>
                    </div> */}

                        <div>
                            <h4>Antes de asistir</h4>
                            <p>Para realizar esta actividad, solo deberás presentar y tener a mano tu documento de identificación.</p>
                        </div>

                        {/* <div>
                        <h4>Información general</h4>
                    </div> */}

                        <div>
                            <h4>Reseñas:</h4>
                            {/* 
                        {reviews.map(review => (

                                    <div>{review.title}</div>,
                                    <div>{}</div>

                        ))} */}

                        </div>
                    </div>
                    {store.user.username ? (
                        <>
                            <div className='d-flex justify-content-center'>
                                <Link to='/opciones-de-pago' >
                                    <button type="submit" className='btn-primary buy-home'>Comprar</button>
                                </Link>
                            </div>
                            <ReviewsDoubleModal offerId={params.offer_id} />
                        </>
                    ) : null}
                </div>
            </div>
            < GeneralInfoDiv />
        </div>
    );

};

export default SingleOfferView;
