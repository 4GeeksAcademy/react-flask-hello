import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthProvider';

export const ProfesoresAlumnosNotas = () => {
    const [showTable, setShowTable] = useState(false);
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedPeriod, setSelectedPeriod] = useState('');
    const [grade, setGrade] = useState([])
    const [period, setPeriod] = useState([])
    const [editingId, setEditingId] = useState(null);
    const [isValid, setIsValid] = useState(true);
    const [grades, setGrades] = useState([
        { id: 1, lastName: 'Mark', firstName: 'Otto', participation: '', homework: '', midterm: '', final: '', average: '' },
        { id: 2, lastName: 'Jacob', firstName: 'Thornton', participation: '', homework: '', midterm: '', final: '', average: '' },
        { id: 3, lastName: 'John', firstName: 'Doe', participation: '', homework: '', midterm: '', final: '', average: '' },
    ]);
    const { store } = useAuth();
    const token = store.access_token;

    useEffect(() => {
        const grades = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/setup/grade_levels`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                })
                const data = await response.json()
                if (response.ok) {
                    console.log(data);
                    setGrade(data)
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
                    setPeriod(responseData)
                }
            } catch (error) {
                console.log(error);

            }
        }

        grades()
        periods()
    }, [])

    const handleSearch = () => {
        if (selectedYear && selectedPeriod) {
            setShowTable(true);
            // Aquí irá la llamada a la API para obtener datos
        }
    };

    const handleEdit = (studentId) => {
        setEditingId(studentId);
    };

    const handleGradeChange = (id, field, value) => {
        if (value && (isNaN(value) || value < 0 || value > 20 || !Number.isInteger(parseFloat(value)))) {
            setIsValid(false);
            return;
        }

        const updatedGrades = grades.map(grade => {
            if (grade.id === id) {
                const updatedGrade = { ...grade, [field]: value };
                if (['participation', 'homework', 'midterm', 'final'].includes(field)) {
                    const p = parseFloat(updatedGrade.participation) || 0;
                    const h = parseFloat(updatedGrade.homework) || 0;
                    const m = parseFloat(updatedGrade.midterm) || 0;
                    const f = parseFloat(updatedGrade.final) || 0;
                    updatedGrade.average = ((p * 0.15) + (h * 0.20) + (m * 0.30) + (f * 0.35)).toFixed(2);
                }
                return updatedGrade;
            }
            return grade;
        });
        setGrades(updatedGrades);
        setIsValid(true);
    };

    const handleSave = (studentId) => {
        setEditingId(null);
        // Aquí irá la lógica para guardar en la base de datos
    };

    return (
        <div className="container table-responsive">
            <div className="row">
                <div className="col-2">
                    <select
                        className="form-select"
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                    >
                        <option value="">Selecciona Año</option>
                        {grade.map((grade) => (
                            <option key={grade.id} value={grade.id}>{grade.name} </option>
                        ))}
                    </select>
                </div>
                <div className="col-2">
                    <select
                        className="form-select"
                        value={selectedPeriod}
                        onChange={(e) => setSelectedPeriod(e.target.value)}
                    >
                        <option value="">Selecciona Periodo</option>
                        {period.map((periodos, i) => (
                            <option key={i} value={periodos}>{periodos} Bimestre</option>
                        ))}
                    </select>
                </div>

                <div className="col-2">
                    <button
                        type="button"
                        className="btn btn-success px-4"
                        onClick={handleSearch}
                    >
                        Buscar
                    </button>
                </div>

                {showTable && (
                    <div>
                        <table className="col-12 table table-striped table-bordered text-center mt-5">
                            <thead className="table-light">
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Last Name</th>
                                    <th scope="col">First Name</th>
                                    <th scope="col">Part. Clase (15%)</th>
                                    <th scope="col">Tareas (20%)</th>
                                    <th scope="col">Ex. Parcial (30%)</th>
                                    <th scope="col">Ex. Final (35%)</th>
                                    <th scope="col">Prom. Final</th>
                                    <th scope="col">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {grades.map((student) => (
                                    <tr key={student.id}>
                                        <th scope="row">{student.id}</th>
                                        <td>{student.lastName}</td>
                                        <td>{student.firstName}</td>
                                        <td>
                                            <input
                                                type="number"
                                                className="form-control form-control-sm text-center"
                                                value={student.participation}
                                                onChange={(e) => handleGradeChange(student.id, 'participation', e.target.value)}
                                                disabled={editingId !== student.id}
                                                min="0"
                                                max="20"
                                                step="1"
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="number"
                                                className="form-control form-control-sm text-center"
                                                value={student.homework}
                                                onChange={(e) => handleGradeChange(student.id, 'homework', e.target.value)}
                                                disabled={editingId !== student.id}
                                                min="0"
                                                max="20"
                                                step="1"
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="number"
                                                className="form-control form-control-sm text-center"
                                                value={student.midterm}
                                                onChange={(e) => handleGradeChange(student.id, 'midterm', e.target.value)}
                                                disabled={editingId !== student.id}
                                                min="0"
                                                max="20"
                                                step="1"
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="number"
                                                className="form-control form-control-sm text-center"
                                                value={student.final}
                                                onChange={(e) => handleGradeChange(student.id, 'final', e.target.value)}
                                                disabled={editingId !== student.id}
                                                min="0"
                                                max="20"
                                                step="1"
                                            />
                                        </td>
                                        <td>{student.average}</td>
                                        <td className="text-center">
                                            {editingId !== student.id ? (
                                                <button
                                                    type="button"
                                                    className="btn btn-sm btn-success"
                                                    onClick={() => handleEdit(student.id)}
                                                >
                                                    <i className="ri-edit-line"></i>
                                                </button>
                                            ) : (
                                                <button
                                                    type="button"
                                                    className="btn btn-sm btn-primary"
                                                    onClick={() => handleSave(student.id)}
                                                    disabled={!isValid}
                                                >
                                                    <i className="ri-save-line"></i>
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};