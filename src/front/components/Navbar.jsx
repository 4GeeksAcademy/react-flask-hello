import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {
	const { store, dispatch } = useGlobalReducer()
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Road Travel Rent-a-Car
        </Link>

        <div className="ml-auto d-flex gap-2">
          <Link to="/signup">
            <button className="btn btn-outline-primary">Sign Up</button>
          </Link>
          <Link to="/login">
            <button className="btn btn-outline-success">Login</button>
          </Link>
          <Link to="/admin">
            <button className="btn btn-outline-warning">Admin</button>
          </Link>
        </div>
      </div>
    </nav>
  );
};