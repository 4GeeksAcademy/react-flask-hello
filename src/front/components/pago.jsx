import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import "./Payment.css";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export const Payment = () => {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch(import.meta.env.VITE_BACKEND_URL + "/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product: "Spidy Premium", price: 19.99 }),
      });

      const data = await res.json();

      const stripe = await stripePromise;
      await stripe.redirectToCheckout({ sessionId: data.id });
    } catch (error) {
      console.error(error);
      alert("Error creating payment session");
    }
    setLoading(false);
  };

  return (
    <section className="payment-section">
      <div className="payment-card">
        <h2>Complete Your Purchase</h2>
        <p>Get access to exclusive deals and personalized shopping.</p>
        <div className="price">$19.99</div>
        <button onClick={handleCheckout} disabled={loading}>
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </div>
    </section>
  );
};

export default Payment;
