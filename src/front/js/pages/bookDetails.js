import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom'

import { Context } from "../store/appContext";


export const BookDetails = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const { id } = useParams();



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
                        <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            Comprar
                        </button>
                        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header bg-black text-white">
                                        <h1 className="modal-title fs-5" id="exampleModalLabel">Confirmación de Compra</h1>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                    <p>"Estas comprando <strong>"{store.oneBook?.title}"</strong>, por <strong>"{store.oneBook?.price}"</strong>"</p>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-dark" data-bs-dismiss="modal">Volver</button>
                                        <button type="button" className="btn btn-success" onClick={(e)=>{actions.putAvailableBook(store.oneBook?.id, navigate)}}>Confirmar</button>
                                    </div>
                                </div>
                            </div>
                        </div>                        
                        <div className="btn btn-dark mx-3" onClick={(e)=>{actions.inputMessage1(store.currentUser?.user?.id, store.oneBook?.user_id, store.oneBook?.id, "Quiero comprar tu libro")}}>comprar prueba</div>
                    </div>
                </div>
            </div>
        </div>
    );
};