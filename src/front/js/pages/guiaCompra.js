import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";


export const GuiaCompra = () => {
    const { store, actions } = useContext(Context);

    return (
        <div>
            <div className="container-fluid">


                <div className="text-center m-3 mb-5">
                    <h1>Guía de Compra</h1>
                </div>



                <div className="d-flex justify-content-between mb-5">
                    <div className="border border-warning bg-success text-light d-flex justify-content-center align-items-center" style={{ width: "200px", height: "200px", borderRadius: "50%" }}>
                        <h6 className="">1. Elige tu libro</h6>

                    </div>
                    <div className="border border-warning bg-success text-light d-flex justify-content-center align-items-center" style={{ width: "200px", height: "200px", borderRadius: "50%" }}>
                        <h6 className="">2. Verifica tu carrito</h6>
                    </div>
                    <div className="border border-warning bg-success text-light d-flex justify-content-center align-items-center" style={{ width: "200px", height: "200px", borderRadius: "50%" }}>
                        <h6 className="">3. Elige dirección</h6>
                    </div>
                    <div className="border border-warning bg-success text-light d-flex justify-content-center align-items-center" style={{ width: "200px", height: "200px", borderRadius: "50%" }}>
                        <h6 className="">4. Método de pago</h6>
                    </div>
                    <div className="border border-warning bg-success text-light d-flex justify-content-center align-items-center" style={{ width: "200px", height: "200px", borderRadius: "50%" }}>
                        <h6 className="">5. Paga</h6>
                    </div>
                </div>
                <div className="mx-5 mb-5 pt-5">
                    <h3 className="m-3 mb-4"><strong>Sigue estos pasos para realizar la compra de tus libros:</strong></h3>
                    <h6>1.- Busca los libros que quieras comprar y agregalos a tu carrito.</h6>
                    <h6>2.- Verifica en el carrito el total de los libros que quieres comprar.</h6>
                    <h6>3.- Selecciona tu dirección para el envío de tus libros.</h6>
                    <h6>4.- Elige el método de pago</h6>
                    <h6>5.- Agrega los datos que se solciitan y realiza el pago.</h6>
                </div>

            </div>
        </div>
    );
};