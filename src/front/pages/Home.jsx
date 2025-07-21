import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { supabase } from '../../api/supabaseClient.js';
import { useEffect, useState } from 'react';

export const Home = () => {
    const { store, dispatch } = useGlobalReducer();
    const [user, setUser] = useState(null);

    const loadMessage = async () => {
        try {
            const backendUrl = import.meta.env.VITE_BACKEND_URL;

            if (!backendUrl) throw new Error("VITE_BACKEND_URL is not defined in .env file");

            const response = await fetch(backendUrl + "/api/hello");
            const data = await response.json();

            if (response.ok) dispatch({ type: "set_hello", payload: data.message });

            return data;
        } catch (error) {
            if (error.message) throw new Error(
                `Could not fetch the message from the backend.
                Please check if the backend is running and the backend port is public.`
            );
        }
    };

    useEffect(() => { // El use effect que setea el mensaje del backend y el usuario de supabase
        loadMessage();

        supabase.auth.getUser().then(({ data: { user } }) => {
            setUser(user);
        });

        const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
            setUser(session?.user || null);
        });

        return () => {
            listener?.subscription.unsubscribe();
        };
    }, []);

    const handleLogin = async () => { // Funcion para iniciar sesión con Google y redirigir a la pagina principal 
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectto: `${window.location.origin}/`,
                queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          }
            }
        });
        if (error) console.error('Error al iniciar sesión:', error.message);
    };

    const handleLogout = async () => { // Funcion para cerrar sesión y limpiar el usuario
        await supabase.auth.signOut();
        setUser(null);
    };

    return (
        <div className="text-center mt-5">
            <h1 className="display-4">Hello Rigo!!</h1>
            <p className="lead">
                <img src={rigoImageUrl} className="img-fluid rounded-circle mb-3" alt="Rigo Baby" />
            </p>
            <div className="alert alert-info">
                {store.message ? (
                    <span>{store.message}</span>
                ) : (
                    <span className="text-danger">
                        Loading message from the backend (make sure your python 🐍 backend is running)...
                    </span>
                )}
            </div>
            {user ? (
                <button className="btn btn-danger mt-3" onClick={handleLogout}>
                    Cerrar sesión
                </button>
            ) : (
                <button className="btn btn-primary mt-3" onClick={handleLogin}>
                    Iniciar sesión con Google
                </button>
				  )}
        </div>
    );
};