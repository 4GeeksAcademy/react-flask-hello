import React, {  useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import { Context } from "../store/appContext";



const RegistroLibro = () => {
    
    const {store, actions} = useContext(Context)    
    const navigate = useNavigate()
    
    return (
        <div className="container col-md-4 my-3 shadow p-0">
            <form className="form-control shadow p-3 " onSubmit={(e) => actions.submitBook(e, navigate)}>
                <div className="mb-3">
                    <label htmlFor="form" className="form-label">
                        Titulo 
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        aria-describedby="emailHelp"
                        placeholder="Ingresa el titulo"                       
                        required
                        name={'title'}
                        value={store.newBook.title}
                        onChange={actions.handleChangeBook}
                    
                    />
                    <label htmlFor="exampleInputEmail1" className="form-label">
                        Autor
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="author"
                        aria-describedby="emailHelp"
                        placeholder="Ingresa el autor"                        
                        required
                        name={'author'}
                        value={store.newBook.author}
                        onChange={actions.handleChangeBook}
                    />
                    <label htmlFor="exampleInputEmail1" className="form-label">
                        Categoria
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="cathegory"
                        aria-describedby="emailHelp"
                        placeholder="Ingresa la categoria"
                        required                         
                        name={'cathegory'}
                        value={store.newBook.cathegory}
                        onChange={actions.handleChangeBook}
                    

                    />
                </div>
                <div className="mb-3 password">
                    <label htmlFor="exampleInputPassword1" className="form-label">
                        Numero de páginas
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="number_of_pages"
                        placeholder="Numero de páginas"
                        required
                        name={'number_of_pages'}
                        value={store.newBook.number_of_pages}
                        onChange={actions.handleChangeBook}
                    
                    />
                </div>
                <div className="mb-3 password">
                    <label htmlFor="exampleInputPassword1" className="form-label">
                        Descripción
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="description"
                        placeholder="Descripción"
                        required
                        name={'description'}
                        value={store.newBook.description}
                        onChange={actions.handleChangeBook}
                    
                    />
                </div>
                <div className="mb-3 password">
                    <label htmlFor="exampleInputPassword1" className="form-label">
                        Precio
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="price"
                        placeholder="Ingresa precio"
                        required
                        name={'price'}
                        value={store.newBook.price}
                        onChange={actions.handleChangeBook}
                    
                    />
                </div>
                <div className="mb-3 password">
                    <label htmlFor="exampleInputPassword1" className="form-label">
                        Foto
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="photo"
                        placeholder="Ingresa foto"                        
                        name={'photo'}
                        value={store.newBook.photo}
                        onChange={actions.handleChangeBook}
                    
                    />
                </div>
                <div className="input-group mb-3">
                    <label className="input-group-text" htmlFor="inputGroupSelect01">
                        Tipo
                    </label>
                    <select className="form-select"  name="type" required value={store.newBook.type}
                        onChange={actions.handleChangeBook}>
                        
                        <option value="" >Libro para...</option>
                        <option value={1}>Venta</option>
                        <option value={2}>Intercambio</option>
                        <option value={3}>Donación</option>                        
                    </select>
                </div>                
                <button type="submit" className="btn btn-primary my-3">
                    Publicar
                </button>
            </form>
        </div>
    )

};
export default RegistroLibro