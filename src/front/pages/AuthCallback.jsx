import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const BASE = import.meta.env.VITE_BACKEND_URL;

export default function AuthCallback(){
  const nav = useNavigate();

  useEffect(() => {
    const url = new URL(window.location.href);
    const token = url.searchParams.get("token");
    if(!token){
      nav("/login?error=missing_token", { replace: true });
      return;
    }
    // Guarda token y opcionalmente trae perfil real
    localStorage.setItem("tasky_token", token);

    // Si quieres traer perfil:
    fetch(`${BASE}/api/me`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(r=>r.json())
      .then(resp => {
        // puedes guardar en tu store global si quieres
        // p. ej. localStorage.setItem("tasky_user", JSON.stringify(resp.user));
      })
      .finally(()=> nav("/", { replace:true }));

  }, [nav]);

  return <div style={{padding:"2rem", textAlign:"center"}}>Validando…</div>
}