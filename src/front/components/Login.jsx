import React, { useEffect, useState } from "react";
import { supabase } from "../../api/supabaseClient.js";
import { useNavigate } from 'react-router-dom';
import useGlobalReducer from "../hooks/useGlobalReducer";


export const Login = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { dispatch } = useGlobalReducer();
  const { navigate } = useNavigate();


  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data: { session } }) => {

      if (!mounted) return;
      setUser(session?.user || null);
      setIsLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;
      setUser(session?.user || null);
    });


    return () => {
      mounted = false;
      listener?.subscription?.unsubscribe?.();
    };
  }, []);

  
  // Login de Google
  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
    if (error){
     console.error('Error al iniciar sesión con Google:', error.message);
    }else{
  };

  // Login de GitHub
  const handleGitHubLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({ provider: 'github' });
    if (error) console.error('Error al iniciar sesión con GitHub:', error.message);
  };

  // Logica del logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    dispatch({type: "set_user", payload: currentUser})
  };

  if (isLoading) return <p>Cargando...</p>; // condicion para mostrar un mensaje de carga


  return (
    <div style={{ textAlign: "center", marginTop: "12px" }}>
      {user ? (
        <>
          <p style={{ marginBottom: 8 }}>Hola, {user.email}</p>
          <button className="btn" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </>
      ) : (
        <button
  className="btn"
  onClick={handleGoogleLogin}
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 533.5 544.3"
    style={{ marginRight: "8px", verticalAlign: "middle" }}
  >
    <path fill="#EA4335" d="M533.5 278.4c0-18.6-1.7-37-5.1-54.8H272v103.8h146.9c-6.3 34.2-25.2 63.2-53.7 82.6v68h86.7c50.7-46.7 81.6-115.4 81.6-199.6z"/>
    <path fill="#34A853" d="M272 544.3c72.7 0 133.8-24.1 178.4-65.2l-86.7-68c-24.1 16.2-55 25.7-91.7 25.7-70.5 0-130.3-47.6-151.7-111.6H31.5v70.2C75.6 485.5 167.5 544.3 272 544.3z"/>
    <path fill="#4A90E2" d="M120.3 324.9c-10.2-30.6-10.2-63.6 0-94.1V160.6H31.5c-42.3 84.7-42.3 185.2 0 269.8l88.8-70.2z"/>
    <path fill="#FBBC05" d="M272 107.7c39.5-.6 77.5 14 106.5 41.1l79.6-79.6C405.5 25.3 342.9.1 272 0 167.5 0 75.6 58.8 31.5 160.6l88.8 70.2C141.7 155.8 201.5 108.2 272 107.7z"/>
  </svg>
  Iniciar sesión con Google
</button>


      )}
    </div>
  );
}
};
