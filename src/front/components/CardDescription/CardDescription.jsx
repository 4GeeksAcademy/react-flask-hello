import React, { useEffect, useState } from 'react';
import './CardDescription.css';
import { useParams } from 'react-router-dom';
import useGlobalReducer from '../../hooks/useGlobalReducer';
import { Spinner } from '../Spinner/Spinner';

export const CardDescription = () => {

    const { store, dispatch } = useGlobalReducer();
    const { clases, id } = useParams();
    const [cargando, setCargando] = useState(true)


    useEffect(() => {

        const getItemDescription = async () => {

            try {

                const token = store.token;

                if (!token) {
                    throw new Error("No authentication token found");
                }

                const response = await fetch(`${store.backend_URL}/api/${clases}/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error("We can't get the ID")
                }

                const data = await response.json();
                console.log(data)

                dispatch({ type: "set_properties", payload: data })

                setCargando(false)

            } catch (error) {
                console.log(error)
            }
        }

        getItemDescription();
    }, [id, clases]);


    if (cargando) {

        return (
            <Spinner />
        );
    }


    const handleFav = () => {

        if (store.properties?.name) {

            const newFav = {

                name: store.properties.name,
                category: clases,
                id: id

            };


            const exists = store.favorites.some(
                fav => fav.name === newFav.name && fav.category === newFav.category
            );

            if (!exists) {

                dispatch({ type: "add_favorites", payload: newFav });

            }
        };
    };

    const isFavorite = store.favorites.some(fav => fav.name === store.properties?.name && fav.category === clases);

    return (
        <div className='card-container'>
            <div className="cardDescription text-white bg-transparent border-0">
                <div className="card-content">
                    <div className="image-container">
                        <img src="https://i.etsystatic.com/16415580/r/il/666b48/1448818941/il_570xN.1448818941_qhdv.jpg" />
                    </div>
                    <div className="text-container">
                        <h1 className="card-title mb-3">
                            {store.properties?.name || "Loading..."}
                        </h1>

                        <ul className="list-properties">
                            {store.properties
                                ? Object.entries(store.properties).map(([key, value], index) => {

                                    return  (
                                        <li key={index} className="mb-2">
                                            <strong>{key}:</strong> {value}
                                        </li>
                                    )
                                })
                                : <li>Loading...</li>}
                        </ul>
                        <button
                            className="btn btn-warning text-dark py-2 px-4 mt-auto ms-2"
                            onClick={handleFav}
                            disabled={isFavorite}
                        >
                            {isFavorite ? "Added" : "Add to Favorites"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};