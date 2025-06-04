import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider.jsx";

export const AdminAlumnosAsistencia = () => {

    const { store } = useAuth();
    const token = store.access_token;
    const [students, setStudents] = useState([])
    const [period, setPeriods] = useState([])
    const [grade, setGrades] = useState([])
    const [load, setLoad] = useState(false)

    useEffect(() => {
        const students = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/students`, {
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
                    setPeriods(responseData)
                }
            } catch (error) {
                console.log(error);

            }
        }

        const grades = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/setup/grade_levels`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                })
                const responseData = await response.json()
                if (response.ok) {
                    setGrades(responseData)
                }
            } catch (error) {
                console.log(error);

            }
        }
        if (grade != ([]) && period != ([])) {
            setLoad(true)
        }
        grades()
        periods()
        students()
    }, [])

    const [showTable, setShowTable] = useState(false);

    const handleAsistencia = () => {
        setShowTable(true);
    };



    return (

        <div className="container-fliud table-responsive px-4">
            {load ?
                <div>
                    <div className="row justify-content-center">
                        <div className="col-2">
                            <select className="form-select" aria-label="Selecciona una opción">
                                <option value="">Selecciona Año</option>
                                {grade.map((grade) => (
                                    <option key={grade.id} value={grade.id}>{grade.name} </option>
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
                    </div>
                    <div className="row">
                        <div className="col-7">
                            <table className="table table-striped table-bordered text-center mt-5">
                                <thead className="table-light">
                                    <tr>
                                        <th scope="col admin-num">Código</th>
                                        <th scope="col admin-lastname">Apellidos</th>
                                        <th scope="col admin-firstname">Nombres</th>
                                        <th scope="col admin-faltas">Faltas</th>
                                        <th scope="col admin-assis-but"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1234</td>
                                        <td>Mark</td>
                                        <td>Otto</td>
                                        <td>10</td>
                                        <td>
                                            <button type="button" className="btn btn-primary btn-sm" onClick={handleAsistencia}>Asistencia</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>5678</td>
                                        <td>Alejandro</td>
                                        <td>Guzmán</td>
                                        <td>500</td>
                                        <td>
                                            <button type="button" className="btn btn-primary btn-sm" onClick={handleAsistencia}>Asistencia</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {showTable && (
                            <div className="col-5">
                                <table className="table table-striped table-bordered text-center mt-5">
                                    <thead className="table-ligth">
                                        <tr>
                                            <th scope="col">Fecha</th>
                                            <th scope="col">Asistencia</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{new Date().toLocaleDateString()}</td>
                                            <td>
                                                <div className="d-flex justify-content-around">
                                                    <div className="form-check form-check-inline">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            name="asistencia"
                                                            id="asistio"
                                                            disabled
                                                        />
                                                        <label className="form-check-label" htmlFor="asistio">
                                                            Asistió
                                                        </label>
                                                    </div>
                                                    <div className="form-check form-check-inline">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            name="asistencia"
                                                            id="tardanza"
                                                            disabled
                                                        />
                                                        <label className="form-check-label" htmlFor="tardanza">
                                                            Tardanza
                                                        </label>
                                                    </div>
                                                    <div className="form-check form-check-inline">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            name="asistencia"
                                                            id="falto"
                                                            disabled
                                                        />
                                                        <label className="form-check-label" htmlFor="falto">
                                                            Faltó
                                                        </label>
                                                    </div>
                                                    <div className="form-check form-check-inline">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            name="asistencia"
                                                            id="noregistrado"
                                                            defaultChecked
                                                            disabled
                                                        />
                                                        <label className="form-check-label" htmlFor="noregistrado">
                                                            No registrado
                                                        </label>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div className="text-center mt-2">
                                    <button
                                        type="button"
                                        className="btn btn-danger btn-sm"
                                        onClick={() => setShowTable(false)}
                                    >
                                        Cerrar
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                :
                <div className="spinner-border position-absolute top-50 start-50 translate-middle" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            }
        </div>
    );
};