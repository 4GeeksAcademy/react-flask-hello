import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom'

import { Context } from "../store/appContext";

export const MySoldDetails = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        actions.getMyOnePurchasedBook(id);
        actions.getMyMessageForBook(store.myOneBook[0]?.id)


    }, [id, store.myOneBook[0]?.id]);

    return (
        <div>
            <div className="container-fluid d-flex">
                <div className="card shadow-sm m-3" style={{ width: "300px", height: "100%" }}>
                    <img src={store.myOneBook[0]?.book?.photo} className="card-img-top" alt="Hollywood Sign on The Hill" style={{ width: "100%", height: "400px" }} />
                </div>
                <div className="m-3 mt-5 mb-5">
                    <h1>{store.myOneBook[0]?.book?.title}</h1>
                    <hr className="dropdown-divider" />
                    <br></br>
                    <div className="d-flex  "   >
                        <div className="p-0 " >
                            <p className="text-dark mb-3">{store.myOneBook[0]?.book?.author}</p>
                            <p className="text-dark mb-3">{store.myOneBook[0]?.book?.description}</p>
                            <p className="text-dark mb-3">{store.myOneBook[0]?.book?.user_name}</p>
                            <p>receiver: {store.myChat[0]?.sender_id}</p>
                        </div>
                    </div>
                </div>
                <div className="mt-3 ms-2  ">
                    <div className="border rounded">
                        <div className="border rounded m-2 d-flex flex-column" style={{ width: "500px", maxHeight: "280px", overflowY: "auto" }}>
                            {store.myChat.map((message, index) => (
                                <div className="d-flex flex-column" key={index}>
                                    {message.sender_id === store.currentUser.user.id ? (
                                        <div className="align-self-start text-primary m-2">
                                            <p><strong>Tú:</strong> {message.message_text}</p>
                                        </div>
                                    ) : (
                                        <div className="align-self-end text-success m-2">
                                            <p>{message.message_text}</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <form className="form-control shadow p-3" onSubmit={(e) => {
                            actions.inputMessage1(
                                store.currentUser?.user?.id,
                                store.myChat[0]?.sender_id,
                                store.myChat[0]?.book_id,
                                store.message_text,
                                store.myChat[0]?.purchase_id,
                                store.myChat[0]?.purchase_id,
                                id,
                                e,
                            )

                        }}>
                            <div className="mb-3">
                                <label htmlFor="message_text" className="form-label">
                                    Titulo
                                </label>
                                <input
                                    type="text"
                                    className="form-control mb-0"
                                    id="message_text"
                                    aria-describedby="emailHelp"
                                    placeholder="Ingresa el mensaje"
                                    required
                                    name="message_text"
                                    value={store.message_text}
                                    onChange={actions.inputTextArea}
                                />
                            </div>
                            <button type="" className="btn btn-success my-3" >
                                Enviar
                            </button>
                        </form>
                    </div>
                </div>


            </div>
        </div>
    );
};