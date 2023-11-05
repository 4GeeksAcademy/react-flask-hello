import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";


export const Profile = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.getMySaleBooks(store.currentUser?.user?.id);
        actions.getMyExchangeBooks(store.currentUser?.user?.id);
        actions.getAllMyPurchasedBooks(store.currentUser?.user?.id);
        actions.getAllMySoldBooks(store.currentUser?.user?.id);



    }, [store.currentUser?.user?.id]);

    return (
        <div className="container-fluid">
            <div className="m-5 row align-items-center">
                <div className="col-4 border">
                    <div className="d-flex justify-content-center border">
                        <div className="card shadow-sm" style={{ width: "220px", height: "300" }} >
                            <div className="d-flex justify-content-center">
                                <img className="card-img-top" style={{ maxWidth: "100%", maxHeight: "300px" }} src={store.currentUser?.user?.userImage} alt="{`Portada de ${libro.title}`}" />
                            </div>
                            <div className="card-body">
                                <h6 className="card-title">{store.currentUser?.user?.name} {store.currentUser?.user?.lastname} </h6>
                                <h6 className="card-text">{store.currentUser?.user?.email}</h6>
                                <h6 className="card-text">Región de {store.currentUser?.user?.region}</h6>
                            </div>
                            <div className="d-flex justify-content-between align-items-center m-1">
                            </div>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center border">
                        <button className="btn btn-dark w-50">Editar tu Perfil</button>
                    </div>
                </div>
                <div className="col-8 border">
                    <div className="row mb-5 pb-5">
                        <h1>¡Bienvenido {store.currentUser?.user?.name}! </h1>
                    </div>
                    <div className="row border justify-content-center mb-3 mt-5">
                        <div className="col d-flex justify-content-center border">
                            <Link to="/mySaleBooks" className="btn btn-dark w-75">
                                Mis Libros en venta
                            </Link>
                        </div>
                        <div className="col d-flex justify-content-center border">
                            <Link to="/myExchangeBooks" className="btn btn-dark w-75">
                                Mis Libros en Intercambio
                            </Link>
                        </div>
                    </div>
                    <div className="row border mb-3">
                        <div className="col d-flex justify-content-center border">
                            <Link to="/purchasedBooks" className="btn btn-dark w-75">
                                Mis Compras
                            </Link>
                        </div>
                        <div className="col d-flex justify-content-center border">
                            <Link to="/soldBooks" className="btn btn-dark w-75">
                                Mis Ventas
                            </Link>

                        </div>
                    </div>
                    <div className="row border mb-3">
                        <div className="col d-flex justify-content-center border">
                            <Link to="/registerBook" className="btn btn-dark w-75">
                                Publicar Libros
                            </Link>
                        </div>
                        <div className="col d-flex justify-content-center border">
                            <button className="btn btn-dark w-75">Editar Libros</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};