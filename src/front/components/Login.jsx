import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthServices from "../services/auth.services";
import useGlobalReducer from "../hooks/useGlobalReducer";

const Login = () => {
    const {store, dispatch} = useGlobalReducer()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const handleChange = e => {
        const {value, name} = e.target;
        setFormData({...formData, [name]: value});
    }


    const handleSubmit = e => {
        e.preventDefault();
        AuthServices.login(formData).then(data => {
            if (data.token) {

                console.log(data)
                localStorage.setItem('token', data.token)
                localStorage.setItem('user', JSON.stringify(data.user))
                localStorage.setItem('producto', JSON.stringify(data.user.tiendas[0].productos))
                console.log(data)
                dispatch({type: 'login', payload: data.user})
                return navigate('/perfil')   
            }
        })
    }

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card p-4 shadow-lg" style={{ width: "22rem" }}>
                <h3 className="text-center mb-3">Bienvenido</h3>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                            Email o Usuario
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name='email'
                            placeholder="tuemail@ejemplo.com"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            style={{ borderColor: '#a00' }}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name='password'
                            placeholder="contraseña"
                            required
                            value={formData.password}
                            onChange={handleChange}
                            style={{ borderColor: '#a00' }}
                        />
                    </div>

                    <button type="submit" className="btn btn-danger w-100">
                        Login
                    </button>
                    <p className="text-center mt-3 mb-0">
                        
                        <a href="/" className="text-decoration-none">
                            ¿Olvidaste la contraseña?
                        </a>
                    </p>

                </form>

                

                <p className="text-center mt-3 mb-0">
                    
                    <Link to="/register" type="submit" className="btn btn-danger w-100 mb-3">
                        Crear Cuenta
                    </Link>
                </p>
            </div>
        </div>

    )
}
export default Login