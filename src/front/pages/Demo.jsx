// src/front/pages/Demo.jsx
import { Link } from "react-router-dom";
import { useStore } from "../hooks/useGlobalReducer";

export default function Demo() {
  const { store /*, actions*/ } = useStore();

  return (
    <div className="container">
      <ul className="list-group">
        {store && store.todos?.map((item) => (
          <li
            key={item.id}
            className="list-group-item d-flex justify-content-between"
            style={{ background: item.background }}
          >
            <Link to={"/single/" + item.id}>Link to: {item.title}</Link>
            <p>Open file ./store.js to see the global store</p>
          </li>
        ))}
      </ul>
      <br />
      <Link to="/"><button className="btn btn-primary">Back home</button></Link>
    </div>
  );
}