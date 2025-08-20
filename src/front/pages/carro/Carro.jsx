import React, { useEffect, useState, useRef } from "react";
import useGlobalReducer from "../../hooks/useGlobalReducer";
import mario from "../aboutus/img/mario.jpg";
import "./Carro.css";



export const Carro = () => {
  const { store, dispatch } = useGlobalReducer();
  const [showModal, setShowModal] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const didInit = useRef(false);

  const handleRemove = (id) => dispatch({ type: "removeFromCarro", payload: id });
  const handleClear = () => dispatch({ type: "clearCarro" });
  const handleQuantityChange = (id, quantity) =>
    dispatch({ type: "updateQuantity", payload: { id, quantity: parseInt(quantity) } });

  const getSubtotal = () =>
    store.carro.reduce((total, item) => total + item.price * item.quantity, 0);
  const getIVA = () => getSubtotal() * 0.21;
  const getTotal = () => getSubtotal() + getIVA();

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

  const handlePayment = () => {
    setShowModal(false);
    setPaymentSuccess(true);

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
                        ${item.price}
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
                    ${(item.price * item.quantity).toFixed(2)}
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
                <span>${getSubtotal().toFixed(2)}</span>
              </p>
              <p className="flex justify-between">
                <span>IVA (21%):</span>
                <span>${getIVA().toFixed(2)}</span>
              </p>
              <p className="flex justify-between text-lg font-semibold border-t pt-2">
                <span>Total:</span>
                <span>${getTotal().toFixed(2)}</span>
              </p>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="btn btn--primary mt-4 w-full"
            >
              Pagar
            </button>
          </aside>
        </div>
      )}

          {showModal && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-gray-900 text-white p-6 rounded shadow w-80 text-center">
          <h3 className="text-xl font-bold mb-4">¿Confirmar pago?</h3>
          <p className="mb-4">Total a pagar: ${getTotal().toFixed(2)}</p>
          <div className="flex justify-around">
            <button
              onClick={handlePayment}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
            >
              Confirmar
            </button>
            <button
              onClick={() => setShowModal(false)}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    )}
      {paymentSuccess && (
        <div className="fixed top-5 right-5 bg-green-500 text-white px-4 py-2 rounded shadow">
          ¡Pago realizado con éxito!
        </div>
      )}
</div>
    </section>
  );
};
