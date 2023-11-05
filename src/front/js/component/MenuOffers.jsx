import React, {useContext, useState}from 'react';
import BusinessOfferCard from './BusinessOfferCard.jsx';
import MyOffers from './MyOffers.jsx';
import AllFavoritesOffers from './AllFavoritesOffers';
import { Context } from '../store/appContext';

const MenuOffer = ({ searchQuery }) => {
    const {store} = useContext(Context)

    return (
        <div className='container mt-5'>
            <ul className="nav nav-tabs menu-review" id="myTab" role="tablist">
                <li className="nav-item nav-review" role="presentation">
                    <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Todas las ofertas</button>
                </li>
                { store.business_user.business_name && 
                <>
                <li className="nav-item nav-review" role="presentation">
                    <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Mis ofertas</button>
                </li>
                </>}
                { store.user.username && <>
                    <li className="nav-item nav-review" role="presentation">
                    <button className="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button" role="tab" aria-controls="contact" aria-selected="false">Ofertas favoritas</button>
                </li>
                </>}
            </ul>
            <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab"><BusinessOfferCard searchQuery={searchQuery} /></div>
                {  store.business_user.business_name &&  <>
                    <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab"><MyOffers searchQuery={searchQuery} /></div>

                </>}
                { store.user.username && 
                <><div className="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab"><AllFavoritesOffers searchQuery={searchQuery} /></div>
                </>}
            </div>

        </div>
    );
};

export default MenuOffer