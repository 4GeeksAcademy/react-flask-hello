import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const GoogleApi = () => {
  const { store, dispatch } = useGlobalReducer()

  return (
    <div className="container-fluid min-vh-100" style={{ height: '100vh' }}> {/* Full height for the container */}
      <div className="row px-md-5" style={{ height: '70%' }}> {/* 70% height for the row */}
        <div className="col-9 h-100 bg-primary">aaa</div>
        <div className="col-3 h-100 bg-success">aaa</div>
      </div>
      <div className="row px-md-5" style={{ height: '30%' }}> {/* 30% height for the row */}
        <div className="col-12 h-100 bg-danger">bbb</div>
      </div>
      <Link to="/">
        <button className="btn btn-primary">Back home</button>
      </Link>
    </div>
  );
};
