import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import { Context } from "../store/appContext";

export const MyExchangeBookDetails = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const { id } = useParams();
    const [isEditing, setIsEditing] = useState(false); // Estado para controlar si estamos en modo edición
    const [editedBook, setEditedBook] = useState({}); // Estado para mostar los datos del libro

    useEffect(() => {
        actions.getOneBook(id)
    }, [id]);

    const handleEditClick = () => {
        setIsEditing(true);
        // Inicializamos el objeto de libro editado con los valores actuales del libro
        setEditedBook({
            title: store.oneBook?.title,
            author: store.oneBook?.author,
            description: store.oneBook?.description,
            cathegory: store.oneBook?.cathegory,
            number_of_pages: store.oneBook?.number_of_pages,
        });
    };

    const handleCancelClick = () => {
        setIsEditing(false);
    };

    const handleSaveClick = () => {

        actions.updateBook(id, editedBook, navigate);
        // Desactiva el modo de edición
        setIsEditing(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedBook({ ...editedBook, [name]: value });
    };

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
                    {isEditing ? (
                        // Modo de edición
                        <div>
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Título</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="title"
                                        name="title"
                                        value={editedBook.title}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="author" className="form-label">Autor</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="author"
                                        name="author"
                                        value={editedBook.author}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Descripción</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="description"
                                        name="description"
                                        value={editedBook.description}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="cathegory" className="form-label">Categoría</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="cathegory"
                                        name="cathegory"
                                        value={editedBook.cathegory}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="number_of_pages" className="form-label">Número de Páginas</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="number_of_pages"
                                        name="number_of_pages"
                                        value={editedBook.number_of_pages}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </form>
                            <button className="btn btn-success" onClick={handleSaveClick}>Guardar</button>
                            <button className="btn btn-secondary mx-2" onClick={handleCancelClick}>Cancelar</button>
                        </div>
                    ) : (
                        // Modo de vista
                        <div className="d-flex">
                            <div className="p-0">
                                <p className="text-dark mb-3">Autor: {store.oneBook?.author}</p>
                                <p className="text-dark mb-3">Descripción: {store.oneBook?.description}</p>
                                <p className="text-dark mb-3">Categoría: {store.oneBook?.cathegory}</p>
                                <p className="text-dark mb-3">Número de Páginas: {store.oneBook?.number_of_pages}</p>
                            </div>
                        </div>
                    )}
                    <div className="mt-4">
                        {isEditing ? (
                            <></>
                        ) : (
                            <button type="button" className="btn btn-primary" onClick={handleEditClick}>
                                Editar"
                            </button>
                        )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};
