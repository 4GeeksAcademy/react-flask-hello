import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { supabase } from '../../api/supabaseClient.js';
import { useEffect, useState } from 'react';
import { Login } from "../components/Login.jsx";
import { VistaHome } from "../components/VistaHome.jsx";

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

    return (
        <div>
            <VistaHome></VistaHome>
        </div>
    );
};