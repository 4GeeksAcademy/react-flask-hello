import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import stripeServices from "../../services/stripeServices";
import userServices from "../../services/userServices";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useNavigate } from "react-router-dom";

const PaymentReturn = () => {
  const [status, setStatus] = useState(null);
  const [customerEmail, setCustomerEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { dispatch } = useGlobalReducer();
  const navigate = useNavigate();

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const sessionId = urlParams.get("session_id");

    const storedTarifa = localStorage.getItem("tarifa");
    if (!storedTarifa) {
      console.error("❌ No se encontró la tarifa en localStorage");
      return;
    }

    const tarifa = JSON.parse(storedTarifa);

    setLoading(true);
    stripeServices
      .fetchSessionStatus(sessionId, tarifa)
      .then((data) => {
        if (data?.error) throw new Error(data.error);
        setStatus(data.data.status);
        setCustomerEmail(data.data.customer_email);
        // actualizamos usuario
        userServices.getUserInfo().then((user) => {
          dispatch({ type: "login_register", payload: user });
        });
        localStorage.removeItem("tarifa");
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al verificar sesión:", err);
        setLoading(false);
      });
  }, []);

  if (status === "open") return <Navigate to="/checkout" />;

  if (status === "complete") {
    setTimeout(() => {
      navigate("/user");
    }, 3000);

    return (
      <section id="success">
        <p className="text-center m-5 fs-3 fw-bold">
          ¡Gracias por tu compra! Se ha enviado un correo de confirmación a {customerEmail}.
          Si tienes dudas, escríbenos a{" "}
          <a href="mailto:orders@example.com">orders@example.com</a>.
        </p>
      </section>
    );
  }

  return (
    <>
      {loading && (
        <div className="d-flex justify-content-center text-center mt-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      )}
    </>
  );
};

export default PaymentReturn;
