import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import studentImg from "../assets/img/students.png";
import teacherImg from "../assets/img/teacher.png";
import { useAuth } from "../context/AuthProvider.jsx";
import { Link } from "react-router-dom";

//INSTALAR LIBRERIA : npm install react-leaflet@4.2.1 leaflet
//INSTALAR LIBRERIA : npm install leaflet-defaulticon-compatibility

export const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("student");
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setMsg("Completa los campos correctamente.");
      return;
    }

    setMsg("");

    const body = JSON.stringify({ email, password });

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/login/${user}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.msg === 'Estudiante no encontrado' || data.msg === 'Contraseña incorrecta') {
          setMsg("Credenciales inválidas")
        } else {
          setMsg(data.msg);
        }
      } else {
        login(data.access_token, data.user);
        navigate(`/${user}/dashboard/profile`);
      }
    } catch (error) {
      console.log(error);
      setMsg("Error en la conexión con el servidor.");
    }
  };


  return (
    <div className="background-container">
      <div className="login-signup-form position-absolute top-50 start-50 translate-middle border rounded-3 p-3 p-md-4"  >
        <form className="login-width mx-auto" onSubmit={handleOnSubmit}>
          <h1 className="text-center mb-4">Bienvenido</h1>
          <div className="d-flex flex-column gap-3 mb-4">
            <div>
              <input name="email" type="email" className="form-control" placeholder="Correo electrónico" onChange={e => setEmail(e.target.value)} required />
            </div>
            <div>
              <input name="password" type="password" className="form-control" placeholder="Contraseña" onChange={e => setPassword(e.target.value)} required />
            </div>
          </div>
          <div className="d-flex flex-column align-items-center gap-4 w-100 mb-3">
            <p className="h5 mb-0 text-secondary">¿Cómo quieres ingresar?</p>
            <div className="d-flex justify-content-evenly w-100">
              <div
                className={`user-select pointer d-flex flex-column align-items-center ${user === 'student' ? 'selected' : ''}`}
                onClick={() => setUser('student')}
              >
                <img src={studentImg} alt="Estudiante" className="imgUserWidth mb-2" />
                <p className="m-0 fw-semibold">Alumno</p>
              </div>
              <div
                className={`user-select pointer d-flex flex-column align-items-center ${user === 'teacher' ? 'selected' : ''}`}
                onClick={() => setUser('teacher')}
              >
                <img src={teacherImg} alt="Profesor" className="imgUserWidth mb-2" />
                <p className="m-0 fw-semibold">Profesor</p>
              </div>
            </div>
          </div>
          {msg && (
            <div className="alert alert-danger d-flex justify-content-center align-items-center py-1 mb-3 gap-2" role="alert">
              <i class="ri-error-warning-line"></i>
              <div>{msg}</div>
            </div>
          )}
          <button type="submit" className="btn btn-dark w-100">Iniciar Sesión</button>
          <p className="mt-2">
            ¿Olvidaste tu contraseña?{" "}
            <Link to="/forgot-password">Haz clic aquí</Link>
          </p>
        </form>
      </div>
    </div>
  );
};
