import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom'

import { Context } from "../store/appContext";



const PurchasedBooks = () => {

    const { store, actions } = useContext(Context)
    const navigate = useNavigate()
    
    
    useEffect(() => {
        actions.getAllMensajesUser(store.currentUser?.user?.id);
        actions.allBookIdBuyUser(); 
    }, []);

    return (
        <div className="container my-3 p-0 ">
            <h1>Compras de: {store.currentUser?.user?.name} {store.currentUser?.user?.lastname} </h1>
            <h1>Id: {store.currentUser?.user?.id}</h1>
            <button onClick={(e)=>{actions.allBookIdBuyUser}}>boton 1</button>
            <button onClick={(e)=>{actions.getMensajesLibro(store.allMessagesUser[0]?.book_id)}}>boton 2</button>
            <div className="card shadow-sm  m-3" style={{ width: "220px", height: "300" }} >
                <div className="d-flex justify-content-center">
                    <img className="card-img-top" style={{ maxWidth: "100%", maxHeight: "300px" }} src="" alt={`Portada de `} />
                </div>
                <div className="card-body">
                    <h6 className="card-title">Titulo: {store.allMessagesUser[0]?.book?.title} </h6>
                    <p className="card-text">Id libro: {store.allMessagesUser[0]?.book_id} </p>
                    <p className="card-text">Mensaje1 por id de libro: {store.buyChat[0]?.message_text}</p>
                    <p className="card-text">Mensaje2 por id de libro: {store.buyChat[1]?.message_text}</p>
                </div>
                <div className="d-flex justify-content-between align-items-center m-1">
                    <Link to={`/purchasedBooks`} className="btn btn-dark">Ver detalles</Link>
                    <i className="fa-regular fa-heart fa-2x" onClick={(e)=>{actions.allBookIdBuyUser}}></i>
                </div>
            </div>
        </div>
    );

};
export default PurchasedBooks