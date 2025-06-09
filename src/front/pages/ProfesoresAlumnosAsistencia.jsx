import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider.jsx";

export const ProfesoresAlumnosAsistencia = () => {
    const { store } = useAuth();
    const token = store.access_token;

    const [students, setStudents] = useState([]);
    const [periods, setPeriods] = useState([]);
    const [grades, setGrades] = useState([]);
    const [selectedGrade, setSelectedGrade] = useState("");
    const [selectedPeriod, setSelectedPeriod] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [attendance, setAttendance] = useState({});
    const [attendanceHistory, setAttendanceHistory] = useState([]);
    const [showTable, setShowTable] = useState(false);
    const [load, setLoad] = useState(false);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/periods`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(setPeriods)
            .catch(console.error);

        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/setup/grade_levels`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(setGrades)
            .catch(console.error);
    }, []);

    useEffect(() => {
        if (grades != ([]) && periods != ([])) {
            setLoad(true)
        }
    }, [grades, periods])

    const getTeacherProfile = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/profile`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const user = await response.json();
            return user?.teacher?.courses[0]?.id || null;
        } catch (err) {
            console.error("Error al obtener perfil de profesor", err);
            return null;
        }
    };

    const handleSearch = async () => {
        const courseId = await getTeacherProfile();
        if (!selectedGrade || !selectedPeriod || !courseId) return;

        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/teacher/students?grade_level_id=${selectedGrade}&course_id=${courseId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            const text = await res.text();
            let studentsData;
            try {
                studentsData = JSON.parse(text);
            } catch (jsonErr) {
                console.error("JSON inválido:", jsonErr, text);
                return;
            }

            const updated = await Promise.all(studentsData.map(async (e) => {
                const attRes = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/attendance?enrollment_id=${e.enrollment_id}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const attText = await attRes.text();
                let attData = [];
                try {
                    attData = JSON.parse(attText);
                } catch (err) {
                    console.error("Historial no JSON:", err, attText);
                }

                const faltas = attData.filter(a => a.status === "falto").length;
                return {
                    id: e.student.user_id,
                    enrollment_id: e.enrollment_id,
                    first_name: e.student.first_name,
                    last_name: e.student.last_name,
                    faltas,
                    history: attData
                };
            }));

            setStudents(updated);
            setShowTable(true);
        } catch (err) {
            console.error("Error al buscar estudiantes:", err);
        }
    };

    const handleEdit = (student) => {
        setEditingId(student.id);
        setAttendanceHistory(student.history);

        const today = new Date().toISOString().slice(0, 10);
        const todayRecord = student.history.find(a => a.date === today);

        setAttendance({
            asistio: todayRecord?.status === "asistio",
            tardanza: todayRecord?.status === "tardanza",
            falto: todayRecord?.status === "falto",
            noregistrado: todayRecord?.status === "no registrado" || !todayRecord
        });
    };

    const handleAttendanceChange = (type) => {
        setAttendance({
            asistio: type === 'asistio',
            tardanza: type === 'tardanza',
            falto: type === 'falto',
            noregistrado: type === 'noregistrado'
        });
    };

    const handleSave = async (student) => {
        const statusKey = Object.entries(attendance).find(([k, v]) => v)?.[0] || "noregistrado";
        const statusMap = {
            asistio: "asistio",
            tardanza: "tardanza",
            falto: "falto",
            noregistrado: "no registrado"
        };
        const status = statusMap[statusKey];

        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/attendance`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    enrollment_id: student.enrollment_id,
                    date: new Date().toISOString().slice(0, 10),
                    status
                })
            });

            const data = await res.json();
            if (res.ok) {
                handleSearch();
            }
        } catch (err) {
            console.error(err);
        }
        setEditingId(null);
    };

    return (
        <div className="container my-5">
            {load ? (
                <>
                    <div className="row mb-4">
                        <div className="col">
                            <select className="form-select" value={selectedGrade} onChange={e => setSelectedGrade(e.target.value)}>
                                <option value="">Selecciona Año</option>
                                {grades.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
                            </select>
                        </div>
                        <div className="col">
                            <select className="form-select" value={selectedPeriod} onChange={e => setSelectedPeriod(e.target.value)}>
                                <option value="">Selecciona Periodo</option>
                                {periods.map((p, i) => <option key={i} value={p}>{p} Bimestre</option>)}
                            </select>
                        </div>
                        <div className="col">
                            <button className="btn btn-success" onClick={handleSearch}>Buscar</button>
                        </div>
                    </div>

                    {showTable && (
                        <div className="row">
                            <div className="col-7">
                                <table className="table table-striped table-bordered text-center">
                                    <thead className="table-light">
                                        <tr>
                                            <th scope="col">Código</th>
                                            <th scope="col">Apellidos</th>
                                            <th scope="col">Nombres</th>
                                            <th scope="col">Faltas</th>
                                            <th scope="col"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {students.map((s) => (
                                            <tr key={s.id}>
                                                <td>{s.enrollment_id}</td>
                                                <td>{s.last_name}</td>
                                                <td>{s.first_name}</td>
                                                <td>{s.faltas}</td>
                                                <td>
                                                    <button
                                                        className={`btn btn-sm ${editingId === s.id ? 'btn-primary' : 'btn-success'}`}
                                                        onClick={() => editingId === s.id ? handleSave(s) : handleEdit(s)}>
                                                        <i className={`ri-${editingId === s.id ? 'save' : 'edit'}-line`}></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {editingId && (
                                <div className="col-5">
                                    <table className="table table-striped table-bordered text-center">
                                        <thead className="table-light">
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
                                                        {['asistio', 'tardanza', 'falto', 'noregistrado'].map(tipo => (
                                                            <div className="form-check form-check-inline" key={tipo}>
                                                                <input
                                                                    className="form-check-input"
                                                                    type="radio"
                                                                    name="attendance"
                                                                    checked={attendance[tipo] || false}
                                                                    onChange={() => handleAttendanceChange(tipo)}
                                                                />
                                                                <label className="form-check-label">
                                                                    {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
                                                                </label>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    )}
                </>
            ) : (
                <div className="spinner-border position-absolute top-50 start-50 translate-middle" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            )}
        </div>
    );
};