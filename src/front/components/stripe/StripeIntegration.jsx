import { loadStripe } from '@stripe/stripe-js';

// Cargar Stripe con tu clave pública
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export const StripeService = {
  // Crear sesión de checkout
  async createCheckoutSession(cartItems, userId = null) {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    
    try {
      const response = await fetch(`${backendUrl}/api/payment/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cart_items: cartItems,
          user_id: userId
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al crear la sesión de pago');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al crear sesión de checkout:', error);
      throw error;
    }
  },

  // Redirigir a Stripe Checkout
  async redirectToCheckout(sessionData) {
    const stripe = await stripePromise;
    
    if (!stripe) {
      throw new Error('Stripe no se ha cargado correctamente');
    }

    // Opción 1: Usar la URL directa (más simple)
    window.location.href = sessionData.checkout_url;
    
    // Opción 2: Usar el método de Stripe (alternativa)
    // const result = await stripe.redirectToCheckout({
    //   sessionId: sessionData.session_id,
    // });
    
    // if (result.error) {
    //   throw new Error(result.error.message);
    // }
  },

  // Verificar estado de una sesión
  async verifySession(sessionId) {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    
    try {
      const response = await fetch(`${backendUrl}/api/payment/verify-session/${sessionId}`);
      
      if (!response.ok) {
        throw new Error('Error al verificar la sesión');
      }

      return await response.json();
    } catch (error) {
      console.error('Error al verificar sesión:', error);
      throw error;
    }
  }
};

// Hook personalizado para manejar pagos con Stripe
export const useStripePayment = () => {
  const handlePayment = async (cartItems, userId = null) => {
    try {
      // Validar que el carrito no esté vacío
      if (!cartItems || cartItems.length === 0) {
        throw new Error('El carrito está vacío');
      }

      // Crear sesión de checkout
      const sessionData = await StripeService.createCheckoutSession(cartItems, userId);
      
      // Redirigir a Stripe Checkout
      await StripeService.redirectToCheckout(sessionData);
      
    } catch (error) {
      console.error('Error en el proceso de pago:', error);
      // Aquí puedes mostrar un mensaje de error al usuario
      alert(`Error en el pago: ${error.message}`);
      throw error;
    }
  };

  return { handlePayment };
};