import React, { useState } from 'react';
import { supabase } from '../../api/supabaseClient.js';
import { FaGoogle, FaGithub, FaFacebookF, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6';
import { motion } from 'framer-motion';

export const GlassLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleOAuthLogin = async (provider) => {
    const { error } = await supabase.auth.signInWithOAuth({ provider });
    if (error) console.error('OAuth login error:', error.message);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert('Error al iniciar sesión: ' + error.message);
  };

  return (
<div className="min-h-screen bg-cover bg-center flex items-center justify-center bg-[url('/fondo_login.jpg')]">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-8 w-full max-w-md text-white"
      >
        <h2 className="text-3xl font-bold text-center mb-6">Bienvenido a Knect</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Correo electrónico"
            className="w-full px-4 py-2 rounded-md bg-white/20 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="w-full px-4 py-2 rounded-md bg-white/20 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-white text-black font-semibold py-2 rounded-md hover:bg-gray-200 transition"
          >
            Iniciar sesión
          </button>
        </form>

        <div className="my-6 text-center text-white/70">— o conéctate a través de —</div>

        <div className="flex justify-center gap-4 mb-4">
          <button
            onClick={() => handleOAuthLogin('google')}
            className="bg-white/20 p-3 rounded-full hover:bg-white/30 transition"
            aria-label="Google"
          >
            <FaGoogle />
          </button>
          <button
            onClick={() => handleOAuthLogin('github')}
            className="bg-white/20 p-3 rounded-full hover:bg-white/30 transition"
            aria-label="GitHub"
          >
            <FaGithub />
          </button>
          <button
            onClick={() => handleOAuthLogin('facebook')}
            className="bg-white/20 p-3 rounded-full hover:bg-white/30 transition"
            aria-label="Facebook"
          >
            <FaFacebookF />
          </button>
          <button
            onClick={() => handleOAuthLogin('linkedin')}
            className="bg-white/20 p-3 rounded-full hover:bg-white/30 transition"
            aria-label="LinkedIn"
          >
            <FaLinkedinIn />
          </button>
          <button
            onClick={() => handleOAuthLogin('twitter')}
            className="bg-white/20 p-3 rounded-full hover:bg-white/30 transition"
            aria-label="X"
          >
            <FaXTwitter />
          </button>
        </div>

        <p className="text-center text-sm text-white/70 mt-4">
          ¿No tienes cuenta?{' '}
          <a href="/register" className="text-white underline hover:text-blue-300">
            Regístrate
          </a>
        </p>
      </motion.div>
    </div>
  );
};
