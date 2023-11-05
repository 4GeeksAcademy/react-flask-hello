import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom'

import { Context } from "../store/appContext";


export const BookDetails = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const { id } = useParams();
    const currentDate = new Date();
    const realTime = { timeZone: 'America/santiago' };
    const formattedDate = currentDate.toLocaleString('en-US', realTime);




    useEffect(() => {
        actions.getOneBook(id)
    }, [id]);

    return (
        <div>
            <div className="container-fluid d-flex">
                <div className="card shadow-sm m-3" style={{ width: "300px", height: "100%" }}>
                    <img src={store.oneBook?.photo} className="card-img-top" alt="Hollywood Sign on The Hill" style={{ width: "100%", height: "400px" }} />
                </div>
                <div className="m-3 mt-5 mb-5">
                    <h1>{store.oneBook?.title}</h1>
                    <hr className="dropdown-divider" />
                    <br></br>
                    <div className="d-flex  "   >
                        <div className="p-0 " >
                            <p className="text-dark mb-3">Autor</p>
                            <p className="text-dark mb-3">Descripción</p>
                            <p className="text-dark mb-3">Categoria</p>
                            <p className="text-dark mb-3">Páginas</p>
                            <p className="text-dark mb-3">Precio</p>
                            <p className="text-dark mb-3">Vendedor</p>
                        </div>
                        <div className=" ms-3 " >
                            <p className="text-dark mb-3">:{store.oneBook?.author}</p>
                            <p className="text-dark mb-3">:{store.oneBook?.description}</p>
                            <p className="text-dark mb-3">:{store.oneBook?.cathegory}</p>
                            <p className="text-dark mb-3">:{store.oneBook?.number_of_pages}</p>
                            <p className="text-dark mb-3">:{store.oneBook?.price}</p>
                            <p className="text-dark mb-3">:{store.oneBook?.user_name}</p>
                        </div>
                    </div>
                    <div className="mt-4">
                        <button type="button" className="btn btn-success" onClick={() => {
                            /* actions.putAvailableBook(store.oneBook?.id, navigate); */
                            /* actions.inputMessage1(store.currentUser?.user?.id, store.oneBook?.user_id, store.oneBook?.id, "Hola quisiera comprar tu libro"); */
                            actions.inputShopping(store.oneBook?.user_id, store.currentUser?.user?.id, store.oneBook?.id, formattedDate);
                            actions.getLibros();
                            actions.getExchangeBooks();
                            actions.getSaleBooks();
                        }}>Confirmar</button>


                    </div>
                </div>
            </div>
        </div>
    );
};