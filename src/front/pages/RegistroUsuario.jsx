import React, { useEffect, useState } from 'react';
import { supabase } from '../../api/supabaseClient.js';
import { FaGoogle, FaGithub } from 'react-icons/fa6';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { AjustesUsuario } from './AjustesUsuario.jsx';

export const RegistroUsuario = () => {
  const navigate = useNavigate();
  const [datosRegistro, setDatosRegistro] = useState({
    email: "", 
    password:""
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
  const handleChange =(e) => {
    setDatosRegistro({
        ...datosRegistro,
        [e.target.name]:e.target.value
    });
  };
  const handleRegister = async (e) => {
    e.preventDefault();
        const respuesta = await fetch ("********URL****", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(datosRegistro)
        });
        const data = await respuesta.json();
        if (respuesta.ok){
            window.alert("usuario registrado exitosamente");
            navigate("/ajustesusuario");
            
        }else {
            alert(data.error || "Error al registrar, revisa tu email")
        }
    }
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
          REGISTRO EN <span className="text-yellow-300">KNECT</span>
        </h2>
        
          <form onSubmit={handleRegister}>
            <div>
              <input 
                type="email"
                name="email"
                value={datosRegistro.email}
                onChange={handleChange}
             />
            </div>
              <br />

            <div>
             <input 
                type="password"
                name="password"
                value={datosRegistro.password}
                onChange={handleChange}
             />

              </div>
              <div>
                <br />
                <button
                  type="submit"
                  className="bg-yellow-300 text-black">
                    confirmar registro
                </button>
              </div>

             </form>


      </motion.div>
    </div>
  );
};
