import React, { useEffect, useState, useRef } from "react";
import useGlobalReducer from "../../hooks/useGlobalReducer";
import { useStripePayment } from "../../components/stripe/StripeIntegration";
import mario from "../aboutus/img/mario.jpg";
import "./Carro.css";

export const Carro = () => {
  const { store, dispatch } = useGlobalReducer();
  const { handlePayment } = useStripePayment();
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const didInit = useRef(false);

  // Obtener usuario actual si está logueado
  const getCurrentUser = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  };

  const handleRemove = (id) => dispatch({ type: "removeFromCarro", payload: id });
  const handleClear = () => dispatch({ type: "clearCarro" });
  const handleQuantityChange = (id, quantity) =>
    dispatch({ type: "updateQuantity", payload: { id, quantity: parseInt(quantity) } });
  const getIVA = () =>store.carro.reduce((total, item) => total + item.price * item.quantity  *0.21, 0);
  const getTotal = () =>store.carro.reduce((total, item) => total + item.price * item.quantity, 0);

  const getSubtotal = () => getTotal() - getIVA();

  useEffect(() => {
    const savedCarro = JSON.parse(localStorage.getItem("carro"));
    if (Array.isArray(savedCarro) && savedCarro.length > 0) {
      dispatch({ type: "loadCarro", payload: savedCarro });
    }
    didInit.current = true;
  }, [dispatch]);

  useEffect(() => {
    if (didInit.current) {
      localStorage.setItem("carro", JSON.stringify(store.carro));
    }
  }, [store.carro]);

  // Función para procesar pago con Stripe
  const handleStripePayment = async () => {
    if (store.carro.length === 0) {
      alert('El carrito está vacío');
      return;
    }

    setPaymentLoading(true);
    
    
    try {
      const currentUser = getCurrentUser();
      const userId = currentUser ? currentUser.id : null;

      // Preparar items del carrito para Stripe
      const cartItems = store.carro.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        platform: item.platform
      }));

      // Procesar pago con Stripe
      await handlePayment(cartItems, userId);
      
      // Si llegamos aquí, el usuario fue redirigido a Stripe
      // La limpieza del carrito se hará en la página de éxito
      
    } catch (error) {
      console.error('Error al procesar pago:', error);
      setPaymentLoading(false);
      // El error ya se muestra en useStripePayment
    }
  };

  // Función de pago simulado (mantener como backup o para testing)
  const handleSimulatedPayment = () => {
    const nuevaCompra = {
      fecha: new Date().toLocaleString(),
      total: getTotal(),
      productos: [...store.carro],
    };
    
    const historial = JSON.parse(localStorage.getItem("historialCompras")) || [];
    historial.push(nuevaCompra);
    localStorage.setItem("historialCompras", JSON.stringify(historial));

    dispatch({ type: "clearCarro" });
    localStorage.removeItem("carro");

    setPaymentSuccess(true);
    setTimeout(() => setPaymentSuccess(false), 3000);
  };

  const getTitle = (it) => it.title || it.name || "Juego";
  const getImg = (it) => it.img || it.image || "https://via.placeholder.com/100";

  return (
    <section className="carro-page">
      {/* Fondo a pantalla completa */}
      <div
        className="carro-bg"
        style={{ backgroundImage: `url(${mario})` }}
        aria-hidden="true"
      />

      {/* Contenido centrado y con ancho máximo */}
      <div className="carro-container">
        <h1 className="carro-title">Carro de compras</h1>

        {store.carro.length === 0 ? (
          <div className="carro-empty">
            <h2>Tu carro está vacío</h2>
            <p>Empieza a añadir juegos para verlos aquí.</p>
          </div>
        ) : (
          <div className="carro-grid">
            <div className="carro-list">
              {store.carro.map((item) => (
                <article key={item.id} className="carro-box">
                  <div className="carro-item">
                    <div className="flex items-center gap-4">
                      <img
                        src={getImg(item)}
                        alt={getTitle(item)}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <div>
                        <h2 className="carro-item-title">{getTitle(item)}</h2>
                        <p className="carro-item-price">
                          €{item.price}
                          {item.platform ? ` · ${item.platform}` : ""}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) =>
                              handleQuantityChange(item.id, e.target.value)
                            }
                            className="carro-input"
                          />
                          <button
                            onClick={() => handleRemove(item.id)}
                            className="carro-remove-btn"
                          >
                            Eliminar
                          </button>
                        </div>
                      </div>
                    </div>
                    <span>
                      €{(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </article>
              ))}

              <button onClick={handleClear} className="carro-clear-btn">
                Vaciar carro
              </button>
            </div>

            <aside className="carro-summary">
              <h2 className="text-xl font-bold mb-4">Resumen</h2>
              <div className="space-y-2 text-gray-700">
                <p className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>€{getSubtotal().toFixed(2)}</span>
                </p>
                <p className="flex justify-between">
                  <span>IVA (21%):</span>
                  <span>€{getIVA().toFixed(2)}</span>
                </p>
                <p className="flex justify-between text-lg font-semibold border-t pt-2">
                  <span>Total:</span>
                  <span>€{getTotal().toFixed(2)}</span>
                </p>
              </div>
              
              {/* Botón principal de pago con Stripe */}
              <button
                onClick={handleStripePayment}
                disabled={paymentLoading || store.carro.length === 0}
                className={`mt-4 w-full py-3 px-4 rounded-lg font-semibold text-white transition-colors ${
                  paymentLoading 
                    ? 'bg-gray-500 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {paymentLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Procesando...
                  </div>
                ) : (
                  'Pagar con Stripe'
                )}
              </button>

              {/* Botón de pago simulado (para testing) */}
              <button
                onClick={handleSimulatedPayment}
                className="mt-2 w-full py-2 px-4 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Pago Simulado (Testing)
              </button>
            </aside>
          </div>
        )}

        {/* Mensaje de éxito */}
        {paymentSuccess && (
          <div className="fixed top-5 right-5 bg-green-500 text-white px-4 py-2 rounded shadow z-50">
            ¡Pago realizado con éxito!
          </div>
        )}
      </div>
    </section>
  );
};