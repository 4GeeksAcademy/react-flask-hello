// src/front/pages/Single.jsx
import { Link, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { useStore } from "../hooks/useGlobalReducer";

export default function Single(props) {
  const { store } = useStore();
  const { theId } = useParams();
  const singleTodo = store.todos?.find(todo => todo.id === parseInt(theId));

  return (
    <div className="container text-center">
      <h1 className="display-4">Todo: {singleTodo?.title}</h1>
      <hr className="my-4" />
      <Link to="/"><span className="btn btn-primary btn-lg">Back home</span></Link>
    </div>
  );
}

Single.propTypes = {
  match: PropTypes.object
};