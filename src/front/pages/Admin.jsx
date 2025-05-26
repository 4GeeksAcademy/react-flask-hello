import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Admin = () => {
    // Access the global state and dispatch function using the useGlobalReducer hook.
    const { store, dispatch } = useGlobalReducer()
    return (
        <div className="d-flex position-absolute top-50 start-50 translate-middle gap-5">
            <div>
                <img src="src/front/assets/img/login.jpg" alt="" className="imgLogin " />
            </div>
            <div className="AdminLoginWidth">
                <h1 className="text-center">Admin</h1>
                <div>
                    <div>
                        <label >Email</label>
                        <input type="email" />
                    </div>
                    <div>
                        <label >Password</label>
                        <input type="password" />
                    </div>
                </div>
                <button className="">Log in</button>
            </div>
        </div>
    )
}