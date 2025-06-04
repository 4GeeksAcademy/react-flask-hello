import { useNavigate } from "react-router-dom";
import imageHomeAdmin from '../assets/img/login.jpg';
import { useState } from "react";
import { useAuth } from "../context/AuthProvider";

export const Admin = () => {
    const { login } = useAuth();
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
                login(data.access_token, data.user);
                navigate("/admin/dashboard/profile");
            } else {
                setMsg('Datos invalidos')
            }

        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            setMsg("*Error en la conexión.");
        }
    }

    return (
        <div >
            <div className="d-flex position-absolute top-50 start-50 translate-middle gap-5 align-items-center border border-1 border-secondary rounded-3" >
                <div>
                    <img src={imageHomeAdmin} alt="" className="imgLogin rounded-start" />
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