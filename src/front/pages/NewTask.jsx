// src/front/pages/NewTask.jsx
import { Link } from "react-router-dom";
import { useState } from "react";
import { useStore } from "../hooks/useGlobalReducer"; // keep named export like en Admin

export default function NewTask() {
  const { store /*, actions*/ } = useStore();

  const [task, setTask] = useState({
    title: "",
    description: "",
    location: "",
    price: "",
    due_at: "",
    status: "open",
    posted_at: "",
    assigned_at: "",
    completed_at: "",
    categories: [], // guardamos array
  });

  const [catList, setCatList] = useState([
    { name: "General/Social", checked: false },
    { name: "Mascotas", checked: false },
    { name: "Shopping", checked: false },
    { name: "Jardín", checked: false },
    { name: "Muebles", checked: false },
  ]);

  const categoriesLabel =
    task.categories.length > 0
      ? task.categories.join(", ")
      : "Selecciona la categoría de tu tarea";

  const toggleCategory = (categoryName: string) => {
    const updated = catList.map((c) =>
      c.name === categoryName ? { ...c, checked: !c.checked } : c
    );
    setCatList(updated);

    const selected = updated.filter((c) => c.checked).map((c) => c.name);
    setTask((t) => ({ ...t, categories: selected }));
  };

  const addTask = async (e) => {
    e.preventDefault();
    try {
      const BASE = (import.meta.env.VITE_BACKEND_URL || "").replace(/\/$/, "");
      const r = await fetch(`${BASE}/api/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      });
      if (!r.ok) {
        const txt = await r.text();
        throw new Error(txt || "Error creando tarea");
      }
      // opcional: limpiar formulario
      setTask({
        title: "",
        description: "",
        location: "",
        price: "",
        due_at: "",
        status: "open",
        posted_at: "",
        assigned_at: "",
        completed_at: "",
        categories: [],
      });
      setCatList((arr) => arr.map((c) => ({ ...c, checked: false })));
      // TODO: feedback/toast o redirección
      // navigate('/...') si quieres
    } catch (err) {
      console.error(err);
      // TODO: mostrar error en UI
    }
  };

  return (
    <div className="container">
      <Link to="/">
        <button className="btn btn-primary">Back home</button>
      </Link>

      <div className="text-center">
        <h1>Publica una nueva tarea</h1>
      </div>

      <form className="border rounded-5 bg-light col-12 p-5" onSubmit={addTask}>
        <div className="mb-3">
          <label htmlFor="task-title" className="form-label">
            ¿Qué necesita hacerse?
          </label>
          <input
            type="text"
            className="form-control"
            id="task-title"
            placeholder="Escribe un título llamativo para tu tarea"
            value={task.title}
            onChange={(e) => setTask({ ...task, title: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="deadline" className="form-label">
            ¿Cuándo?
          </label>
          <input
            type="date"
            className="form-control"
            id="deadline"
            value={task.due_at}
            onChange={(e) => setTask({ ...task, due_at: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="location" className="form-label">
            ¿Dónde?
          </label>
          <input
            type="text"
            className="form-control"
            id="location"
            placeholder="Ciudad"
            value={task.location}
            onChange={(e) => setTask({ ...task, location: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="budget" className="form-label">
            ¿Cuál es tu presupuesto?
          </label>
          <input
            type="number"
            className="form-control"
            id="budget"
            value={task.price}
            onChange={(e) => setTask({ ...task, price: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="details" className="form-label">
            Detalles de la tarea
          </label>
          <textarea
            className="form-control"
            id="details"
            rows="3"
            placeholder="Escribe los detalles de la tarea a resolver"
            value={task.description}
            onChange={(e) => setTask({ ...task, description: e.target.value })}
          />
        </div>

        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {categoriesLabel}
          </button>

          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            {catList.map((cat, idx) => (
              <li className="dropdown-item" key={idx}>
                <input
                  type="checkbox"
                  className="form-check-input"
                  id={`cat-${idx}`}
                  checked={cat.checked}
                  onChange={() => toggleCategory(cat.name)}
                />
                <label className="form-check-label mx-2" htmlFor={`cat-${idx}`}>
                  {cat.name}
                </label>
              </li>
            ))}
          </ul>
        </div>

        <div className="my-3">
          <label className="form-check-label my-2" htmlFor="fotos">
            Sube algunas fotos que ayuden a entender la tarea
          </label>
          <input type="file" className="form-control" id="fotos" multiple />
        </div>

        <button type="submit" className="btn btn-primary my-2">
          Publicar tarea
        </button>
      </form>
    </div>
  );
}