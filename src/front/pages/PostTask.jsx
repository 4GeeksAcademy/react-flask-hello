// src/front/pages/PostTask.jsx
import { useState } from "react";
import { createTask } from "../api/tasks";

export default function PostTask(){
  const [form, setForm] = useState({
    title: "", description: "", location: "", price: "", status: "pending"
  });
  const [msg, setMsg] = useState("");

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  async function submit(e){
    e.preventDefault();
    setMsg("");
    try {
      // publisher_id DEMO: 1 (el seed crea usuario demo con id=1)
      const created = await createTask({
        title: form.title,
        description: form.description,
        location: form.location || undefined,
        price: form.price ? Number(form.price) : undefined,
        status: form.status,
        publisher_id: 1,
      });
      setMsg(`Task creada (id ${created.id}). Abre "Browse tasks" para verla.`);
      setForm({ title:"", description:"", location:"", price:"", status:"pending" });
    } catch(e){
      setMsg("Error: " + (e.message || "no se pudo crear"));
    }
  }

  return (
    <div className="container" style={{maxWidth: 700, margin:"2rem auto"}}>
      <h2>Post a task</h2>
      <form onSubmit={submit} className="card" style={{padding:16, display:"grid", gap:10}}>
        <label>Título</label>
        <input value={form.title} onChange={set("title")} placeholder="Ej. Armar repisa" required />

        <label>Descripción</label>
        <textarea rows={4} value={form.description} onChange={set("description")}
          placeholder="Detalles de lo que necesitas" required />

        <label>Ubicación (opcional)</label>
        <input value={form.location} onChange={set("location")} placeholder="Ciudad" />

        <label>Precio (opcional)</label>
        <input type="number" min="0" value={form.price} onChange={set("price")} placeholder="Ej. 300" />

        <button type="submit">Publicar</button>
        {msg && <div style={{marginTop:8}}>{msg}</div>}
      </form>
    </div>
  );
}