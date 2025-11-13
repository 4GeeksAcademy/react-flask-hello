const backendUrl = import.meta.env.VITE_BACKEND_URL;
const stripeServices = {}


stripeServices.fetchClientSecret = async (producto) => {


    const res = await fetch(backendUrl + "/api/create-checkout-session", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: producto.nombre_producto,
            description: producto.descripcion_producto,
            amount: producto.precio.toFixed(2) * 100, // en centavos
            quantity: 1
        }),
    });

    const data = await res.json();
    console.log(data)
    return data;
};

stripeServices.fetchSessionStatus = async (sessionId) => {
    return fetch(backendUrl + `/api/session-status?session_id=${sessionId}`)
        .then((res) => res.json())
        .then((data) => data)
};


export default stripeServices