
import React, { useEffect, useState } from 'react';
import { supabase } from '../../api/supabaseClient.js';

export const Login = () => {
  const [user, setUser] = useState(null);

  //Este useEffect hace la carga del usuario

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    // Cambios de sesión
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

// Función para iniciar sesión con Google
  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
    if (error) console.error('Error al iniciar sesión con Google:', error.message);
  };

  // Función para cerrar sesión
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <div className="text-center mt-4">
      {user ? (
        <>
          <p className="mb-2">Hola, {user.email}</p>
          <button className="btn btn-outline-danger" onClick={handleLogout}>Cerrar sesión</button>
        </>
      ) : (
        <button className="btn btn-outline-dark" onClick={handleGoogleLogin}>
          Iniciar sesión con Google
        </button>
      )}
    </div>
  );
};


