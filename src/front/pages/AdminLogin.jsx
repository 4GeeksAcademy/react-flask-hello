import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useState } from "react";

export const Admin = () => {
    // Access the global state and dispatch function using the useGlobalReducer hook.
    const { store, dispatch } = useGlobalReducer()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [msg, setMsg] = useState('')
    const navigate = useNavigate();

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            setMsg("*Completa los campos correctamente.");
            return;
        } else setMsg('')
        const body = JSON.stringify({ email, password })

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/login/admin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body,
            })

            const data = await response.json()

            if (response.ok) {
                console.log('ínicio corrector');
                console.log(response.status);

                sessionStorage.setItem("access_token", data.access_token);
                navigate("/admin/dashboard/profile");
            }

        } catch (error) {
            console.log(error);
            setMsg('*Email o contraseña son incorrectos')

        }
    }

    return (
        <div >
            <div className="d-flex position-absolute top-50 start-50 translate-middle gap-5 align-items-center border border-1 border-secondary rounded-3" >
                <div>
                    <img src="/src/front/assets/img/login.jpg" alt="" className="imgLogin rounded-start" />
                </div>
                <form className="AdminLoginWidth me-5" onSubmit={handleOnSubmit}>
                    <h1 className="text-center mb-5">Login Admin</h1>
                    <div className="d-flex flex-column gap-3 mb-4">
                        <div>
                            <label className="form-label">Email </label>
                            <input name="email" type="email" className="form-control" onChange={e => setEmail(e.target.value)} required />
                        </div>
                        <div>
                            <label className="form-label">Password</label>
                            <input name="password" type="password" className="form-control" onChange={e => setPassword(e.target.value)} required />
                        </div>

                    </div>
                    <p className="text-danger">{msg}</p>
                    <button type="submit" className="btn btn-outline-dark w-100">Login</button>
                </form>
            </div>
        </div>
    )
}