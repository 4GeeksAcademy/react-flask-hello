import teacher from '../assets/img/teacher.png';
import { useEffect, useState } from "react";
import { useAuth } from '../context/AuthProvider';

export const ProfesoresProfile = () => {
    const [user, setUser] = useState([])
    const [load, setLoad] = useState(false)
    const { store } = useAuth();
    const token = store.access_token;

    useEffect(() => {
        const user = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/profile`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                })
                const data = await response.json()
                if (response.ok) {
                    console.log(data);
                    setUser(data)
                    setLoad(true)
                }
            } catch (error) {
                console.log(error);

            }
        }
        user()
    }, [])
    return (
        <div className="container py-4">
            {load ?
                <div className="row justify-content-center">
                    <div className="col-12 col-md-6 col-lg-5 mb-4 mb-md-0 d-flex flex-column justify-content-center align-items-center">
                        <h2 className="mb-4 text-center"> Bienvenido José {user.last_name}</h2>
                        <img src={teacher} className="img-profile rounded-circle shadow img-thumbnail object-fit-cover" alt="" />
                    </div>
                    <div className="col-12 col-md-6 col-lg-5">
                        <h5 className="fw-bold mb-3">Información básica</h5>
                        <ul className="list-group">
                            <li className="list-group-item"><div className="fw-bold">Apellidos:</div>{user.last_name}</li>
                            <li className="list-group-item"><div className="fw-bold">Nombres:</div>{user.first_name}</li>
                            <li className="list-group-item"><div className="fw-bold">ID:</div>{user.id}</li>
                            <li className="list-group-item"><div className="fw-bold">Correo:</div>{user.email}</li>
                            <li className="list-group-item"><div className="fw-bold">Teléfono:</div>{user.teacher.phone}</li>
                            <li className="list-group-item"><div className="fw-bold">Materia:</div>{user.teacher.courses[0].name}</li>
                        </ul>
                    </div>
                </div>
                :
                <div className="spinner-border position-absolute top-50 start-50 translate-middle" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>}
        </div>
    );
};