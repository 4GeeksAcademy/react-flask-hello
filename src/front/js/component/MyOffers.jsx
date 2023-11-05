import React, { useContext } from 'react'
import { Context } from "../store/appContext";
import useOfferManagement from "../hooks/useOfferManagement"
// import Likes from "./Likes";
import { Link } from 'react-router-dom';


const MyOffers = ({ searchQuery }) => {
    const { store, actions } = useContext(Context);

    const userId = store.business_user.id;
    const userOffers = store.offers.filter((offer) => offer.business_id.id === userId);

    const { handleUpdate, handleSave, handleDelete, reviews, editContent, editContentId, editTitle, handleEditContent } = useOfferManagement();

    return (
        <div className='cards-offer'>
            {userOffers
                .filter(
                    (business_offer) =>
                        business_offer.offer_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        business_offer.offer_description
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase()) || business_offer.country.toLowerCase().includes(searchQuery.toLowerCase()) || business_offer.city.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .sort((a, b) => b.id - a.id)
                .map((business_offer) => {
                    return (
                        <div
                            key={business_offer.id}
                            className="card card-offer mb-3 mt-4">
                            <Link to={`/offer/${business_offer.id}`}>
                                <img src={business_offer.offer_image} className="card-img-top" alt="..."></img>
                            </Link>
                            <div className="card-body">
                                <div className="div-title-offer">
                                    {editContentId === business_offer.id ? (
                                        <input
                                            type="text"
                                            value={editTitle}
                                            onChange={(e) => handleEditContent(e.target.value)}
                                        />
                                    ) : (
                                        <h5 className="card-title offer-title">{business_offer.offer_title}</h5>
                                    )}
                                </div>
                                <div className='infos-country'>
                                    <p className="card-text country-offer">País:{business_offer.country}</p>
                                    <p className="card-text city-offer">Ciudad:{business_offer.city}</p>
                                </div>
                                {editContentId === business_offer.id ? (
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
                                    <p className="card-text">{business_offer.offer_little_description}</p>
                                )}
                                <div className='offer-price'>
                                    {editContentId === business_offer.id ? (
                                        <input
                                            type="number"
                                            value={editContent}
                                            onChange={(e) => handleEditContent(e.target.value)}
                                        />
                                    ) : (
                                        <p className="card-text price-user">Precio normal : <span className='price'>{business_offer.normal_user_price.toLocaleString()}$</span></p>
                                    )}
                                    {editContentId === business_offer.id ? (
                                        <div >
                                            <input
                                                type="number"
                                                value={editContent}
                                                onChange={(e) => handleEditContent(e.target.value)}

                                            />
                                            <div>
                                                <button onClick={() => handleSave(business_offer.id)}>Validar</button>
                                            </div>

                                        </div>
                                    ) : (
                                        <p className="card-text price-user"><u>Precio premium : <span className='price'>{business_offer.premium_user_price.toLocaleString()}$</span></u></p>
                                    )}
                                </div>
                                {store.business_user.id === business_offer.business_id.id &&
                                    // || store.user.is_admin 
                                    <div className="btn-options btn-op-offer-div  d-flex justify-content-end">
                                        <button
                                            className="btn-op-offer btn-up-offer"
                                            onClick={() => handleUpdate(business_offer.id)}
                                        >
                                            &#9998;
                                        </button>
                                        <button
                                            className=" btn-op-offer btn-delete-offer"
                                            onClick={() => handleDelete(business_offer.id)}
                                        >
                                            &#10008;
                                        </button>
                                    </div>
                                }

                                <Link to={`/offer/${business_offer.id}`}>
                                    <button className='btn-details'>Detalles</button>
                                </Link>

                            </div>

                        </div>

                    )
                })}
        </div >
    );
};

export default MyOffers;
