import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";  // Custom hook for accessing the global state.

export const NewTask = () => {
    // Access the global state and dispatch function using the useGlobalReducer hook.
    const { store, dispatch } = useGlobalReducer()

    return (
        <div className="container">
            <Link to="/">
                <button className="btn btn-primary">Back home</button>
            </Link>
            <div className="text-center">
                <h1>Publica una nueva tarea</h1>
            </div>
            <form className="border rounded-5 bg-light col-12 p-5">
                <div className="mb-3">
                    <label htmlFor="task-title" className="form-label">¿Qué necesita hacerse?</label>
                    <input type="email" className="form-control" id="task-title" placeholder="Escribe un título llamativo para tu tarea" />
                </div>
                <div className="mb-3">
                    <label htmlFor="deadline" className="form-label">¿Cuándo?</label>
                    <input type="date" className="form-control" id="deadline" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">¿Dónde?</label>
                    <div className="row ">
                        <div className="col-5">
                            <label for="inputPassword2" class="visually-hidden">Ciudad</label>
                            <input type="password" class="form-control" id="inputPassword2" placeholder="Ciudad"/>
                        </div>
                        <div className="col-3">
                            <label for="inputPassword2" class="visually-hidden">Código Postal</label>
                            <input type="password" class="form-control" id="inputPassword2" placeholder="CP"/>
                        </div>
                        <div className="col-4">
                            <label for="inputPassword2" class="visually-hidden">País</label>
                            <input type="password" class="form-control" id="inputPassword2" placeholder="País"/>
                        </div>
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="budget" className="form-label">¿Cuál es tu presupuesto?</label>
                    <input type="number" className="form-control" id="budget" />
                </div>
                <div className="mb-3">
                    <label htmlFor="floatingTextarea2">Detalles de la tarea</label>
                    <textarea className="form-control" rows="3" placeholder="Escribe los detalles de la tarea a resolver" id="floatingTextarea2" ></textarea>
                </div>
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        Selecciona la categoría de tu tarea
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li className="dropdown-item">
                            <input type="checkbox" className="form-check-input" id="general-cat" />
                            <label className="form-check-label mx-2" htmlFor="general-cat">General/Social</label>
                        </li>
                        <li className="dropdown-item">
                            <input type="checkbox" className="form-check-input" id="pets-cat" />
                            <label className="form-check-label mx-2" htmlFor="pets-cat">Mascotas</label>
                        </li>
                        <li className="dropdown-item">
                            <input type="checkbox" className="form-check-input" id="shop-cat" />
                            <label className="form-check-label mx-2" htmlFor="shop-cat">Shopping</label>
                        </li>
                        <li className="dropdown-item">
                            <input type="checkbox" className="form-check-input" id="garden-cat" />
                            <label className="form-check-label mx-2" htmlFor="garden-cat">Jardín</label>
                        </li>
                        <li className="dropdown-item">
                            <input type="checkbox" className="form-check-input" id="furniture-cat" />
                            <label className="form-check-label mx-2" htmlFor="furniture-cat">Muebles</label>
                        </li>

                    </ul>
                </div>
                <div className="my-3">
                    <label className="form-check-label my-2" htmlFor="fotos">Sube algunas fotos que ayuden a entender la tarea</label>
                    <input type="file" className="" id="fotos" multiple />
                </div>
                <button type="submit" className="btn btn-primary my-2">Submit</button>
            </form>
        </div>
    );
};
