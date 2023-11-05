import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import { Context } from "../store/appContext";



const RegisterBook = () => {

    const { store, actions } = useContext(Context)
    const navigate = useNavigate()

    return (
        <div className="container my-3  p-0">
            <div className="row align-items-center">
                <div className="col-md-6">
                    <div className="d-flex flex-column justify-content-center align-items-start h-100">
                        <h2>Formulario de publicación de libros</h2>
                        <p className="text-muted">Aquí debes llenar cada campo con la información correcta de tu libro y seleccionar si es para vender o intercambiar.</p>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="container col-md-8 my-3 shadow p-0">
                        <form className="form-control shadow p-3" onSubmit={(e) => { actions.submitBookImage(e, navigate) }}>
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">
                                    Titulo
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    aria-describedby="emailHelp"
                                    placeholder="Ingresa el titulo"
                                    required
                                    name="title"
                                    value={store.title}
                                    onChange={actions.inputBookValue}
                                />
                                <label htmlFor="author" className="form-label">
                                    Autor
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="author"
                                    aria-describedby="emailHelp"
                                    placeholder="Ingresa el autor"
                                    required
                                    name="author"
                                    value={store.author}
                                    onChange={actions.inputBookValue}
                                />
                                <label htmlFor="cathegory" className="form-label">
                                    Categoria
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="cathegory"
                                    aria-describedby="emailHelp"
                                    placeholder="Ingresa la categoria"
                                    required
                                    name="cathegory"
                                    value={store.cathegory}
                                    onChange={actions.inputBookValue}
                                />
                            </div>
                            <div className="mb-3 ">
                                <label htmlFor="number_of_pages" className="form-label">
                                    Numero de páginas
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="number_of_pages"
                                    placeholder="Numero de páginas"
                                    required
                                    name="number_of_pages"
                                    value={store.number_of_pages}
                                    onChange={actions.inputBookValue}
                                />
                            </div>
                            <div className="mb-3 ">
                                <label htmlFor="description" className="form-label">
                                    Descripción
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="description"
                                    placeholder="Descripción"
                                    required
                                    name="description"
                                    value={store.description}
                                    onChange={actions.inputBookValue}
                                />
                            </div>
                            <div className="mb-3 ">
                                <label htmlFor="price" className="form-label">
                                    Precio
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="price"
                                    placeholder="Ingresa precio"
                                    required
                                    name="price"
                                    value={store.price}
                                    onChange={actions.inputBookValue}

                                />
                            </div>
                            <div className="mb-3 ">
                                <label htmlFor="photo" className="form-label">
                                    Foto
                                </label>
                                <input
                                    type="file"
                                    className="form-control"
                                    id="photo"
                                    placeholder="Ingresa foto"
                                    name="photo"
                                    onChange={(e) => actions.inputBookImage(e.target.files[0])}

                                />
                            </div>
                            <div className="mb-3 ">
                                <label htmlFor="type" className="form-label">
                                    Tipo
                                </label>
                                <select
                                    className="form-select"
                                    id="type"
                                    required
                                    name="type"
                                    value={store.type.toString()}
                                    onChange={actions.inputBookValue}
                                    multiple={false}
                                >
                                    <option value="">Seleccionar tipo de transacción</option>
                                    <option value="Venta">Venta</option>
                                    <option value="Intercambio">Intercambio</option>
                                    <option value="Donación">Donación</option>
                                </select>
                            </div>
                            <button type="" className="btn btn-success my-3" >
                                Publicar
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )

};
export default RegisterBook