// src/front/src/pages/Forgot.jsx
// Forgot: pide email y muestra confirmación (solo UI).

import { useState } from "react";
import AuthShell from "../components/AuthShell";
import TextInput from "../components/TextInput";

export function Forgot() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState("");

  const submit = (e) => {
    e.preventDefault();
    setErr("");
    if (!email) return setErr("Introduce tu email.");
    console.log("Forgot (solo UI):", email);
    setSent(true);
  };

  return (
    <AuthShell title="¿Has olvidado tu contraseña?" subtitle="Introduce tu email para enviarte instrucciones">
      {!sent ? (
        <form onSubmit={submit}>
          <TextInput name="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="email@example.com" />
          {err && <div className="alert alert-danger py-2">{err}</div>}
          <button className="btn btn-accent w-100">Enviar instrucciones</button>
        </form>
      ) : (
        <div className="alert alert-success" role="alert">
          Revisa tu correo — te hemos enviado instrucciones de recuperación.
        </div>
      )}
    </AuthShell>
  );
}
