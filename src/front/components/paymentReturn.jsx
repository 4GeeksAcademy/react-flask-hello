import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import stripeServices from "../services/stripeServices";

const PaymentReturn = () => {
  const [status, setStatus] = useState(null);
  const [customerEmail, setCustomerEmail] = useState('');

//para manejar cuando se muestra el spinner
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    //extraemos el session_id de la url
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const sessionId = urlParams.get('session_id');

    //verificamos el estado de la sesión
    stripeServices.fetchSessionStatus(sessionId).then(data => {
      setStatus(data.status);
      setCustomerEmail(data.customer_email);
      setLoading(false);
    })

  }, []);
//si esta abierta, lo llevamos al checkout
  if (status === 'open') {
    return (
      <Navigate to="/checkout" />
    )
  }
//si completaste la compra, le mostramos un mensaje de éxito
  if (status === 'complete') {
    return (
      <section id="success">
        <p>
          We appreciate your business! A confirmation email will be sent to {customerEmail}.

          If you have any questions, please email <a href="mailto:orders@example.com">orders@example.com</a>.
        </p>
      </section>
    )
  }
//muestra el spinner mientras se verifica el estado de la sesión
  return (
    <>
      {loading && <div className="d-flex text-center justify-content-center">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
      }

    </>
  )
}

export default PaymentReturn