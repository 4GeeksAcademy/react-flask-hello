import React from 'react';
import { Link } from 'react-router-dom';
import './ItemCard.css';
import useGlobalReducer from '../../hooks/useGlobalReducer';
import { useParams } from "react-router-dom";
import { useEffect } from 'react';

export const ItemCard = () => {

    const { store, dispatch } = useGlobalReducer();
    const { clases } = useParams();


    useEffect(() => {
        if (store.items && store.items.length > 0) {
            console.log("Items recibidos en ItemCard:", store.items);
        }
    }, [store.items]);


    const isInFavorites = (item) => {
        return store.favorites.some(
            fav => fav.name === item.name && fav.id === item.id && fav.category === clases
        );
    };


    const handleFav = (item) => {
        if (item) {
            const newFav = {
                name: item.name,
                category: clases,
                id: item.id
            };

            const exists = store.favorites.some(
                fav => fav.name === newFav.name && fav.id === newFav.id && fav.category === newFav.category
            );

            if (!exists) {
                dispatch({ type: "add_favorites", payload: newFav });
            }
        }
    };


    return (

        <ul className="list-unstyled d-flex flex-wrap gap-4 justify-content-center mt-5">

            {(store.items ?? []).map((item, index) => {
                const isFavorite = isInFavorites(item);

                return (
                    <li key={index} className="card text-white bg-transparent border-0">
                        <img src="https://i.etsystatic.com/16415580/r/il/666b48/1448818941/il_570xN.1448818941_qhdv.jpg" />
                        <div className="card-body d-flex flex-column align-items-center">
                            <h5 className="card-title text-center mb-3">
                                {clases === "users" ? item.username || item.name : item.name}
                            </h5>
                            <div>
                                {clases !== "users" && (
                                    <Link
                                        to={`/${clases}/${item.id || item.id}`}
                                        className="btn btn-light text-dark py-2 px-4 mt-auto"
                                    >
                                        See more...
                                    </Link>
                                )}
                                {clases !== "users" && (
                                    <button
                                        className={`btn btn-warning text-dark py-2 px-4 mt-auto ms-2 ${isFavorite ? "disabled-btn" : ""
                                            }`}
                                        onClick={() => handleFav(item)}
                                        disabled={isFavorite}
                                    >
                                        {isFavorite ? "Added" : "Favs"}
                                    </button>
                                )}
                            </div>
                        </div>
                    </li>
                );
            })}
        </ul>
    );
};