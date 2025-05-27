import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Admin = () => {
    // Access the global state and dispatch function using the useGlobalReducer hook.
    const { store, dispatch } = useGlobalReducer()
    return (
        <div >
            <div className="d-flex position-absolute top-50 start-50 translate-middle gap-5 align-items-center border border-1 border-secondary rounded-3">
                <div>
                    <img src="src/front/assets/img/login.jpg" alt="" className="imgLogin rounded-start" />
                </div>
                <div className="AdminLoginWidth me-5">
                    <h1 className="text-center">Login Admin</h1>
                    <div className="d-flex flex-column gap-3 ">
                        <div>
                            <label className="form-label">Email</label>
                            <input type="email" className="form-control" />
                        </div>
                        <div>
                            <label className="form-label">Password</label>
                            <input type="password" className="form-control" />
                        </div>
                    </div>
                    <button type="button" className="btn btn-outline-dark mt-4 w-100">Login</button>
                </div>
            </div>
        </div>
    )
}