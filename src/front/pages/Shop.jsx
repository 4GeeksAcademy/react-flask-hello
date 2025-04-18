import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const products = [
  {
    id: 1,
    name: "Camiseta Oversize",
    description: "Camiseta de algodón orgánico, súper cómoda.",
    price: 29.99,
    image: "https://cdn.deporvillage.com/cdn-cgi/image/h=260,w=260,dpr=2,f=auto,q=75,fit=contain,background=white/product/jma-103500.713_001.jpg",
  },
  {
    id: 2,
    name: "Zapatillas Urbanas",
    description: "Diseño moderno, ideal para el día a día.",
    price: 89.99,
    image: "https://cdn.deporvillage.com/cdn-cgi/image/h=260,w=260,dpr=2,f=auto,q=75,fit=contain,background=white/product/nb-u370-cc_01.jpg",
  },
  {
    id: 3,
    name: "Mochila Explorer",
    description: "Perfecta para tus aventuras urbanas o al aire libre.",
    price: 49.99,
    image: "https://cdn.deporvillage.com/cdn-cgi/image/h=260,w=260,dpr=2,f=auto,q=75,fit=contain,background=white/product/tnf-cf9c4gz_006.jpg",
  },
];

export default function Shop() {
  const [carrito, setCarrito] = useState(() => {
    const localCarrito = localStorage.getItem('carrito');
    return localCarrito ? JSON.parse(localCarrito) : {};
  });

  const navigate = useNavigate();

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
    navigate('/cart');
  };

  return (
    <div className="p-8 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
      {products.map((product) => (
        <div key={product.id} className="rounded-xl overflow-hidden shadow hover:shadow-lg transition bg-white">
          <a href={product.image} target="_blank" rel="noopener noreferrer">
            <div className="overflow-hidden flex justify-center">
              <img
                src={product.image}
                alt={product.name}
                className="h-20 mx-auto object-cover transform hover:scale-125 transition duration-500"
              />
            </div>
          </a>
          <div className="p-2">
            <h2 className="text-sm font-semibold mb-1 text-center">{product.name}</h2>
            <p className="text-gray-600 text-xs mb-2 text-center">{product.description}</p>
            <div className="flex items-center justify-center gap-2">
              <span className="text-sm font-bold">${product.price}</span>
              <button
                className="bg-black text-white px-2 py-1 rounded-lg hover:bg-gray-800 transition text-xs"
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
