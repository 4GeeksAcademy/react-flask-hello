import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { ItemCard } from "../components/ItemCard/ItemCard";
import { Spinner } from "../components/Spinner/Spinner";


export const Category = () => {

    const { store, dispatch } = useGlobalReducer();
    const { clases } = useParams();
    const [loading, setloading] = useState(true)


    useEffect(() => {
        const fetchItems = async () => {
            setloading(true);
            try {

                const token = store.token;

                if (!token) {
                    throw new Error("No authentication token found");
                }

                const response = await fetch(`${store.backend_URL}/api/${clases}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch items");
                }
                const data = await response.json();
                console.log("API Data:", data);
                dispatch({ type: "set_items", payload: data || [] });
                setloading(false);
            } catch (error) {
                console.error("Error fetching items:", error);
                setloading(false);
            }
        };

        fetchItems();
    }, [clases, dispatch, store.token]);


    useEffect(() => {

        dispatch({ type: "set_selected_category", payload: clases });
    }, [clases, dispatch]);

    if (loading) {
        return (
            <Spinner />
        )
    }


    return (
        <ItemCard />
    );
};