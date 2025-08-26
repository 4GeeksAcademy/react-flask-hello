import { useEffect, useState } from "react";
import { useStore } from "../hooks/useGlobalReducer";

const ALL_SKILLS = ["Plumbing","Carpentry","Electricity","Painting","Cleaning"];

export default function Profile(){
  const { store, actions } = useStore();
  const user = store.user;
  const [form, setForm] = useState({ name:"", email:"", city:"", bio:"", skills:[], role:"client" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user) return;
    // con backend real, harías GET /api/me
    setForm({
      name: user.name ?? "",
      email: user.email ?? "",
      city: user.city ?? "",
      bio: user.bio ?? "",
      skills: user.skills ?? [],
      role: user.role ?? "client"
    });
  }, [user]);

  if(!user) return null;

  const toggleSkill = (s) => {
    setForm(f => f.skills.includes(s) ? {...f, skills:f.skills.filter(x=>x!==s)} : {...f, skills:[...f.skills, s]});
  };

  const save = async () => {
    setSaving(true);
    try {
      // con backend real: const updated = await apiUpdateMe(form);
      const updated = { ...user, ...form };
      actions.login(updated); // refresca store/localStorage
      alert("Perfil guardado ✅");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="card p-3" style={{maxWidth:720}}>
      <h2>Mi perfil</h2>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr", gap:16}}>
        <div>
          <label>Nombre</label>
          <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
        </div>
        <div>
          <label>Email</label>
          <input value={form.email} disabled />
        </div>
        <div>
          <label>Ciudad</label>
          <input value={form.city} onChange={e=>setForm({...form,city:e.target.value})}/>
        </div>
        <div>
          <label>Rol</label>
          <select value={form.role} onChange={e=>{ setForm({...form,role:e.target.value}); actions.updateRole(e.target.value); }}>
            <option value="client">Cliente</option>
            <option value="tasker">Proveedor</option>
          </select>
        </div>
        <div style={{gridColumn:"1 / span 2"}}>
          <label>Bio</label>
          <textarea rows={3} value={form.bio} onChange={e=>setForm({...form,bio:e.target.value})}/>
        </div>
      </div>

      {form.role==="tasker" && (
        <div style={{marginTop:12}}>
          <label>Skills</label>
          <div style={{display:"flex",flexWrap:"wrap", gap:8, marginTop:6}}>
            {ALL_SKILLS.map(s=>(
              <button type="button" key={s}
                onClick={()=>toggleSkill(s)}
                style={{
                  padding:"6px 10px", borderRadius:16, border:"1px solid #cbd5e1",
                  background: form.skills.includes(s) ? "#2563eb" : "#fff",
                  color: form.skills.includes(s) ? "#fff" : "#334155"
                }}>
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      <div style={{marginTop:16, display:"flex", gap:8}}>
        <button onClick={save} disabled={saving}>{saving ? "Guardando..." : "Guardar"}</button>
        <button type="button" onClick={actions.logout} style={{background:"#64748b"}}>Cerrar sesión</button>
      </div>
    </div>
  );
}