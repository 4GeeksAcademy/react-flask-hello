// src/pages/Cart.jsx
import useGlobalReducer from "../hooks/useGlobalReducer";

export default function Cart() {
  const { store, dispatch } = useGlobalReducer();

  const total = store.carrito.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Carrito de compras</h2>

      {store.carrito.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <ul className="space-y-4">
          {store.carrito.map(item => (
            <li key={item.id} className="border p-2 rounded flex justify-between items-center">
              <div>
                <p className="font-bold">{item.nombre}</p>
                <p>Cantidad: {item.cantidad}</p>
                <p>Precio unitario: {item.precio.toFixed(2)} €</p>
                <p>Total: {(item.precio * item.cantidad).toFixed(2)} €</p>
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
    </div>
  );
}
