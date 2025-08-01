import React, { useEffect, useState } from 'react';
import { supabase } from '../../api/supabaseClient.js';

export const Login = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null);
      setIsLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  // Login de Google
  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
    if (error) console.error('Error al iniciar sesión con Google:', error.message);
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
  };

  if (isLoading) return <p>Cargando...</p>; // condicion para mostrar un mensaje de carga

  return (
    <div className="text-center mt-4">
      {user ? (
        <>
          <p className="mb-2">Hola, {user.email}</p>
          <button className="btn btn-outline-danger" onClick={handleLogout}> Cerrar sesión
          </button>
        </>
      ) : (
        <div className="flex flex-col gap-3 items-center">
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={handleGoogleLogin}> Iniciar sesión con Google
          </button>
          <button
            className="text-white bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:ring-gray-500 font-medium rounded-lg text-sm px-5 py-2.5"
            onClick={handleGitHubLogin}> Iniciar sesión con GitHub
          </button>
        </div>
      )}
    </div>
  );
};
