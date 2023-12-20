import React, { useState, useEffect } from "react";

const Publicacion = () => {
  const [tareas, setTareas] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/user/1", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw new Error("Failed to fetch data");
        }
      })
      .then((data) => {
        console.log(data);
        setTareas(data);
      })
      .catch((error) => {
        fetch("http://localhost:3001/user/publicacion/1", {
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
      });
  }, []);

  const agregarTarea = (e) => {
    if (e.key === "Enter" && e.target.value) {
      const nuevasTareas = [...tareas, { label: e.target.value, done: false }];
      setTareas(nuevasTareas);
      actualizarTareasEnServidor(nuevasTareas);
      e.target.value = "";
    }
  };

  const actualizarTareasEnServidor = (todos) => {
    fetch("http://localhost:3001/user/publicacion/", {
      method: "PUT",
      body: JSON.stringify(todos),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        console.log(resp.ok); // Será true (verdad) si la respuesta es exitosa.
        console.log(resp.status); // el código de estado = 200 o código = 400 etc.
        return resp.json(); // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
      })
      .then((data) => {
        //Aquí es donde debe comenzar tu código después de que finalice la búsqueda
        console.log(data); //esto imprimirá en la consola el objeto exacto recibido del servidor
      })
      .catch((error) => {
        //manejo de errores
        console.log(error);
      });
  };

  const eliminarTarea = (index) => {
    const nuevasTareas = [...tareas];
    nuevasTareas.splice(index, 1);
    setTareas(nuevasTareas);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Publicar trabajos</h1>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Nueva tarea"
          onKeyPress={agregarTarea}
        />
      </div>
      {tareas.length > 0 ? (
        <ul className="list-group">
          {tareas.map((tarea, index) => (
            <li
              key={index}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              {tarea.label}
              <span
                className="badge bg-danger rounded-pill cursor-pointer"
                onClick={() => eliminarTarea(index)}
              >
                X
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p>Noy hay Publicaciones activas, añadir publicaciones</p>
      )}
    </div>
  );
};

export default Publicacion;
