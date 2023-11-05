import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../store/appContext.js'
import { Link } from 'react-router-dom';

const HomeOfferCard = () => {
    const { store, actions } = useContext(Context);
    const [randomOffers, setRandomOffers] = useState([]);

    useEffect(() => {
        actions.getAllOffers();
    }, []);

    useEffect(() => {
        if (store.offers.length > 0) {
            const shuffledOffers = [...store.offers];
            for (let i = shuffledOffers.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffledOffers[i], shuffledOffers[j]] = [shuffledOffers[j], shuffledOffers[i]];
            }
            setRandomOffers(shuffledOffers);
        }
    }, [store.offers]);

    return (
        <div>
            <div className='home-offer-h1'>
                <h4><strong>Disfruta de las experiencias,</strong> encuentra excursiones y tours</h4>
            </div>

            <div className='home-offer-card'>



                {randomOffers
                
                    .slice(0, 3)
                    .sort(() => Math.random() - 0.5) // Orden aleatorio
                    .map((offer) => (
                        <div key={offer.id} className='card-transition'>
                            <div className="card-home-offer">
                                <Link to={`/offer/${offer.id}`}>
                                    <img src={offer.offer_image} className="" alt="..." />
                                    <div className="card-home-text mt-1">
                                        <p>Actividades</p>
                                        <h2 className="home-offer-title">{offer.offer_title}</h2>
                                        <div className='home-prices'>
                                            <p className="">Precio normal: {offer.normal_user_price.toLocaleString()}$</p>
                                            <p className="second-span">Precio premium: {offer.premium_user_price.toLocaleString()}$</p>
                                            <span style={{ color: 'purple' }}>Ver actividad &#10095; </span>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default HomeOfferCard;


