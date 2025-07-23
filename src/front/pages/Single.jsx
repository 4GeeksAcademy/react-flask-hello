import { Link, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Single = props => {
    const { store } = useGlobalReducer()
    const { theId } = useParams()
    const singleTodo = store.todos.find(todo => todo.id === parseInt(theId));

    return (
        <div className="container text-center">
            <h1 className="display-4">Todo: {singleTodo?.title}</h1>
            <hr className="my-4" />

            <Link to="/home">
                <span className="btn btn-primary btn-lg" href="#" role="button">
                    Back home
                </span>
            </Link>
        </div>
    );
};