import React, { useEffect, useState } from "react";
import "./Payment.css";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useNavigate } from "react-router-dom";
import stripeServices from "../services/stripe.services";
import { loadStripe } from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from '@stripe/react-stripe-js';


export const Payment = () => {
  const [loading, setLoading] = useState(false);
  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate()
  const [clientSecret, setClientSecret] = useState();
  const [url, setUrl] = useState('')



  useEffect(() => {
    if (!store.buy_producto || !store.user) return navigate('/explorar')
    stripeServices.fetchClientSecret(store.buy_producto).then(url => {
      setUrl(url.url)
    })


  }, [])


  useEffect(() => {
    if (url !== '') window.location.href = url
  }, [url])



  return (
    <section className="payment-section">
      <div id="checkout">

        loading...


      </div>
      {/* <div className="payment-card ">
        <h2>Complete su compra</h2>
        <div className="d-flex ">

        <p className="lead fs-4">*{store.buy_producto?.nombre_producto} -- ${store.buy_producto?.precio.toFixed(2)}</p>
        
        </div>
        <button onClick={''} disabled={loading}>
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </div> */}
    </section>
  );
};

export default Payment;