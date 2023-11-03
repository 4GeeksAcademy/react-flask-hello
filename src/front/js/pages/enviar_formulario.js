import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom'

import { Context } from "../store/appContext";



const Enviar_formulario = () => {

    const { store, actions } = useContext(Context)
    const navigate = useNavigate()
    const { id } = useParams();


    const [lastSenderId, setLastSenderId] = useState(null);
    const submitMessage = (e) => {
        e.preventDefault();
        actions.postMensaje();

        // Luego, actualizar los mensajes
        // Puedes agregar el nuevo mensaje a 'messages' y ajustar 'lastSenderId' según corresponda
    };
    useEffect(() => {
        actions.getMensajesUsuario


    }, []);

    return (
        <div className="container my-3 p-0 d-flex">
            <div className="me-3">
                <h3>Nombre remitente: {store.currentUser?.user?.name} {store.currentUser?.user?.lastname} </h3>
            </div>
            <div className="me-3 form-control shadow">
                <div className="form-control d-flex flex-column">
                    {/* MUESTRO TODOS LOS MENSAJES DEL LIBRO */}
                    {store.buyChat?.map((mensaje, index) => (
                        <p key={index} className="align-self-start text-primary">
                            {mensaje.message_text}
                        </p>
                    ))}
                    {/* COMO DEBERIA VERSE EL CHAT
                    <p className="align-self-start text-primary">sender_id 11</p>
                    <p className="align-self-end text-success">sender_id 4</p> */}
                    {/* INTENTANDO HACER EL CHAT                    
                    {store.buyChat?.map((mensaje, index) => {
                        const { sender_id, message_text } = mensaje;
                        const isSameSender = sender_id === lastSenderId;

                        // Actualizar el último sender_id mostrado
                        setLastSenderId(sender_id);

                        return (
                            <p
                                key={index}
                                className={`align-self-${isSameSender ? 'start text-primary' : 'end text-success'}`}
                            >
                                {message_text}
                            </p>
                        );
                    })} */}
                </div>
                <form className="form-control p-2" /* onSubmit={submitMessage} */>
                    <textarea
                        className="form-control mb-0"
                        id="message_text"
                        aria-describedby="emailHelp"
                        placeholder="Ingresa el mensaje"
                        /* required */
                        name="message_text"
                    /* value={store.message_text}
                    onChange={actions.inputMessage1} */
                    />
                    <input
                        type="submit"
                        className="form-control mt-1"
                        onClick={(e) => { e.preventDefault(), actions.getMensajesUsuario() }}
                    />
                </form>
            </div>
            <div>
                <h3>Nombre destinatario: {store.oneBook?.user_id} </h3>
                <h4>Libro a comprar: {store.oneBook?.title}</h4>
            </div>
        </div>
    );

};
export default Enviar_formulario