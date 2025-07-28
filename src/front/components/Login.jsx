
import React, { useEffect, useState } from 'react';
import { supabase } from '../../api/supabaseClient.js';

export const Login = () => {
  const [user, setUser] = useState(null);

  //Este useEffect hace la carga del usuario

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    // Escucha los cambios de stado de autenticación
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
        <button className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={handleGoogleLogin}>
          Iniciar sesión con Google
        </button>
      )}
    </div>
  );
};


