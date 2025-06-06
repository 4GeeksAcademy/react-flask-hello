// src/pages/ProductDetail.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";

const productos = [
  {
    id: 1,
    nombre: "Sudadera Negra",
    tipo: "Sudadera",
    genero: "Hombre",
    talla: "L",
    color: "Negro",
    descripcion: "Sudadera de algodón orgánico",
    precio: 39.99,
    imagen: "https://images.unsplash.com/photo-1600180758890-6c9f3c3c9b96"
  },
  {
    id: 2,
    nombre: "Zapatillas Blancas",
    tipo: "Zapatillas",
    genero: "Mujer",
    talla: "38",
    color: "Blanco",
    descripcion: "Zapatillas deportivas cómodas",
    precio: 59.99,
    imagen: "https://images.unsplash.com/photo-1583324113626-70df0f4deaab"
  },
  {
    id: 3,
    nombre: "Pantalón Jogger",
    tipo: "Pantalón",
    genero: "Unisex",
    talla: "M",
    color: "Gris",
    descripcion: "Jogger casual para uso diario",
    precio: 29.99,
    imagen: "https://images.unsplash.com/photo-1602810318363-7e89eeae3b2f"
  }
];

export default function ProductDetail() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const { dispatch } = useGlobalReducer();

  useEffect(() => {
    const p = productos.find(p => p.id === parseInt(id));
    setProducto(p);
  }, [id]);

  if (!producto) return <p className="p-4">Producto no encontrado.</p>;

  return (
    <div className="p-4">
      <img src={producto.imagen} alt={producto.nombre} className="w-full max-w-md mx-auto rounded" />
      <h2 className="text-2xl font-bold mt-4">{producto.nombre}</h2>
      <p>{producto.descripcion}</p>
      <p className="font-semibold text-xl">{producto.precio.toFixed(2)} €</p>

      <div className="flex gap-2 mt-4">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={() =>
            dispatch({ type: "agregar_al_carrito", payload: producto })
          }
        >
          Agregar al carrito
        </button>

        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={() =>
            dispatch({ type: "eliminar_del_carrito", payload: producto.id })
          }
        >
          Eliminar del carrito
        </button>
      </div>
    </div>
  );
}
