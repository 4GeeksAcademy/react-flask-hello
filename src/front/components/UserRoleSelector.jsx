import React, { useEffect, useState } from 'react';
import { supabase } from '../../api/supabaseClient.js';

export const UserRoleSelector = () => {
  const [selectedRole, setSelectedRole] = useState('');
  const [userId, setUserId] = useState(null);

  // Obtengo el usuario actual al cargar el componente
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) {
        console.error('Error al obtener el usuario:', error.message);
      } else {
        setUserId(user.id);
      }
    };
    fetchUser();
  }, []);

  // Con esto obtengo el id del usuario para actualizar el rol que pondrán las personas
  const handleRoleChange = async (e) => {
    const newRole = e.target.value;
    setSelectedRole(newRole);

    if (!userId) {
      alert('Usuario no encontrado');
      return;
    }

    const { error } = await supabase
      .from('profiles') // En supabase debo poner que mi tabla se llama "profiles"
      .update({ role: newRole })
      .eq('id', userId);

    if (error) {
      console.error('Error al actualizar el rol:', error.message);
      alert('No se pudo actualizar el rol');
    } else {
      alert(`Rol actualizado a: ${newRole}`);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-sm mx-auto mt-10">
      <h2 className="text-lg font-bold mb-4 text-gray-800">Selecciona tu rol:</h2>
      <select
        value={selectedRole}
        onChange={handleRoleChange}
        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">-- Elige que rol serás --</option>
        <option value="usuario">Usuario</option>
        <option value="organizador">Organizador</option>
        <option value="admin">Admin</option>
      </select>
    </div>
  );
};
