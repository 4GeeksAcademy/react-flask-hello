import React, { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { AmountSubmit } from "./amountSubmitForm";

export const Payment = () => {
 const [stripePromise, setStripePromise] = useState(null);
 const [clientSecret, setClientSecret] = useState("");
 const [amount, setAmount] = useState('');

 useEffect(() => {
    fetch("https://solid-sniffle-7vpx5qp4qrjcqwp-3001.app.github.dev/api/config")
       .then(async (response) => {
         const { publishableKey } = await response.json();
         setStripePromise(loadStripe(publishableKey)); 
       })
       .catch((error) => {
         console.error("Failed to fetch config:", error);
       });
   }, []);

   useEffect(() => {
    fetch("https://solid-sniffle-7vpx5qp4qrjcqwp-3001.app.github.dev/api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: amount }), 
    })
      
      .then(async (result) => {
        const { client_secret } = await result.json();
        setClientSecret(client_secret);
      })
      .catch((error) => {
        console.error("Failed to create payment intent:", error);
      });
 }, [amount]);

 return (
    <>
      <h1>Donation</h1>
      <AmountSubmit setParentAmount={setAmount} /> {}
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
    </>
 );
};