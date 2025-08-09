import { useEffect, useState } from "react";
import { supabase } from "../../api/supabaseClient.js";
import { useNavigate } from "react-router-dom";

export function User() {
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Obtener usuario actual
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      if (user) fetchUserEvents(user.id_usuario || user.id);
      setLoading(false);
    };
    getUser();
  }, []);

  // Obtener eventos creados por el usuario
  const fetchUserEvents = async (userId) => {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("id_usuario", userId)
      .order("date", { ascending: false });
    if (!error) setEvents(data);
  };

  if (loading) return <div>Cargando...</div>;
  if (!user) return <div>No has iniciado sesión.</div>;

  return (
    <div className="max-w-3xl mx-auto mt-8 p-6 bg-white rounded shadow">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold mb-2">Perfil de usuario</h2>
        <p className="text-gray-700">{user.nickname || user.email}</p>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-4">Tus eventos</h3>
        {events.length === 0 ? (
          <p>No has creado ningún evento aún.</p>
        ) : (
          <ul className="space-y-3">
            {events.map(event => (
              <li
                key={event.id}
                className="p-4 border rounded hover:bg-gray-50 cursor-pointer"
                onClick={() => navigate(`/evento/${event.id}`)}
              >
                <div className="font-bold">{event.titulo}</div>
                <div className="text-gray-500 text-sm">{event.date} {event.time}</div>
                <div className="text-gray-600">{event.descripcion}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}