import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthProvider';

export const ProfesoresAlumnosNotas = () => {
    const [showTable, setShowTable] = useState(false);
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedPeriod, setSelectedPeriod] = useState('');
    const [grade, setGrade] = useState([])
    const [period, setPeriod] = useState([])
    const [selectedCourseId, setSelectedCourseId] = useState('');
    const [asignature, setAsignature] = useState('');
    const [student, setStudents] = useState([])
    const [editingId, setEditingId] = useState(null);
    const [isValid, setIsValid] = useState(true);
    const [load, setLoad] = useState(false)
    const [filterLoad, setFilterLoad] = useState(false)
    const { store } = useAuth();
    const token = store.access_token;

    useEffect(() => {
        const profileTeacher = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/profile`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await response.json();
                if (response.ok) {
                    setSelectedCourseId(data.teacher.courses[0].id);
                    setAsignature(data.teacher.courses[0].name)
                }
            } catch (error) {
                console.log(error);
            }
        };
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

        profileTeacher()
        grades()
        periods()
    }, [])

    useEffect(() => {
        if (grade !== ([]) && period !== ([]) && selectedCourseId !== ('')) {
            setFilterLoad(true)
        }
    }, [grade, period, selectedCourseId])

    const students = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/teacher/grades?grade_level_id=${selectedYear}&course_id=${selectedCourseId}&period=${selectedPeriod}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            const responseData = await response.json()
            if (response.ok) {
                console.log(responseData);
                const newData = transformData(responseData)
                setStudents(newData)
                setLoad(true)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleSearch = () => {
        if (selectedYear && selectedPeriod) {
            setShowTable(true);
            students()
        }
    };

    const transformData = (data) => {
        console.log(data);
        return data.map(item => ({
            id: item.student.user_id,
            enrollment_id: item.enrollment_id,
            firstName: item.student.first_name,
            lastName: item.student.last_name,
            participation: item.grade?.participation || '',
            homework: item.grade?.homework || '',
            midterm: item.grade?.midterm || '',
            final: item.grade?.final_exam || '',
            average: item.grade?.average || '',
            gradeId: item.grade?.id || null,
            period: selectedPeriod || '',
        }));
    };

    const handleEdit = (studentId) => {
        setEditingId(studentId);
    };

    const handleGradeChange = (id, field, value) => {
        if (value && (isNaN(value) || value < 0 || value > 20 || !Number.isInteger(parseFloat(value)))) {
            setIsValid(false);
            return;
        }

        const updatedGrades = student.map(grade => {
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
        setStudents(updatedGrades);
        setIsValid(true);
    };

    const handleSave = async (studentId) => {
        const studentToSave = student.find(grade => grade.id === studentId);
        if (!studentToSave) return;
        console.log(studentToSave);
        const payload = {
            participation: Number(studentToSave.participation),
            homework: Number(studentToSave.homework),
            midterm: Number(studentToSave.midterm),
            final_exam: Number(studentToSave.final),
            enrollment_id: studentToSave.enrollment_id,
            period: selectedPeriod,
        };

        try {
            let response;
            let responseData;
            if (studentToSave.gradeId) {
                response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/grade/${studentToSave.gradeId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        participation: Number(studentToSave.participation),
                        homework: Number(studentToSave.homework),
                        midterm: Number(studentToSave.midterm),
                        final_exam: Number(studentToSave.final),
                    })
                })
            } else {
                response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/grade`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        ...payload,
                        enrollment_id: studentToSave.enrollment_id,
                        period: selectedPeriod,
                    }),
                });
            }

            responseData = await response.json()
            if (response.ok) {
                console.log('Nota actualizada', responseData);
                setEditingId(null);
                students()
            } else {
                console.error('Error al actualizar', responseData.error);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="container table-responsive my-5">
            <div className="row">
                <div className="col-2">
                    <select
                        className="form-select"
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                    >
                        <option value="">Selecciona Año</option>
                        {grade.map((grade) => (
                            <option key={grade.id} value={grade.id}>{grade.name}</option>
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
                            <option key={i} value={i + 1}>{periodos} Bimestre</option>
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
            </div>

            {filterLoad ? (
                <div className="row">
                    {load && showTable && (
                        <div>
                            <h2 className='mt-5'>{asignature}</h2>
                            <table className="col-12 table table-striped table-bordered text-center mt-5">
                                <thead className="table-light">
                                    <tr>
                                        <th scope="col">ID</th>
                                        <th scope="col">Nombre</th>
                                        <th scope="col">Apellido</th>
                                        <th scope="col">Part. Clase (15%)</th>
                                        <th scope="col">Tareas (20%)</th>
                                        <th scope="col">Ex. Parcial (30%)</th>
                                        <th scope="col">Ex. Final (35%)</th>
                                        <th scope="col">Prom. Final</th>
                                        <th scope="col">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {student.map((student) => (
                                        <tr key={student.id}>
                                            <th scope="row">{student.id}</th>
                                            <td>{student.firstName}</td>
                                            <td>{student.lastName}</td>
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
            ) : (
                <div className="spinner-border position-absolute top-50 start-50 translate-middle" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            )}
        </div>
    );
}