import React from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useState } from "react";
import AuthServices from "../services/auth.services";

const Register = () => {
  const {store, dispatch} = useGlobalReducer()
  const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const navigate = useNavigate()
  
  const handleChange = e => {
        const {value, name} = e.target;
        setFormData({...formData, [name]: value});
    }


  const handleSubmit = e => {
        e.preventDefault();
        AuthServices.register(formData).then(data => {
            console.log(data)
            dispatch({type: 'register', payload: data.user})
            navigate('/login')
        })
    }

  return (
    <>
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <div className="card p-4 shadow-lg" style={{ width: "40rem" }}>
          <h3 className="text-center mb-3">Crear Cuenta</h3>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email 
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="tuemail@ejemplo.com"
                required
                value={formData.email}
                name="email"
                onChange={handleChange}
                style={{ borderColor: "#a00" }}
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
                placeholder="contraseña"
                required
                value={formData.password}
                name="password"
                onChange={handleChange}
                style={{ borderColor: "#a00" }}
              />
            </div>
            
            <button type="submit" className="btn btn-danger w-100 mb-3">
              Crear cuenta
            </button>
            
            
          </form>

         
        </div>
      </div>
    </>
  );
};
export default Register