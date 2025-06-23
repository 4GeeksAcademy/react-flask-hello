import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import stripeServices from "../../services/stripeServices";
import useGlobalReducer from "../hooks/useGlobalReducer";
import {useNavigate} from "react-router-dom";
const PaymentReturn = () => {
  const [status, setStatus] = useState(null);
  const [customerEmail, setCustomerEmail] = useState('');
//para manejar cuando se muestra el spinner
  const [loading, setLoading] = useState(false);
  const { store } = useGlobalReducer();
  const navigate = useNavigate();
  let sessionId = null;
  useEffect(() => {
    setLoading(true);
    //extraemos el session_id de la url
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    sessionId = urlParams.get('session_id');
    //verificamos el estado de la sesión
    stripeServices.fetchSessionStatus(sessionId, JSON.parse(localStorage.getItem('tarifa'))).then(data => {
      setStatus(data.data.status);
      setCustomerEmail(data.data.customer_email);
      setLoading(false);
      console.log(data)
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
    //si completo la compra, actualizamos el back para que aparezca como pagado
    stripeServices.updatePaymentStatus(sessionId, ).then(() => {
      console.log("Payment status updated successfully");
      userServices.getUserInfo().then(user => {
        dispatch({ type: "login_register", payload: user });
      })
    }).catch(err => {
      console.error("Error updating payment status:", err);
    });
    setTimeout(() => {
      navigate("/user");
    }, 3000); // Redirige después de 5 segundos
    return (
      <section id="success">
        <p className="text-center m-5 fs-3 bold">
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