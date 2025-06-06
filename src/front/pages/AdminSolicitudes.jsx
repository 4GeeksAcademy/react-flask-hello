import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider.jsx";

export const AdminSolicitudes = () => {
    const [register, setRegister] = useState('')
    const [teachers, setTeachers] = useState([])
    const [students, setStudents] = useState([])
    const { store } = useAuth();
    const token = store.access_token;


    useEffect(() => {
        const pending = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/pending/registrations`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                })

                if (response.ok) {
                    const dataResponse = await response.json()
                    const onlyTeachers = dataResponse.filter(user => user.role === "teacher");
                    setTeachers(onlyTeachers);
                    const onlyStudents = dataResponse.filter(user => user.role === "student");
                    setStudents(onlyStudents);
                }

            } catch (error) {
                console.log(error);
            }
        }

        pending()
    }, [])

    const approve = async (role, id) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/approve/${role}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ status: 'approved' })
            })

            const result = await response.json();
            if (response.ok) {
                console.log(result.msg);
                if (role === 'teacher') {
                    setTeachers(prev => prev.filter(user => user.id !== id));
                } else if (role === 'student') {
                    setStudents(prev => prev.filter(user => user.id !== id));
                }
            }

        } catch (error) {
            console.log(error);

        }
    }

    const reject = async (role, id) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/delete/user/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ status: 'rejected' })
            })

            const result = await response.json();
            if (response.ok) {
                console.log(result.msg);
                if (role === 'teacher') {
                    setTeachers(prev => prev.filter(user => user.id !== id));
                } else if (role === 'student') {
                    setStudents(prev => prev.filter(user => user.id !== id));
                }
            }

        } catch (error) {
            console.log(error);

        }
    }

    return (
        <div className="container table-responsive my-5">
            <div className="row">
                <div className="col-2">
                    <select className="form-select" aria-label="Selecciona una opción" onChange={e => setRegister(e.target.value)}>
                        <option value="">Selecciona:</option>
                        <option value="students">Alumnos</option>
                        <option value="teachers">Profesores</option>
                    </select>
                </div>
                {register === 'teachers' ?
                    <table className="col-12 table table-striped table-bordered text-center mt-5">
                        <thead className="table-light">
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Apellidos</th>
                                <th scope="col">Nombres</th>
                                <th scope="col">Correo</th>
                                <th scope="col">Celular</th>
                                <th scope="col">Dirección</th>
                                <th scope="col">Materia</th>
                                <th scope="col">Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {teachers.map(teachers => (
                                <tr key={teachers.id}>
                                    <td>{teachers.id}</td>
                                    <td>{teachers.last_name}</td>
                                    <td>{teachers.first_name}</td>
                                    <td>{teachers.email}</td>
                                    <td>{teachers.teacher.phone}</td>
                                    <td>{teachers.location}</td>
                                    <td>{teachers.teacher.courses[0].name}</td>
                                    <td>
                                        <div className="d-flex justify-content-center align-items-center gap-2">
                                            <button type="button" className="btn btn-success btn-sm" onClick={() => approve(teachers.role, teachers.id)}><i class="ri-check-double-line"></i></button>
                                            <button type="button" className="btn btn-danger btn-sm" onClick={() => reject(teachers.role, teachers.id)}><i class="ri-prohibited-line"></i></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table> : ''}

                {register === 'students' ?
                    <table className="col-12 table table-striped table-bordered text-center mt-5">
                        <thead className="table-light">
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Apellidos</th>
                                <th scope="col">Nombres</th>
                                <th scope="col">Correo</th>
                                <th scope="col">Celular</th>
                                <th scope="col">Dirección</th>
                                <th scope="col">Grado</th>
                                <th scope="col">Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map(students => (
                                <tr key={students.id}>
                                    <td>{students.id}</td>
                                    <td>{students.last_name}</td>
                                    <td>{students.first_name}</td>
                                    <td>{students.email}</td>
                                    <td>{students.student.phone}</td>
                                    <td>{students.location}</td>
                                    <td>{students.student.grade_level}</td>
                                    <td>
                                        <div className="d-flex justify-content-center align-items-center gap-2">
                                            <button type="button" className="btn btn-success btn-sm" onClick={() => approve(students.role, students.id)}><i class="ri-check-double-line"></i></button>
                                            <button type="button" className="btn btn-danger btn-sm" onClick={() => reject(students.role, students.id)}><i class="ri-prohibited-line"></i></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table> : ''}
            </div>
        </div>
    );
};