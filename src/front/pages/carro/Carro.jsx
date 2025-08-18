import React, { useEffect, useState, useRef } from "react";
import useGlobalReducer from "../../hooks/useGlobalReducer";
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

  // Cargar del localStorage una vez
  useEffect(() => {
    const savedCarro = JSON.parse(localStorage.getItem("carro"));
    if (Array.isArray(savedCarro) && savedCarro.length > 0) {
      dispatch({ type: "loadCarro", payload: savedCarro });
    }
    didInit.current = true;
  }, [dispatch]);

  // Guardar cuando cambie (no en el primer render)
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

  // Helpers para compatibilidad de claves
  const getTitle = (it) => it.title || it.name || "Juego";
  const getImg = (it) => it.img || it.image || "https://via.placeholder.com/100";

  return (
    <div className="carro-container p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Carro de Compras</h1>

      {store.carro.length === 0 ? (
        <p className="text-gray-600">Tu carro está vacío</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {store.carro.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-white rounded-lg shadow p-4 hover:shadow-lg transition"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={getImg(item)}
                    alt={getTitle(item)}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                      {getTitle(item)}
                    </h2>
                    <p className="text-gray-600">
                      ${item.price}
                      {item.platform ? ` · ${item.platform}` : ""}
                    </p>
                    <div className="mt-2 flex items-center space-x-2">
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                        className="w-16 border rounded px-2 py-1 text-center"
                      />
                      <button
                        onClick={() => handleRemove(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
                <span className="text-gray-800 font-semibold">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
            <button
              onClick={handleClear}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded mt-4"
            >
              Vaciar carro
            </button>
          </div>

          <div className="bg-gray-50 rounded-lg shadow p-6 h-fit">
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
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded mt-6 w-full"
              onClick={() => setShowModal(true)}
            >
              Finalizar compra
            </button>
          </div>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow w-80 text-center">
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
  );
};
