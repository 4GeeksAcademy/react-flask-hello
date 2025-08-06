import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { supabase } from '../../api/supabaseClient.js';
import { useEffect, useState } from 'react';
import { Navigate } from "react-router-dom";
import { VistaHome } from "./VistaHome.jsx";

export const Home = () => {
    const { store, dispatch } = useGlobalReducer();

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                dispatch({ type: "set_user", payload: user });
            }
        }
        getUser();
    }, []);

    if (!store.user) {
        return <Navigate to="/loginpage" />;
    }
    return (
        <div>
            <VistaHome />
        </div>
    );
};