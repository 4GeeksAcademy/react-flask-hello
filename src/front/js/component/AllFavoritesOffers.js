import React, { useContext, useEffect, useLayoutEffect } from 'react';
import { Context } from '../store/appContext';
import useOfferManagement from "../hooks/useOfferManagement";
import FavoriteOffer from "./FavoriteOffer.jsx";
import { Link } from 'react-router-dom';




const AllFavoritesOffers = ({ searchQuery }) => {
    const { store, actions } = useContext(Context)
    const { handleUpdate, handleSave, handleDelete, favorites, reviews, editContent, editContentId, editTitle, handleEditContent } = useOfferManagement();


    useEffect(() => {
        actions.getFavoriteoffer();
        // console.log("Success fetch for Cardsofers");
    }, []);



    return (
        <div className='cards-offer'>
            {store.favorites && store.favorites.length >= 1 && store.favorites
                .filter(
                    (favorite) =>
                        favorite?.offer_id?.offer_title
                            .toLowerCase().includes(searchQuery.toLowerCase()) ||
                        favorite?.offer_id?.offer_description
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase()) || favorite?.offer_id?.country.toLowerCase().includes(searchQuery.toLowerCase()) || favorite?.offer_id?.city.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .sort((a, b) => b.id - a.id)
                .map((favorite) => {
                    return (

                        <div
                            key={favorite?.offer_id?.id}
                            className="card card-offer mb-3 mt-4">
                            <Link to={`/offer/${favorite?.offer_id?.id}`}>
                                <img src={favorite?.offer_id?.offer_image} className="card-img-top" alt="..."></img>
                            </Link>
                            <div className="card-body">
                                <div className="div-title-offer">
                                    {editContentId === favorite?.offer_id?.id ? (
                                        <input
                                            type="text"
                                            value={editTitle}
                                            onChange={(e) => handleEditContent(e.target.value)}
                                        />
                                    ) : (
                                        <h5 className="card-title offer-title">{favorite?.offer_id?.offer_title}</h5>
                                    )}
                                </div>
                                <div className='infos-country'>
                                    <p className="card-text country-offer">País:{favorite?.offer_id?.country}</p>
                                    <p className="card-text city-offer">Ciudad:{favorite?.offer_id?.city}</p>
                                </div>
                                {editContentId === favorite?.offer_id?.id ? (
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
                                ) : (
                                    <p className="card-text">{favorite?.offer_id?.offer_little_description}</p>
                                )}
                                <div className='offer-price'>
                                    {editContentId === favorite?.offer_id?.id ? (
                                        <input
                                            type="number"
                                            value={editContent}
                                            onChange={(e) => handleEditContent(e.target.value)}
                                        />
                                    ) : (
                                        <p className="card-text price-user">Precio normal : <span className='price'>{favorite?.offer_id?.normal_user_price.toLocaleString()}$</span></p>
                                    )}
                                    {editContentId === favorite?.offer_id?.id ? (
                                        <div >
                                            <input
                                                type="number"
                                                value={editContent}
                                                onChange={(e) => handleEditContent(e.target.value)}

                                            />
                                            <div>
                                                <button onClick={() => handleSave(favorite?.offer_id?.id)}>Validar</button>
                                            </div>

                                        </div>
                                    ) : (
                                        <p className="card-text price-user"><u>Precio premium : <span className='price'>{favorite?.offer_id?.premium_user_price.toLocaleString()}$</span></u></p>
                                    )}
                                </div>
                                {store.business_user.id === favorite?.offer_id?.business_id.id &&
                                    // || store.user.is_admin
                                    <div className="btn-options d-flex justify-content-end">
                                        <button
                                            className="btn-up-offer"
                                            onClick={() => handleUpdate(business_offer.id)}
                                        >
                                            &#9998;
                                        </button>
                                        <button
                                            className="btn-delete-offer"
                                            onClick={() => handleDelete(business_offer.id)}
                                        >
                                            &#10008;
                                        </button>
                                    </div>

                                }


                                {store.user.username && <>


                                    <div className="fav-offer-div">
                                        <div className="fav-offer-container">
                                            <span className="fav-offer-span">
                                                <FavoriteOffer offerId={favorite?.offer_id?.id} />
                                            </span>
                                        </div>
                                    </div>
                                    <Link to={`/offer/${favorite?.offer_id?.id}`}>
                                        <button className='btn-details'>Detalles</button>
                                    </Link>
                                    <Link to='/opciones-de-pago'>
                                        <button className='btn-buy'>Comprar</button>
                                    </Link>
                                    {/* <span><FavoriteOffer offerId={favorite?.offer_id?.id} /></span> */}


                                </>

                                }


                            </div>

                        </div>
                    )
                })}
        </div>
    );
};


export default AllFavoritesOffers