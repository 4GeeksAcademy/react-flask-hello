import React, { useState, useEffect } from "react";

const products = [
  {
    id: 1,
    name: "Camiseta Oversize",
    description: "Camiseta de algodón orgánico, súper cómoda.",
    price: 29.99,
    image: "https://via.placeholder.com/300x300.png?text=Camiseta",
  },
  {
    id: 2,
    name: "Zapatillas Urbanas",
    description: "Diseño moderno, ideal para el día a día.",
    price: 89.99,
    image: "https://via.placeholder.com/300x300.png?text=Zapatillas",
  },
  {
    id: 3,
    name: "Mochila Explorer",
    description: "Perfecta para tus aventuras urbanas o al aire libre.",
    price: 49.99,
    image: "https://via.placeholder.com/300x300.png?text=Mochila",
  },
];

export default function Shop() {
  const [carrito, setCarrito] = useState(() => {
    const localCarrito = localStorage.getItem('carrito');
    return localCarrito ? JSON.parse(localCarrito) : {};
  });

  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);

  const addCarrito = (producto) => {
    setCarrito(prev => {
      const updated = { ...prev };
      if (updated[producto.id]) {
        updated[producto.id].cantidad += 1;
      } else {
        updated[producto.id] = { ...producto, cantidad: 1 };
      }
      return updated;
    });
  };

  return (
    <div className="p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <div key={product.id} className="rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition bg-white">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-60 object-cover"
          />
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold">${product.price}</span>
              <button
                className="bg-black text-white px-4 py-2 rounded-xl hover:bg-gray-800 transition"
                onClick={() => addCarrito({ id: product.id, title: product.name, precio: product.price })}
              >
                Agregar
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
