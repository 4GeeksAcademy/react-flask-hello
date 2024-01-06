import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Demo = () => {
    const { store, actions } = useContext(Context);
    useEffect(() => {
        actions.getMovieListFromApi();
    }, []);

    const handleGetMovieApi = () => {
        actions.getMovieListFromApi();
    };

    return (
        <div className="container">
            <ul className="list-group">
            {store.movies_from_api.map((movie, index) => (
                    <li key={index} className="list-group-item">
                        <h2>{movie.name}</h2>
                        <p>{movie.description}</p>
                        <img src={movie.poster} alt={movie.name} />
                        <p>Fecha de lanzamiento: {movie.relese_date}</p>
                    </li>
                ))} 
            </ul>
            <br />
            <Link to="/">
                <button className="btn btn-primary">Back home</button>
            </Link>
            <button onClick={()=>handleGetMovieApi()}>Click me</button>
        </div>
    );
};