import React, { useContext, useEffect, useState } from 'react';
import PaypalCheckoutButton from './PayPalCheckoutButton';
import PaymentComponent from './PaymentComponent';
import { Context } from '../store/appContext';
import { useParams } from 'react-router-dom';

const PaymentOptions = () => {
  const { store, actions } = useContext(Context);


  const product = {
    description: "LATAM Trekking Tour",
    price: 2499.99,
  };
  return (
    <div className="content-offer-details">
      <div className="offer-payment">
        <h2>Un paso más <span><b>{store.user.username},</b> </span> y esta oferta es tuya!</h2>
        
      </div>
      <div className='btn-payment-content'>
        <div className="btn-payment">
          <div className="btn-paypal">
            <PaypalCheckoutButton product={product} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentOptions;