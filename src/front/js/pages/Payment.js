import React, { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../component/CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { AmountSubmit } from "../component/amountSubmitForm";
import { NavBar } from "../component/navbar";
import Image4 from "../../img/image4.jpg";

export const Payment = () => {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [amount, setAmount] = useState('');

  useEffect(() => {
    const routeRequirement = "/api/config";
    const url = `${process.env.BACKEND_URL}${routeRequirement}`;
    fetch(url)
      .then(async (response) => {
        const { publishableKey } = await response.json();
        setStripePromise(loadStripe(publishableKey));
      })
      .catch((error) => {
        console.error("Failed to fetch config:", error);
      });
  }, []);

  useEffect(() => {
    const routeRequirement = "/api/create-payment-intent";
    const url = `${process.env.BACKEND_URL}${routeRequirement}`;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: amount * 100 }),
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
    <div className="home">
          <NavBar />
          <div className="hero">
				    <img className="hero__image" src={Image4} />
              <div className="container donate-box ">
                <h4><strong>JOIN THE CLEANUP!</strong></h4>
                <p>Please enter the amount in <strong>euros</strong> you wish to donate to our cause</p>
                <AmountSubmit setParentAmount={setAmount} /> {}
                {clientSecret && stripePromise && (
                  <Elements stripe={stripePromise} options={{ clientSecret }} >
                    <CheckoutForm />
                  </Elements>
                )}
                <p>This is a secure system, your data will never be used in ways that you haven’t explicitly opted in to.</p>
            </div>
          </div>        
        </div> 
  );
};

