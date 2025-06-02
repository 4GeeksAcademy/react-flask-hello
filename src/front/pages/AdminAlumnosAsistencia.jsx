import { useEffect } from "react";
import { useAuth } from "../context/AuthProvider.jsx";

export const AdminAlumnosAsistencia = () => {

    const token = sessionStorage.getItem('access_token')
    const auth = useAuth()

    useEffect(() => {
        auth.getProfile()
    }, [auth?.store?.access_token])

    useEffect(() => {
        const students = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/information/students`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                })
                const responseData = await response.json()
                if (response.ok) {
                    console.log(responseData);

                }
            } catch (error) {
                console.log(error);

            }
        }
        students()
    }, [])

    return (

        <div className="container table-responsive">
            <div className="row">
                <div className="col-2">
                    <select className="form-select" aria-label="Selecciona una opción">
                        <option value="">Selecciona Año</option>
                        <option value="1">Primero de secundaria</option>
                        <option value="2">Segundo de secundaria</option>
                        <option value="3">Tercero de secundaria</option>
                        <option value="4">Cuarto de secundaria</option>
                        <option value="5">Quinto de secundaria</option>
                    </select>
                </div>
                <div className="col-2">
                    <select className="form-select" aria-label="Selecciona una opción">
                        <option value="">Selecciona Periodo</option>
                        <option value="1">Primer periodo</option>
                        <option value="2">Segundo periodo</option>
                        <option value="3">Tercero periodo</option>
                        <option value="4">Cuarto periodo</option>
                    </select>
                </div>
                <div className="col-2">
                    <button type="button" className="btn btn-success px-4">Buscar</button>
                </div>
                <table className="col-12 table table-striped table-bordered text-center mt-5">
                    <thead className="table-light">
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">First Name</th>
                            <th scope="col">Periodo</th>
                            <th scope="col">Grade level</th>
                            <th scope="col">Student code</th>
                            <th scope="col">Asistencia completa</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>
                                <button type="button" className="btn btn-warning">Asistencia</button>
                            </td>
                        </tr>

                    </tbody>
                </table>
            </div>
        </div>
    );
};