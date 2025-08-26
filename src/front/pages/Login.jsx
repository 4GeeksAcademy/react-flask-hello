import { useState } from "react";
const BASE = import.meta.env.VITE_BACKEND_URL;

export default function Login(){
  const [email,setEmail]=useState(""); 
  const [password,setPassword]=useState("");

  const googleLogin = () => {
    window.location.href = `${BASE}/api/auth/google/login`;
  };
  const facebookLogin = () => {
    window.location.href = `${BASE}/api/auth/facebook/login`;
  };

  const submit = (e) => {
    e.preventDefault();
    // tu login "tradicional" si lo tienes; por ahora omitimos
  };

  return (
    <form onSubmit={submit} className="card p-3" style={{maxWidth:480, margin:"2rem auto"}}>
      <h2>Iniciar sesión</h2>
      <input placeholder="Email" type="email" value={email} onChange={e=>setEmail(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />

      {/* reCAPTCHA va aquí si lo usas en login tradicional */}

      <button type="submit">Entrar</button>

      <hr />
      <button type="button" onClick={googleLogin} style={{marginTop:8}}>Continuar con Google</button>
      <button type="button" onClick={facebookLogin} style={{marginTop:8}}>Continuar con Facebook</button>
    </form>
  );
}