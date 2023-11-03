import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

export const ComoDonar = () => {
    const { store, actions } = useContext(Context);

    return (
        <div className="container-fluid">
            <div className="d-flex justify-content-center m-5 mb-5">
                <img className="rounded"
                    src="https://www.estandarte.com/st/img/fot/webp/fot_2762_gr.webp"
                    alt="..."
                    style={{ width: "px", height: "400px" }} />
            </div>
            <div className="m-5 pt-5">
                <div className="mb-4">
                    <h3 className="m-3 "><strong>Paso I: Elegir los Libros para Donar</strong></h3>
                    <h6>1.- Navegue por su casa en busca de libros que desee donar.</h6>
                    <h6>2.- Ingrese a su cuenta en nuestra página web (si no tiene una, regístrese).</h6>
                </div>
                <div className="mb-4">
                    <h3 className="m-3"><strong>Paso II: Ponerse en Contacto con Nosotros</strong></h3>
                    <h6>1.- Después de seleccionar los libros que desea donar, diríjase a la sección de Donaciones realizadas" en nuestro sitio web y haga click en el boton "Realizar donaciones".</h6>
                    <h6>2.- Complete el formulario de contacto proporcionando la información solicitada</h6>
                </div>
                <div className="mb-4">
                    <h3 className="m-3"><strong>Paso III: Realizar el Envío a Nuestra Bodega de Libros</strong></h3>
                    <h6>1.- Si su donación es aceptada, recibirá instrucciones detalladas sobre cómo empacar y enviar los libros a nuestra bodega de libros. Esto incluirá la dirección de envío y cualquier otra información importante.</h6>
                    <h6>2.- Empaque cuidadosamente los libros de acuerdo con nuestras instrucciones y envíelos a la dirección proporcionada. Puede utilizar el servicio de mensajería de su elección, como correos o mensajería local.</h6>
                    <h6>Asegúrese de proporcionar la información de seguimiento si está disponible para que podamos rastrear la entrega.</h6>
                </div>
                <div className="mb-4">
                    <h3 className="m-3"><strong>Paso IV: Información sobre la Ubicación de Donación</strong></h3>
                    <h6>1.- Una vez que hayamos recibido y procesado sus libros donados en nuestra bodega, le informaremos por correo electrónico.</h6>
                    <h6>2.- En nuestra página web, publicaremos información sobre la ubicación y el uso de los libros donados, para que pueda ver cómo sus libros están haciendo una diferencia.</h6>
                </div>
                <div className="d-flex text-center pt-5 mt-5 mb-5 pb-5 border shadow-sm rounded">
                    <h2><strong>¡Gracias por considerar donar libros a nuestra página web! Sus donaciones ayudarán a fomentar la lectura y el acceso a la literatura para otros usuarios de nuestra comunidad.</strong></h2>
                </div>
            </div>
        </div>
    );
};