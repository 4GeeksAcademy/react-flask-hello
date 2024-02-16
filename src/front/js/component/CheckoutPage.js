import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CheckoutPage = ({ event }) => {
  const [processingPayment, setProcessingPayment] = useState(false);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const navigate = useNavigate();

  const handlePayment = (event) => {
    event.preventDefault();
    setProcessingPayment(true);

    // Simulating payment processing for 3 seconds
    setTimeout(() => {
      setProcessingPayment(false);
      setPaymentConfirmed(true);

      // Navigate back to the homepage after 3 seconds
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }, 3000);
  };

  if (!event) {
    return <div>Loading...</div>; // Placeholder for when event data is being fetched
  }

  return (
    <div className="container checkout py-5">
      <div className="row checkout">
        {/* Left Column */}
        <div className="col-md-6">
          <h1>Eventure</h1>
          <h4 className="mb-4">Thank you for shopping with Eventure! Check your order below.</h4>
          <div className="mb-4">
            <div>
              <img src={event.image} alt="Event" className="img mb-4" style={{ width: "25%" }} />
            </div>
            <p className="mb-3 checkout-confirm">Get ready! You're going to...</p>
            <h3 className="mb-4">{event.name}</h3>
            <div className="d-flex">
              <div className="col-4">
                <p>Date: {event.date}</p>
              </div>
              <div>
                <p>Location: {event.venue}, {event.city}</p>
              </div>
            </div>
            <p>Ticket Price: ${event.price}</p>
          </div>
        </div>

        {/* Right Column */}
        <div className="col-md-6 ">
          <div className="card">
            <div className="card-body-checkout">
              <h3 className="mb-3">Checkout</h3>
              <form onSubmit={handlePayment}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="john@example.com"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Customer Details
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Name"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    placeholder="Address"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="country"
                    placeholder="Country"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="cardNumber" className="form-label">
                    Card Details
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="cardNumber"
                    placeholder="1234 5678 9012 3456"
                  />
                </div>
                <div className="mb-3 d-flex">
                  <div style={{ flex: "1", marginRight: "7px" }}>
                    <input
                      type="text"
                      className="form-control"
                      id="expiry"
                      placeholder="MM/YY"
                    />
                  </div>
                  <div style={{ flex: "1", marginLeft: "7px"  }}>
                    <input
                      type="text"
                      className="form-control"
                      id="cvv"
                      placeholder="CVV"
                    />
                  </div>
                </div>
                <button type="submit" className="btn btn-primary checkout-button mt-3" disabled={processingPayment}>
                  {processingPayment ? "Processing Payment..." : `Pay $${event.price}`}
                </button>
              </form>
              {paymentConfirmed && (
                <p className="mt-3 checkout-thank-you">
                  Thank you for shopping with Eventure, we will now return you to the homepage.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
