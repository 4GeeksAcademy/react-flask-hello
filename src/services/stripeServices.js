const backendUrl = import.meta.env.VITE_BACKEND_URL;

const stripeServices = {};

stripeServices.fetchClientSecret = async (tarifa) => {
  const items = [{ price: tarifa.price_id, quantity: 1 }];
  const res = await fetch(`${backendUrl}/api/create-checkout-session`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ items }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error("Error creating checkout session");
  return data.clientSecret;
};

stripeServices.fetchSessionStatus = async (sessionId, plan) => {
  if (!plan || !plan.id || !plan.price) {
    console.error("❌ Plan inválido al verificar sesión:", plan);
    throw new Error("El plan no está definido correctamente.");
  }

  const res = await fetch(`${backendUrl}/api/session-status?session_id=${sessionId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const data = await res.json();
  return stripeServices.updatePaymentStatus(sessionId, plan.id, plan.price, data);
};


stripeServices.updatePaymentStatus = async (sessionId, planId, price, statusData) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const res = await fetch(`${backendUrl}/api/payments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        session_id: sessionId,
        user_id: user.id,
        subscription_id: planId,
        amount: price,
        method: "stripe",
        status: "complete",
      }),
    });
    if (!res.ok) throw new Error("Error updating payment status");
    const data = await res.json();
    return { data: statusData, payment: data, message: "Payment status updated successfully" };
  } catch (error) {
    console.error("Error updating payment status:", error);
    return { error: error.message };
  }
};

export default stripeServices;
