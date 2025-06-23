const backendUrl = import.meta.env.VITE_BACKEND_URL;
const stripeServices = {};
stripeServices.fetchClientSecret = async (tarifa) => {
  /*
     Create a Checkout Session
    le vamos a pasar los items que son los productos que se van a comprar
    los itemns son un array de objetos con la siguiente estructura:
    [
    {price: "price_1RWvuTA9wzTLXCekBvIVg8Zh", quantity: 1},
    etc...
    ]
    el price es el id del PRECIO del PRODUCTO que se va a comprar, el ID lo da stripe al crear el producto
    para facilitar obtener el id del PRECIO, puedes almacenarlo en la base de datos
    como no tenemos una base de datos, lo vamos poner directamente en el código para probarlo
    se pueden pasar tantos items como se quiera, pero hay que tener en cuenta que el ID del PRECIO del producto
    stripe se ocupa de mostrar el total de la compra y todo lo necesario para que el usuario pueda pagar
    */
  const items = [{price: tarifa.price_id, quantity: 1}]
  const res = await fetch(backendUrl + "/api/create-checkout-session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ items}),
  });
  const data = await res.json();
  console.log("data", data);
  if (!res.ok) {
    throw new Error("Error creating checkout session");
  }
  return data.clientSecret;
};
stripeServices.fetchSessionStatus = async (sessionId,  {id, price}) => {
  return fetch(backendUrl + `/api/session-status?session_id=${sessionId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => res.json())
    .then((data) => stripeServices.updatePaymentStatus(sessionId, id, price, data));
};
stripeServices.updatePaymentStatus = async (sessionId, id, price, statusData) => {
  try {
      const resp = await fetch(backendUrl + `/api/payments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ session_id: sessionId, method: "stripe", subscription_id: id, status: "complete", amount: price }),
  })
  if (!resp.ok) {
    throw new Error("Error updating payment status");
  }
  const data = await resp.json();
  console.log("Payment status updated:", data);
  return {data: statusData, payment:data, message: "Payment status updated successfully"};
  } catch (error) {
    console.error("Error updating payment status:", error);
    return { error: error.message };
  }
};
export default stripeServices;