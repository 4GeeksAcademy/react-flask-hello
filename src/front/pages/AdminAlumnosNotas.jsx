import { useEffect, useState } from "react";

export const AdminAlumnosNotas = () => {
    const token = sessionStorage.getItem('access_token')
    const [students, setStudents] = useState([])
    const [asignature, setAsignature] = useState([])
    const [period, setPeriods] = useState([])
    const [grade, setGrades] = useState([])

    useEffect(() => {
        const students = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/students`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                })
                const responseData = await response.json()
                if (response.ok) {
                    console.log(responseData);
                    setStudents(responseData)
                }
            } catch (error) {
                console.log(error);

            }
        }

        const asignatures = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/courses`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                })
                const responseData = await response.json()
                if (response.ok) {
                    setAsignature(responseData)
                }
            } catch (error) {
                console.log(error);

            }
        }

        const periods = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/periods`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                })
                const responseData = await response.json()
                if (response.ok) {
                    console.log(responseData);
                    setPeriods(responseData)
                }
            } catch (error) {
                console.log(error);

            }
        }

        const grades = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/periods`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                })
                const responseData = await response.json()
                if (response.ok) {
                    console.log(responseData);
                    setGrades(responseData)
                }
            } catch (error) {
                console.log(error);

            }
        }

        grades()
        periods()
        asignatures()
        students()
    }, [])

    return (
        <div className="container table-responsive">
            <div className="row">
                <div className="col-2">
                    <select className="form-select" aria-label="Selecciona una opción">
                        <option value="">Selecciona Año</option>
                        <option value="1">Primero</option>
                        <option value="2">Segundo</option>
                        <option value="3">Tercero</option>
                        <option value="4">Cuarto</option>
                        <option value="5">Quinto</option>
                    </select>
                </div>
                <div className="col-2">
                    <select className="form-select" aria-label="Selecciona una opción">
                        <option value="">Selecciona Materia</option>
                        {asignature.map((asignature) => (
                            <option key={asignature.id} value={asignature.id}>{asignature.name}</option>
                        ))}
                    </select>
                </div>
                <div className="col-2">
                    <select className="form-select" aria-label="Selecciona una opción">
                        <option value="">Selecciona Periodo</option>
                        {period.map((periodos, i) => (
                            <option key={i} value={periodos}>{periodos} Bimestre</option>
                        ))}
                    </select>
                </div>
                <div className="col-2">
                    <button type="button" className="btn btn-success px-4">Buscar</button>
                </div>
                <table className="col-12 table table-striped table-bordered text-center mt-5">
                    <thead className="table-light">
                        <tr>
                            <th scope="col" className="admin-num">ID</th>
                            <th scope="col" className="admin-lastname">Apellidos</th>
                            <th scope="col" className="admin-firstname">Nombres</th>
                            <th scope="col" className="admin-participacion">Part. Clase (15%)</th>
                            <th scope="col" className="admin-tareas">Tareas (20%)</th>
                            <th scope="col" className="admin-parcial">Ex. Parcial (30%)</th>
                            <th scope="col" className="admin-final">Ex. Final (35%)</th>
                            <th scope="col" className="admin-promedio">Prom. Final</th>
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
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td>John</td>
                            <td>Doe</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};