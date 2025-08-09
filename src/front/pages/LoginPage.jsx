import React, { useEffect, useState } from 'react';
import { supabase } from '../../api/supabaseClient.js';
import { FaGoogle, FaGithub } from 'react-icons/fa6';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export const LoginPage = () => {
  const navigate = useNavigate();
  const [datosLogin, setDatosLogin] = useState({
    email: "",
    password: ""
  })
  // Redireccion automatica si ya hay sesion iniciada a vistahome
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) navigate('/vistahome');
    });
    // cambios de sesion (por si el login es externo)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) navigate('/vistahome');
    });
    return () => subscription.unsubscribe();
  }, [navigate]);

    const handleOAuthLogin = async (provider) => {
      const { error } = await supabase.auth.signInWithOAuth({ provider });
      if (error) console.error('OAuth login error:', error.message);
    };
    const handleChange = (e) => {
      setDatosLogin({
        ...datosLogin,
        [e.target.name]: e.target.value
      });
    };
  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = datosLogin;
    if (!email || !password) {
      alert("Por favor ingresa tu correo y contraseña");
      return;
    }
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    try {
      const res = await fetch("********URL****", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      });
      const result = await res.json();

    if (!res.ok) {
      alert(result.error || "Error en el backend");
      return;
    }
      localStorage.setItem("token", result.token);
      navigate("/vistahome");
  } catch (err) {
      console.error("Error", err);
      alert("No se pudo conectar con el servidor");
  }
};

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/fondo_login.jpg')" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-8 w-full max-w-md text-white text-center"
      >
        <h2 className="text-3xl font-bold mb-6">
          BIENVENIDO A <span className="text-yellow-300">KNECT</span>
        </h2>

        <form onSubmit={handleLogin}>
          <div>
            <input
              type="email"
              name="email"
              value={datosLogin.email}
              onChange={handleChange}
            />
          </div>
          <br />

          <div>
            <input
              type="password"
              name="password"
              value={datosLogin.password}
              onChange={handleChange}
            />

          </div>
          <div>
            <br />
            <button  
              type="submit"
              className="bg-yellow-300 text-black">
              Entrar
          
          </button>
        </div>
        </form>



        <div className="flex justify-center gap-6">
          <button
            onClick={() => handleOAuthLogin('google')}
            className="bg-white/20 p-4 rounded-full hover:bg-white/30 transition text-xl"
            aria-label="Google"
          >
            <FaGoogle />
          </button>
          <button
            onClick={() => handleOAuthLogin('github')}
            className="bg-white/20 p-4 rounded-full hover:bg-white/30 transition text-xl"
            aria-label="GitHub"
          >
            <FaGithub />
          </button>
        </div>

        <p className="text-center text-sm text-white/70 mt-8">
          ¿No tienes cuenta?{' '}
          <a href="/registrousuario" className="text-white underline hover:text-blue-300">
            Regístrate
          </a>
        </p>
      </motion.div>
    </div>
  );
};
