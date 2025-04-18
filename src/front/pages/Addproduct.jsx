import React, { useState } from 'react';

const AddProduct = () => {
  const [formulario, setFormulario] = useState({
    product_name: '',
    price_per_unit: '',
    description: '',
    quantity: '',
    image_url: '',
  });

  const handleChange = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const token = localStorage.getItem('token'); // Agarra el JWT guardado (si lo tienes así)
  
      const response = await fetch('https://fluffy-space-spoon-v6q9vgr5vqjx2w5vx-3001.app.github.dev/api/productos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // <-- muy importante
        },
        body: JSON.stringify(formulario)
      });
  
      if (response.ok) {
        alert('Producto añadido correctamente!');
        setFormulario({
          product_name: '',
          price_per_unit: '',
          description: '',
          quantity: '',
          image_url: '',
        });
      } else {
        const data = await response.json();
        alert('Error: ' + data.msg);
      }
    } catch (error) {
      console.error('Error al enviar el producto:', error);
    }
  };
  

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md space-y-6 mt-10">
      <h2 className="text-2xl font-bold text-center mb-4">Añadir Nuevo Producto</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          name="product_name"
          value={formulario.product_name}
          onChange={handleChange}
          placeholder="Nombre del Producto"
          className="w-full border rounded p-2"
          required
        />

        <input
          type="number"
          step="0.01"
          name="price_per_unit"
          value={formulario.price_per_unit}
          onChange={handleChange}
          placeholder="Precio por Unidad"
          className="w-full border rounded p-2"
          required
        />

        <textarea
          name="description"
          value={formulario.description}
          onChange={handleChange}
          placeholder="Descripción"
          className="w-full border rounded p-2"
          required
        />

        <input
          type="number"
          name="quantity"
          value={formulario.quantity}
          onChange={handleChange}
          placeholder="Cantidad"
          className="w-full border rounded p-2"
          required
        />

        <input
          type="text"
          name="image_url"
          value={formulario.image_url}
          onChange={handleChange}
          placeholder="URL de la Imagen"
          className="w-full border rounded p-2"
        />

        <input
          type="number"
          name="user_id"
          value={formulario.user_id}
          onChange={handleChange}
          placeholder="ID del Usuario"
          className="w-full border rounded p-2"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
        >
          Añadir Producto
        </button>

      </form>
    </div>
  );
};

export default AddProduct;
