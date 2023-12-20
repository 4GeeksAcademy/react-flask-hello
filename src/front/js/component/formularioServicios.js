import React, { useState } from "react";

export const FormularioServicios = () => {
  // Estados para almacenar los datos del formulario
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [categoria, setCategoria] = useState("");

  // Función para manejar el envío del formulario
  const handleSubmit = (event) => {
    event.preventDefault(); // Evitar que el formulario se envíe de manera predeterminada

    // Aquí puedes realizar acciones con los datos, por ejemplo, imprimirlos en la consola
    let servicio = {
      nombre: nombre,
      descripcion: descripcion,
      categoria: categoria,
    };
    crearServicio(servicio);

    // Limpiar los campos después del envío
    setNombre("");
    setDescripcion("");
    setCategoria("");
  };
  const crearServicio = (servicio) => {
    fetch("https://playground.4geeks.com/apis/fake/todos/user/felipelasheras", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([]),
    })
      .then((resp) => {
        if (!resp.ok) {
          throw new Error("Failed to create array");
        }
        return resp.json();
      })
      .then((data) => {
        console.log("Array created successfully", data);
      })
      .catch((err) => console.error("Error:", err));
  };

  return (
    <div>
      <h2>Formulario</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="descripcion">Descripción:</label>
          <textarea
            id="descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="categoria">Categoría:</label>
          <input
            type="text"
            id="categoria"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">Enviar</button>
        </div>
      </form>
    </div>
  );
};

export default FormularioServicios;
