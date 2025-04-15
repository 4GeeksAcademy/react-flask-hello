import { useEffect, useState } from "react";

export const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const loadTasks = async () => {
    const res = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/tasks");
    const data = await res.json();
    setTasks(data);
  };

  const addTask = async () => {
    await fetch(import.meta.env.VITE_BACKEND_URL + "/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title })
    });
    setTitle("");
    loadTasks();
  };

  const deleteTask = async (id) => {
    await fetch(import.meta.env.VITE_BACKEND_URL + `/api/tasks/${id}`, { method: "DELETE" });
    loadTasks();
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div className="container">
      <h2>Mis tareas</h2>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Nueva tarea" className="form-control mb-2" />
      <button onClick={addTask} className="btn btn-primary mb-4">Agregar</button>
      <ul className="list-group">
        {tasks.map(t => (
          <li key={t.id} className="list-group-item d-flex justify-content-between">
            {t.title}
            <button className="btn btn-sm btn-danger" onClick={() => deleteTask(t.id)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
};