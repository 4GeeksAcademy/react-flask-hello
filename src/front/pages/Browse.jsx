// src/front/pages/Browse.jsx
import { useEffect, useState } from "react";
import { listTasks } from "../api/tasks";


export default function Browse() {
  const [items, setItems] = useState([]);
  const [err, setErr] = useState("");

  useEffect(() => {
    let live = true;
    listTasks()
      .then((data) => live && setItems(data))
      .catch((e) => live && setErr(e.message || "Error"));
    return () => { live = false; };
  }, []);

  return (
    <div className="container" style={{maxWidth: 980, margin:"2rem auto"}}>
      <h2>Browse tasks</h2>
      {err && <div style={{color:"#b91c1c"}}>Error: {err}</div>}
      {!items.length && !err && <div>No tasks yet.</div>}

      <div style={{display:"grid", gap:12}}>
        {items.map(t => (
          <div key={t.id} className="card" style={{padding:16}}>
            <div style={{display:"flex", justifyContent:"space-between"}}>
              <h3 style={{margin:0}}>{t.title}</h3>
              {typeof t.price !== "undefined" && <b>${t.price}</b>}
            </div>
            {!!t.description && <p style={{margin:"6px 0 0"}}>{t.description}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}