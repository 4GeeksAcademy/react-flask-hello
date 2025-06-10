import { useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";

export default function Cart() {
  const { store, dispatch } = useGlobalReducer();
  const [openModal, setOpenModal] = useState(false);

  const total = store.carrito.reduce(
    (acc, item) => acc + item.price * item.cantidad,
    0
  );

  const handlePayOpen = () => {
    setOpenModal(true);
  }

  const handlePayClose = () => {
    setOpenModal(false);
  }

  const handlePayNow = (e) => {
    e.preventDefault();
    setOpenModal(false);
    dispatch({ type: "vaciar_carrito" });
    alert("Pago realizado con éxito");
    setTimeout(() => navigate('/'), 3000)
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Carrito de compras</h2>

      {store.carrito.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <ul>
          {store.carrito.map(item => (
            <li key={item.id} className="border p-2 rounded flex justify-between items-center">
              <div>
                <p className="font-bold">{item.product_name}</p>
                <div className="flex items-center gap-2">
                  <button
                    className="btn btn-secondary"
                    onClick={() => dispatch({ type: "decrementar_cantidad", payload: item.id })}
                    disabled={item.cantidad <= 1}
                  >-</button>
                  <span className="mx-2">{item.cantidad}</span>
                  <button
                    className="btn btn-secondary"
                    onClick={() => dispatch({ type: "incrementar_cantidad", payload: item.id })}
                  >+</button>
                </div>
                <p>Precio unitario: {item.price.toFixed(2)} €</p>
                <p>Total: {(item.price * item.cantidad).toFixed(2)} €</p>
              </div>
              <button
                onClick={() => dispatch({ type: "eliminar_del_carrito", payload: item.id })}
                className="bg-danger text-white px-3 py-1 rounded"
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-4 text-right font-bold text-lg">
        Total: <strong>{total.toFixed(2)} €</strong>
      </div>

      {store.carrito.length > 0 && (
        <div className="mt-6 text-right">
          <button
            className="btn btn-primary text-white px-6 py-2 rounded hover:bg-green-700 mt-3"
            onClick={handlePayOpen}
          >
            Pagar
          </button>
        </div>
      )}

      {openModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-light bg-opacity-40 z-50 mt-3">
          <form >

            <div className="mb-3">
              <label htmlFor="" className="form-label">
                Nombre del titular
              </label>
              <input
                type="text"
                className="form-control"
                id=""
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="" className="form-label">
                Numero de tarjeta
              </label>
              <input
                type="text"
                className="form-control"
                id=""
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="" className="form-label">
                Numero de expiración
              </label>
              <input
                type="text"
                className="form-control"
                id=""
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="" className="form-label">
                CVV
              </label>
              <input
                type="text"
                className="form-control"
                id=""
                required
              />
            </div>

            <button type="submit" className="btn btn-success w-100 mb-5" onClick={handlePayNow}>
              pagar
            </button>

          </form>

          <button
            className="btn btn-primary text-white px-4 py-2 rounded hover:bg-green-700"
            onClick={handlePayClose}
          >
            Cerrar
          </button>
        </div>
      )}
    </div>
  );
}