
// Registro: guarda datos en el estado local y simula registro.
// Tras registrar, redirige a /login con ?registered=1 para mostrar aviso.

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthShell from "../components/AuthShell";
import TextInput from "../components/TextInput";
import {register} from "../jsApiComponents/auth"

export function Register() {

  const nav = useNavigate();
  const [form, setForm] = useState({
    nombre: "",
    apellidos: "",
    email: "",
    password: "",
    telefono: "",
    edad: "",
    genero: "", // male | female | other
  });
  const [err, setErr] = useState("");

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    setErr("");

    if (!form.nombre || !form.email || !form.password)
      return setErr("Completa nombre, email y contraseña.");

    if (form.password.length < 8)
      return setErr("La contraseña debe tener al menos 8 caracteres.");

    if (form.edad && (+form.edad < 18 || +form.edad > 100))
      return setErr("Debes ser mayor de edad (18–100).");

    if (form.genero === "")
      return setErr("Selecciona un género.");

    console.log("Register (solo UI):", form);
    let body = form
    const new_user = register(body)
    nav("/login?registered=1");
  };

  return (
    <AuthShell title="Regístrate" subtitle="Completa el formulario para crear tu cuenta">
      <form onSubmit={submit} noValidate>
        <TextInput name="nombre" value={form.nombre} onChange={onChange} placeholder="Nombre" />
        <TextInput name="apellidos" value={form.apellidos} onChange={onChange} placeholder="Apellidos" required={false} />

        <TextInput name="email" value={form.email} onChange={onChange} placeholder="email@example.com" type="email" />
        <TextInput name="password" value={form.password} onChange={onChange} placeholder="********" withToggle />
        <div className="small-note">La contraseña debe tener 8 o más caracteres.</div>

        <TextInput name="telefono" value={form.telefono} onChange={onChange} placeholder="+34 600 123 123" required={false} />
        <TextInput name="edad" value={form.edad} onChange={onChange} placeholder="Edad" type="number" required={false} />

        <div className="mb-3">
          <select
            className="form-select select-dark"
            name="genero"
            value={form.genero}
            onChange={onChange}
            required
          >
            <option value="" disabled>Selecciona tu género</option>
            <option value="male">Hombre</option>
            <option value="female">Mujer</option>
            <option value="other">Otro / Prefiero no decir</option>
          </select>
        </div>

        {err && <div className="alert alert-danger py-2 mt-2">{err}</div>}

        <button className="btn btn-accent w-100 mt-2">Crear cuenta</button>
      </form>

      <div className="text-center mt-3">
        <span className="link-muted">¿Ya tienes cuenta? </span>
        <Link to="/login" className="link-accent">Inicia sesión</Link>
      </div>
    </AuthShell>
  );
}
