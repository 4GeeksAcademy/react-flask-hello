const backendUrl = import.meta.env.VITE_BACKEND_URL;
const stripeServices = {};

stripeServices.fetchClientSecret = async (items) => {
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
  // items = [{price: "price_id", quantity: 1}]

  const res = await fetch(backendUrl + "/api/create-checkout-session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ items: items }),
  });

  const data = await res.json();

  return data.clientSecret;
};

stripeServices.fetchSessionStatus = async (sessionId) => {
  return fetch(backendUrl + `/api/session-status?session_id=${sessionId}`)
    .then((res) => res.json())
    .then((data) => data);
};

export default stripeServices;
